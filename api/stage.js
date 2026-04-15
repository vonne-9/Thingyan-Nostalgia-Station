"use strict";

const fs = require("node:fs/promises");
const path = require("node:path");

const STAGE_STALE_MS = 6500;
const ROOM_ID = "thingyan-main-stage";
const FILE_PATH = path.join(process.env.TMPDIR || "/tmp", "thingyan-stage-state.json");
const STORE_KEY = `thingyan:stage:${ROOM_ID}`;
const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

function setNoStore(res) {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
}

function emptyStore() {
  return { operators: {} };
}

function sanitizeOperator(rawOperator = {}) {
  if (!rawOperator?.id) return null;

  const pointer = rawOperator.pointer || {};

  return {
    id: String(rawOperator.id).slice(0, 64),
    name: String(rawOperator.name || "Thingyan Guest").trim().slice(0, 24),
    hue: Number(rawOperator.hue) || 180,
    joinedAt: Number(rawOperator.joinedAt) || Date.now(),
    pointer: {
      x: Math.min(Math.max(Number(pointer.x) || 0.5, 0.06), 0.94),
      y: Math.min(Math.max(Number(pointer.y) || 0.34, 0.08), 0.72),
    },
    sprayActive: Boolean(rawOperator.sprayActive),
    lastSeen: Date.now(),
  };
}

function cleanStore(store) {
  const nextStore = store && typeof store === "object" ? store : emptyStore();
  nextStore.operators = nextStore.operators && typeof nextStore.operators === "object" ? nextStore.operators : {};

  const now = Date.now();
  for (const [operatorId, operator] of Object.entries(nextStore.operators)) {
    if (!operator?.lastSeen || now - operator.lastSeen > STAGE_STALE_MS) {
      delete nextStore.operators[operatorId];
    }
  }

  return nextStore;
}

function serializeOperators(store) {
  return Object.values(store.operators).sort((left, right) => {
    if ((left.joinedAt || 0) !== (right.joinedAt || 0)) {
      return (left.joinedAt || 0) - (right.joinedAt || 0);
    }
    return String(left.name || "").localeCompare(String(right.name || ""));
  });
}

async function readBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "object" && !Buffer.isBuffer(req.body)) return req.body;

  try {
    return JSON.parse(Buffer.isBuffer(req.body) ? req.body.toString("utf8") : String(req.body));
  } catch (error) {
    return {};
  }
}

async function readFileStore() {
  try {
    const raw = await fs.readFile(FILE_PATH, "utf8");
    return cleanStore(JSON.parse(raw));
  } catch (error) {
    return emptyStore();
  }
}

async function writeFileStore(store) {
  await fs.writeFile(FILE_PATH, JSON.stringify(store), "utf8");
}

async function readRestStore() {
  const response = await fetch(`${REST_URL}/get/${encodeURIComponent(STORE_KEY)}`, {
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`REST store read failed with status ${response.status}`);
  }

  const payload = await response.json();
  if (!payload?.result) {
    return emptyStore();
  }

  return cleanStore(JSON.parse(payload.result));
}

async function writeRestStore(store) {
  const response = await fetch(`${REST_URL}/set/${encodeURIComponent(STORE_KEY)}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REST_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(store),
  });

  if (!response.ok) {
    throw new Error(`REST store write failed with status ${response.status}`);
  }
}

async function readStore() {
  if (REST_URL && REST_TOKEN) {
    return readRestStore();
  }

  return readFileStore();
}

async function writeStore(store) {
  if (REST_URL && REST_TOKEN) {
    await writeRestStore(store);
    return;
  }

  await writeFileStore(store);
}

module.exports = async function handler(req, res) {
  setNoStore(res);

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "GET" && req.method !== "POST") {
    res.status(405).json({ error: { message: "Method not allowed." } });
    return;
  }

  try {
    const store = await readStore();

    if (req.method === "GET") {
      res.status(200).json({ operators: serializeOperators(store) });
      return;
    }

    const body = await readBody(req);
    const action = String(body.action || "").toLowerCase();
    const operator = sanitizeOperator(body.operator);

    if (!action) {
      res.status(400).json({ error: { message: "Missing stage action." } });
      return;
    }

    if (action === "join" || action === "update") {
      if (!operator) {
        res.status(400).json({ error: { message: "Missing operator payload." } });
        return;
      }
      store.operators[operator.id] = operator;
      await writeStore(store);
      res.status(200).json({ operators: serializeOperators(store) });
      return;
    }

    if (action === "leave") {
      const operatorId = body.operator?.id;
      if (operatorId) {
        delete store.operators[String(operatorId)];
        await writeStore(store);
      }
      res.status(200).json({ operators: serializeOperators(store) });
      return;
    }

    if (action === "snapshot") {
      res.status(200).json({ operators: serializeOperators(store) });
      return;
    }

    res.status(400).json({ error: { message: "Unknown stage action." } });
  } catch (error) {
    console.error("Stage API error", error);
    res.status(500).json({
      error: {
        message: "Stage sync storage is unavailable right now.",
      },
    });
  }
};
