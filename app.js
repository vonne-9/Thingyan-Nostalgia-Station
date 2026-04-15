const CONFIG = window.SPOTIFY_CONFIG || {
  clientId: "",
  redirectUri: window.location.origin + window.location.pathname,
  scopes: [],
};

const SONGS = [
  {
    id: "3zh7qnE8vH02lQFxNqI0Va",
    name: "Thingyan Moe",
    artists: [{ name: "Zaw Paing" }],
    album: { name: "Golden New Year Thingyan Live Show" },
    external_urls: { spotify: "https://open.spotify.com/track/3zh7qnE8vH02lQFxNqI0Va?si=05505489d0f34bd4" },
    uri: "spotify:track:3zh7qnE8vH02lQFxNqI0Va",
  },
  {
    id: "0jjAW1x5a2m9oTh7p7SxDW",
    name: "Pa Taut Latt Song",
    artists: [{ name: "Artists Group, Graham" }],
    album: { name: "Golden New Year Thingyan Live Show" },
    external_urls: { spotify: "https://open.spotify.com/track/0jjAW1x5a2m9oTh7p7SxDW?si=081456f77e634c48" },
    uri: "spotify:track:0jjAW1x5a2m9oTh7p7SxDW",
  },
  {
    id: "56ocrtpXpmUYwEBu7TKniY",
    name: "Mhan Taung Yate Co",
    artists: [{ name: "Artists Group" }],
    album: { name: "2006 Yadanar Myaing Thingyan Best" },
    external_urls: { spotify: "https://open.spotify.com/track/56ocrtpXpmUYwEBu7TKniY?si=84d58168a2aa45fc" },
    uri: "spotify:track:56ocrtpXpmUYwEBu7TKniY",
  },
  {
    id: "07oaswXPPq9ZRaYhYTizgh",
    name: "Thingyan Eaint Mat",
    artists: [{ name: "Hlwan Paing" }, { name: "Bobby Soxer" }],
    album: { name: "Aye Chan Par Say Thingyan Yay" },
    external_urls: { spotify: "https://open.spotify.com/track/07oaswXPPq9ZRaYhYTizgh?si=bbc8fa21ae124331" },
    uri: "spotify:track:07oaswXPPq9ZRaYhYTizgh",
  },
  {
    id: "6Py9W3D8yV3HHWFF7gcWI3",
    name: "Nway Ma",
    artists: [{ name: "Artists Group" }, { name: "Yan Aung" }],
    album: { name: "Aye Chan Par Say Thingyan Yay" },
    external_urls: { spotify: "https://open.spotify.com/track/6Py9W3D8yV3HHWFF7gcWI3?si=20eb6a24d8fa4387" },
    uri: "spotify:track:6Py9W3D8yV3HHWFF7gcWI3",
  },
  {
    id: "095dEAvKZpkUgRkTRaJvyv",
    name: "Nway Oo Kabyar",
    artists: [{ name: "NO" }],
    album: { name: "Alpine Thingyan" },
    external_urls: { spotify: "https://open.spotify.com/track/095dEAvKZpkUgRkTRaJvyv?si=6ad2b6165f9e45b1" },
    uri: "spotify:track:095dEAvKZpkUgRkTRaJvyv",
  },
];

const PLAYLISTS = [
  {
    id: "0PrI2z1wWAcYvAUwutQAcI",
    name: "Golden New Year Thingyan Live Show",
    description: "Album by Zaw Paing",
    artistLabel: "Zaw Paing",
    type: "album",
    external_urls: { spotify: "https://open.spotify.com/album/0PrI2z1wWAcYvAUwutQAcI?si=qymKoZ4yRlWdQ4vi8e3YIA" },
    fallbackItems: [SONGS[0], SONGS[1]],
  },
  {
    id: "5cWIppYJUUHgEFtD2EqGF7",
    name: "2006 Yadanar Myaing Thingyan Best",
    description: "Album by Artists Group",
    artistLabel: "Artists Group",
    type: "album",
    external_urls: { spotify: "https://open.spotify.com/album/5cWIppYJUUHgEFtD2EqGF7?si=gS9R2wGzTBCWIsGl-keXJw" },
    fallbackItems: [SONGS[2]],
  },
  {
    id: "38u78KrTWFt6087CNStzCh",
    name: "Aye Chan Par Say Thingyan Yay",
    description: "Compilation by Various Artists",
    artistLabel: "Various Artists",
    type: "album",
    external_urls: { spotify: "https://open.spotify.com/album/38u78KrTWFt6087CNStzCh?si=Z0Liqq7IT--MHeqrHdRa0w" },
    fallbackItems: [SONGS[3], SONGS[4]],
  },
  {
    id: "4yXh41VOmxh9lIKHWoaGYW",
    name: "Alpine Thingyan",
    description: "Compilation by Various Artists",
    artistLabel: "Various Artists",
    type: "album",
    external_urls: { spotify: "https://open.spotify.com/album/4yXh41VOmxh9lIKHWoaGYW?si=yumaAGCAQvu5JSCFuObAKA" },
    fallbackItems: [SONGS[5]],
  },
];

const STAGE_NAME_WORDS = [
  "Padauk",
  "Moe",
  "Akyat",
  "Akyo",
  "Atat",
  "Splash",
  "Wave",
  "Water",
  "ThanGyat",
  "Thingyan",
];

const STAGE_SESSION_KEY = "thingyan.stage.session";
const SPOTIFY_SESSION_KEY = "thingyan.spotify.session";
const STAGE_CHANNEL_NAME = "thingyan-stage";
const STAGE_HOST_PEER_ID = "thingyan-main-stage-anchor-v1";
const STAGE_HEARTBEAT_MS = 1200;
const STAGE_STALE_MS = 6500;
const LOCAL_BROADCAST_MS = 90;
const STAGE_RECONNECT_MS = 1800;
const DEFAULT_POINTER = { x: 0.5, y: 0.34 };
const SPOTIFY_MAX_RETRIES = 3;
const SPOTIFY_STATE_KEY = "thingyan.pkce.state";

const state = {
  accessToken: "",
  refreshToken: "",
  expiresAt: 0,
  spotifyUser: null,
  player: null,
  deviceId: "",
  currentTrack: SONGS[0],
  volume: 0.68,
  isPlaying: false,
  playbackTrackId: SONGS[0].id,
  operators: {},
  stageUser: null,
  stageChannel: null,
  stageHeartbeat: 0,
  stagePeer: null,
  stageHostConnection: null,
  stagePeerClients: new Map(),
  stageNetworkRole: "offline",
  stageReconnectTimer: 0,
  stageRealtimeReady: false,
  stageRealtimeToken: 0,
  localPointer: { ...DEFAULT_POINTER },
  droplets: [],
  crowd: [],
  animationFrame: 0,
  canvasSize: { width: 0, height: 0, ratio: 1 },
  lastBroadcastAt: 0,
  activeTab: "songs",
  activeCollection: null,
  activeCollectionItems: [],
};

const els = {
  loginButton: document.getElementById("loginButton"),
  statusText: document.getElementById("statusText"),
  userBadge: document.getElementById("userBadge"),
  stageNameInput: document.getElementById("stageNameInput"),
  regenerateNameButton: document.getElementById("regenerateNameButton"),
  stageJoinButton: document.getElementById("stageJoinButton"),
  stageLeaveButton: document.getElementById("stageLeaveButton"),
  stageRoster: document.getElementById("stageRoster"),
  devicePill: document.getElementById("devicePill"),
  resultsList: document.getElementById("resultsList"),
  resultsHint: document.getElementById("resultsHint"),
  panelTitle: document.getElementById("panelTitle"),
  playlistTrail: document.getElementById("playlistTrail"),
  backToPlaylistsButton: document.getElementById("backToPlaylistsButton"),
  songsTab: document.getElementById("songsTab"),
  playlistsTab: document.getElementById("playlistsTab"),
  nowPlayingTitle: document.getElementById("nowPlayingTitle"),
  nowPlayingArtist: document.getElementById("nowPlayingArtist"),
  leftSpeaker: document.getElementById("leftSpeaker"),
  rightSpeaker: document.getElementById("rightSpeaker"),
  leftPlayPauseButton: document.getElementById("leftPlayPauseButton"),
  rightPlayPauseButton: document.getElementById("rightPlayPauseButton"),
  leftVolumeSlider: document.getElementById("leftVolumeSlider"),
  rightVolumeSlider: document.getElementById("rightVolumeSlider"),
  stage: document.getElementById("stage"),
  operatorDeck: document.getElementById("operatorDeck"),
  operatorEmpty: document.getElementById("operatorEmpty"),
  crowd: document.getElementById("crowd"),
  canvas: document.getElementById("sprayCanvas"),
};

const crowdPalette = [
  ["#f39b6d", "#80523c"],
  ["#78bfd4", "#8b5e4c"],
  ["#ffd56f", "#6c4232"],
  ["#ff8d71", "#7a5342"],
  ["#89d1bb", "#8a5a49"],
  ["#89a0ff", "#7c503f"],
];

function randomString(length = 12) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (value) => alphabet[value % alphabet.length]).join("");
}

function themedStageName() {
  const first = STAGE_NAME_WORDS[Math.floor(Math.random() * STAGE_NAME_WORDS.length)];
  let second = STAGE_NAME_WORDS[Math.floor(Math.random() * STAGE_NAME_WORDS.length)];
  if (second === first) {
    second = STAGE_NAME_WORDS[(STAGE_NAME_WORDS.indexOf(first) + 3) % STAGE_NAME_WORDS.length];
  }
  return `${first} ${second}`;
}

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function isLoopbackHostname(hostname) {
  return hostname === "127.0.0.1" || hostname === "[::1]" || hostname === "::1" || hostname === "localhost";
}

function getRedirectUri() {
  const url = new URL(CONFIG.redirectUri || window.location.href);

  if (url.protocol === "http:" && url.hostname === "localhost") {
    url.hostname = "127.0.0.1";
  }

  return url.toString();
}

function validateRedirectUri() {
  const redirectUri = new URL(getRedirectUri());
  const isLoopback = isLoopbackHostname(redirectUri.hostname);

  if (redirectUri.protocol === "https:") {
    return { ok: true, redirectUri: redirectUri.toString() };
  }

  if (redirectUri.protocol === "http:" && isLoopback && redirectUri.hostname !== "localhost") {
    return { ok: true, redirectUri: redirectUri.toString() };
  }

  return {
    ok: false,
    redirectUri: redirectUri.toString(),
    message:
      "Spotify requires HTTPS redirect URIs, except explicit loopback addresses like http://127.0.0.1. localhost is not allowed.",
  };
}

function setStatus(message) {
  els.statusText.textContent = message;
}

function setSpeakerState(isPlaying) {
  state.isPlaying = isPlaying;
  els.leftSpeaker.classList.toggle("playing", isPlaying);
  els.rightSpeaker.classList.toggle("playing", isPlaying);
  const label = isPlaying ? "Pause" : "Play";
  els.leftPlayPauseButton.textContent = label;
  els.rightPlayPauseButton.textContent = label;
  els.leftPlayPauseButton.dataset.state = isPlaying ? "pause" : "play";
  els.rightPlayPauseButton.dataset.state = isPlaying ? "pause" : "play";
  els.leftPlayPauseButton.setAttribute("aria-label", label);
  els.rightPlayPauseButton.setAttribute("aria-label", label);
}

function saveSpotifySession() {
  localStorage.setItem(
    SPOTIFY_SESSION_KEY,
    JSON.stringify({
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      expiresAt: state.expiresAt,
      spotifyUser: state.spotifyUser,
    }),
  );
}

async function parseSpotifyResponse(response) {
  const contentType = response.headers.get("content-type") || "";
  if (response.status === 204) return null;

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

function getSpotifyErrorMessage(status, payload) {
  if (payload && typeof payload === "object") {
    if (payload.error?.message) return payload.error.message;
    if (typeof payload.error === "string" && payload.error_description) {
      return `${payload.error}: ${payload.error_description}`;
    }
    if (typeof payload.message === "string") return payload.message;
  }

  return `Spotify request failed with status ${status}.`;
}

async function spotifyRequest(url, options = {}, retryCount = 0) {
  const response = await fetch(url, options);
  const retryAfterHeader = response.headers.get("Retry-After");

  if (response.status === 429 && retryCount < SPOTIFY_MAX_RETRIES) {
    const retryAfterSeconds = Number(retryAfterHeader || 0);
    const baseDelay = retryAfterSeconds > 0 ? retryAfterSeconds * 1000 : 1000 * 2 ** retryCount;
    await sleep(baseDelay + Math.floor(Math.random() * 250));
    return spotifyRequest(url, options, retryCount + 1);
  }

  const payload = await parseSpotifyResponse(response);

  if (!response.ok) {
    const error = new Error(getSpotifyErrorMessage(response.status, payload));
    error.status = response.status;
    error.payload = payload;
    throw error;
  }

  return payload;
}

function restoreSpotifySession() {
  const raw = localStorage.getItem(SPOTIFY_SESSION_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    state.accessToken = parsed.accessToken || "";
    state.refreshToken = parsed.refreshToken || "";
    state.expiresAt = parsed.expiresAt || 0;
    state.spotifyUser = parsed.spotifyUser || null;
  } catch (error) {
    console.warn("Could not restore Spotify session", error);
  }
}

function saveStageSession() {
  if (!state.stageUser) {
    sessionStorage.removeItem(STAGE_SESSION_KEY);
    seedStageNameField(true);
    return;
  }

  sessionStorage.setItem(
    STAGE_SESSION_KEY,
    JSON.stringify({
      ...state.stageUser,
      pointer: state.localPointer,
    }),
  );
}

function restoreStageSession() {
  const raw = sessionStorage.getItem(STAGE_SESSION_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed?.id || !parsed?.name) return;
    state.stageUser = {
      id: parsed.id,
      name: parsed.name,
      hue: parsed.hue,
      joinedAt: parsed.joinedAt || Date.now(),
    };
    state.localPointer = parsed.pointer || { ...DEFAULT_POINTER };
  } catch (error) {
    console.warn("Could not restore stage session", error);
  }
}

function normalizeTrack(track, fallbackAlbumName = "Spotify") {
  return {
    id: track.id || track.uri || randomString(10),
    name: track.name,
    artists: track.artists || [],
    album: track.album || { name: fallbackAlbumName },
    external_urls:
      track.external_urls || {
        spotify: track.id ? `https://open.spotify.com/track/${track.id}` : "https://open.spotify.com/",
      },
    uri: track.uri,
  };
}

function updateNowPlaying(track) {
  if (!track) return;
  state.currentTrack = track;
  els.nowPlayingTitle.textContent = track.name || "Thingyan Moe";
  els.nowPlayingArtist.textContent = (track.artists || []).map((artist) => artist.name).join(", ");
  renderLibrary();
}

function updateSpotifyUi() {
  if (state.spotifyUser) {
    const label = state.spotifyUser.display_name || state.spotifyUser.id || "Spotify";
    els.loginButton.textContent = `${label} connected`;
  } else if (state.accessToken) {
    els.loginButton.textContent = "Spotify connected";
  } else {
    els.loginButton.textContent = "Log in with Spotify";
  }

  els.devicePill.textContent = state.deviceId ? "Stage speakers connected" : "No Spotify device";
  const volumeValue = String(Math.round(state.volume * 100));
  els.leftVolumeSlider.value = volumeValue;
  els.rightVolumeSlider.value = volumeValue;
}

function seedStageNameField(force = false) {
  if (state.stageUser) {
    els.stageNameInput.value = state.stageUser.name;
    return;
  }

  if (!force && els.stageNameInput.value.trim()) return;
  els.stageNameInput.value = themedStageName();
}

function regenerateStageName() {
  els.stageNameInput.value = themedStageName();
  els.stageNameInput.focus();
  els.stageNameInput.select();
}

function fitCanvas() {
  const rect = els.stage.getBoundingClientRect();
  const ratio = window.devicePixelRatio || 1;
  const width = Math.round(rect.width);
  const height = Math.round(rect.height);

  if (
    state.canvasSize.width === width &&
    state.canvasSize.height === height &&
    state.canvasSize.ratio === ratio
  ) {
    return;
  }

  state.canvasSize = { width, height, ratio };
  els.canvas.width = width * ratio;
  els.canvas.height = height * ratio;
  els.canvas.style.width = `${width}px`;
  els.canvas.style.height = `${height}px`;
  const ctx = els.canvas.getContext("2d");
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function updatePointer(clientX, clientY) {
  const rect = els.stage.getBoundingClientRect();
  const x = (clientX - rect.left) / rect.width;
  const y = (clientY - rect.top) / rect.height;
  state.localPointer.x = Math.min(Math.max(x, 0.06), 0.94);
  state.localPointer.y = Math.min(Math.max(y, 0.08), 0.72);

  if (state.stageUser && state.operators[state.stageUser.id]) {
    state.operators[state.stageUser.id].pointer = { ...state.localPointer };
  }
}

function createCrowd() {
  const peopleCount = window.innerWidth < 720 ? 12 : 18;
  els.crowd.innerHTML = "";
  state.crowd = [];

  for (let index = 0; index < peopleCount; index += 1) {
    const person = document.createElement("div");
    person.className = "person";

    const [shirt, skin] = crowdPalette[index % crowdPalette.length];
    person.style.setProperty("--shirt", shirt);
    person.style.setProperty("--skin", skin);
    person.style.left = `${4 + index * (92 / peopleCount)}%`;
    person.style.zIndex = String(10 + (index % 5));
    const baseTransform = `translateX(-50%) scale(${0.88 + (index % 4) * 0.08})`;
    person.style.transform = baseTransform;
    person.dataset.baseTransform = baseTransform;

    person.innerHTML = `
      <div class="head"></div>
      <div class="arms"><span></span><span></span></div>
      <div class="body"></div>
      <div class="splash-ring"></div>
    `;

    state.crowd.push({
      x: 0.04 + index * (0.92 / peopleCount),
      width: 0.065,
      y: 0.7 - (index % 3) * 0.04,
      height: 0.22,
      element: person,
      wetUntil: 0,
    });

    els.crowd.appendChild(person);
  }
}

function getOperatorValues() {
  return Object.values(state.operators).sort((left, right) => {
    if (left.joinedAt !== right.joinedAt) {
      return left.joinedAt - right.joinedAt;
    }
    return left.name.localeCompare(right.name);
  });
}

function getOperatorX(index, total) {
  if (total <= 1) return 0.5;
  const safeInset = total > 4 ? 0.1 : 0.16;
  return safeInset + (index / (total - 1)) * (1 - safeInset * 2);
}

function operatorName(operator) {
  return state.stageUser?.id === operator.id ? `${operator.name} (you)` : operator.name;
}

function updateStageBadge() {
  const operators = getOperatorValues();
  const count = operators.length;
  const suffix = count === 1 ? "hose" : "hoses";
  els.userBadge.textContent = `${count} ${suffix} online`;
  els.userBadge.classList.toggle("online", count > 0);
  els.userBadge.classList.toggle("offline", count === 0);

  els.stageRoster.innerHTML = "";
  if (!count) {
    const empty = document.createElement("div");
    empty.className = "roster-pill";
    empty.style.setProperty("--operator-hue", "35");
    empty.textContent = "No stage operators yet";
    els.stageRoster.appendChild(empty);
  } else {
    operators.forEach((operator) => {
      const pill = document.createElement("div");
      pill.className = `roster-pill${state.stageUser?.id === operator.id ? " local" : ""}`;
      pill.style.setProperty("--operator-hue", operator.hue);
      pill.textContent = operatorName(operator);
      els.stageRoster.appendChild(pill);
    });
  }

  els.stageJoinButton.textContent = state.stageUser ? "Update stage name" : "Join stage";
  els.stageLeaveButton.disabled = !state.stageUser;
}

function renderOperators() {
  const operators = getOperatorValues();
  els.operatorDeck.innerHTML = "";
  els.operatorEmpty.hidden = operators.length > 0;

  operators.forEach((operator, index) => {
    const root = document.createElement("div");
    root.className = `hose-root ${state.stageUser?.id === operator.id ? "local" : "remote"}`;
    root.dataset.operatorId = operator.id;
    root.style.left = `${getOperatorX(index, operators.length) * 100}%`;
    root.style.setProperty("--hose-hue", operator.hue);
    root.innerHTML = `
      <div class="user-tag">${operatorName(operator)}</div>
      <div class="hose-arm">
        <div class="hose-nozzle"></div>
      </div>
    `;
    els.operatorDeck.appendChild(root);
  });

  updateStageBadge();
}

function updateCrowdHit(droplet) {
  const x = droplet.x / els.stage.clientWidth;
  const y = droplet.y / els.stage.clientHeight;
  const now = performance.now();

  state.crowd.forEach((person) => {
    const hit =
      x >= person.x &&
      x <= person.x + person.width &&
      y >= person.y &&
      y <= person.y + person.height;

    if (hit) {
      person.wetUntil = now + 260;
      person.element.classList.add("soaked");
      person.element.style.transform = `${person.element.dataset.baseTransform || person.element.style.transform} rotate(${Math.random() * 6 - 3}deg)`;
      setTimeout(() => {
        if (performance.now() > person.wetUntil) {
          person.element.classList.remove("soaked");
          person.element.style.transform = person.element.dataset.baseTransform || "";
        }
      }, 300);
      droplet.life = droplet.maxLife;
    }
  });
}

function getOperatorSnapshot() {
  if (!state.stageUser) return null;
  const existing = state.operators[state.stageUser.id];
  return {
    id: state.stageUser.id,
    name: state.stageUser.name,
    hue: state.stageUser.hue,
    joinedAt: state.stageUser.joinedAt,
    pointer: existing?.pointer || { ...state.localPointer },
    sprayActive: existing?.sprayActive || false,
    lastSeen: Date.now(),
  };
}

function upsertOperator(operator) {
  const previous = state.operators[operator.id];
  state.operators[operator.id] = {
    angle: previous?.angle ?? -16,
    pointer: previous?.pointer || { ...DEFAULT_POINTER },
    sprayActive: false,
    ...previous,
    ...operator,
  };
}

function broadcastLocalStage(message) {
  if (!state.stageChannel) return;
  state.stageChannel.postMessage(message);
}

function relayToPeerClients(message, exceptPeerId = "") {
  state.stagePeerClients.forEach((connection, peerId) => {
    if (!connection.open || peerId === exceptPeerId) return;
    connection.send(message);
  });
}

function sendStageToRealtime(message) {
  if (!state.stageRealtimeReady) return;

  if (state.stageNetworkRole === "host") {
    relayToPeerClients(message);
    return;
  }

  if (state.stageHostConnection?.open) {
    state.stageHostConnection.send(message);
  }
}

function broadcastStage(type, operator, options = {}) {
  const message = { type, operator };
  if (!options.skipLocal) {
    broadcastLocalStage(message);
  }
  if (!options.skipRealtime) {
    sendStageToRealtime(message);
  }
  state.lastBroadcastAt = performance.now();
}

function removeOperator(operatorId) {
  if (!operatorId || !state.operators[operatorId]) return false;
  delete state.operators[operatorId];
  return true;
}

function getFullSyncMessage() {
  return {
    type: "stage-full-sync",
    operators: getOperatorValues().map((operator) => ({ ...operator })),
  };
}

function syncLocalOperator(force = false) {
  const operator = getOperatorSnapshot();
  if (!operator) return;
  upsertOperator(operator);

  const now = performance.now();
  if (!force && now - state.lastBroadcastAt < LOCAL_BROADCAST_MS) {
    return;
  }

  broadcastStage("operator-state", operator);
}

function cleanupOperators() {
  const now = Date.now();
  let changed = false;

  Object.values(state.operators).forEach((operator) => {
    if (state.stageUser?.id === operator.id) return;
    if (now - operator.lastSeen > STAGE_STALE_MS) {
      removeOperator(operator.id);
      broadcastStage("operator-leave", operator);
      changed = true;
    }
  });

  if (changed) {
    renderOperators();
  }
}

function applyFullSync(operators) {
  const nextOperators = {};
  (operators || []).forEach((operator) => {
    if (!operator?.id) return;
    nextOperators[operator.id] = {
      angle: state.operators[operator.id]?.angle ?? -16,
      pointer: state.operators[operator.id]?.pointer || { ...DEFAULT_POINTER },
      sprayActive: false,
      ...state.operators[operator.id],
      ...operator,
    };
  });

  if (state.stageUser) {
    const local = getOperatorSnapshot();
    if (local) {
      nextOperators[local.id] = {
        angle: state.operators[local.id]?.angle ?? -16,
        ...nextOperators[local.id],
        ...local,
      };
    }
  }

  state.operators = nextOperators;
  renderOperators();
}

function joinStage(name) {
  const trimmed = name.trim().slice(0, 24);
  if (!trimmed) {
    setStatus("Add a stage nickname before joining the interactive booth.");
    return;
  }

  if (state.stageUser) {
    state.stageUser.name = trimmed;
  } else {
    state.stageUser = {
      id: `stage-${randomString(10)}`,
      name: trimmed,
      hue: 160 + Math.floor(Math.random() * 120),
      joinedAt: Date.now(),
    };
  }

  saveStageSession();
  syncLocalOperator(true);
  renderOperators();
  setStatus(`${trimmed} joined the main stage. Aim anywhere on the crowd and hold down to spray.`);
}

function leaveStage(announce = true, preserveSession = false) {
  if (!state.stageUser) return;
  const operator = getOperatorSnapshot();
  if (operator) {
    broadcastStage("operator-leave", operator);
  }

  removeOperator(state.stageUser.id);
  const previousName = state.stageUser.name;
  state.stageUser = null;
  if (preserveSession) {
    sessionStorage.setItem(
      STAGE_SESSION_KEY,
      JSON.stringify({
        ...operator,
        pointer: state.localPointer,
      }),
    );
  } else {
    saveStageSession();
  }
  renderOperators();

  if (announce) {
    setStatus(`${previousName} left the stage booth. Spotify controls still stay signed in separately.`);
  }
}

function handleIncomingStageMessage(message, source = "local", originPeerId = "") {
  if (!message?.type) return;

  if (message.type === "stage-sync-request") {
    if (source === "peer" && state.stageNetworkRole === "host") {
      const target = originPeerId ? state.stagePeerClients.get(originPeerId) : null;
      if (target?.open) {
        target.send(getFullSyncMessage());
      } else {
        relayToPeerClients(getFullSyncMessage());
      }
    } else if (state.stageUser) {
      syncLocalOperator(true);
    }
    return;
  }

  if (message.type === "stage-full-sync") {
    applyFullSync(message.operators || []);
    return;
  }

  const operator = message.operator;
  if (!operator?.id || operator.id === state.stageUser?.id) {
    return;
  }

  if (message.type === "operator-leave") {
    const changed = removeOperator(operator.id);
    if (changed) {
      renderOperators();
    }
    return;
  }

  upsertOperator(operator);
  renderOperators();

  if (source === "peer" && state.stageNetworkRole === "host") {
    relayToPeerClients(message, originPeerId);
    broadcastLocalStage(message);
  }
}

function handleStageMessage(event) {
  handleIncomingStageMessage(event.data, "local");
}

function clearStageRealtime() {
  if (state.stageReconnectTimer) {
    window.clearTimeout(state.stageReconnectTimer);
    state.stageReconnectTimer = 0;
  }

  state.stageHostConnection?.close();
  state.stageHostConnection = null;

  state.stagePeerClients.forEach((connection) => connection.close());
  state.stagePeerClients.clear();

  state.stagePeer?.destroy();
  state.stagePeer = null;
  state.stageNetworkRole = "offline";
  state.stageRealtimeReady = false;
}

function scheduleStageReconnect(preferHost = true, token = state.stageRealtimeToken) {
  if (token !== state.stageRealtimeToken) return;
  if (state.stageReconnectTimer) return;

  state.stageReconnectTimer = window.setTimeout(() => {
    state.stageReconnectTimer = 0;
    if (token !== state.stageRealtimeToken) return;
    initRealtimeStage(preferHost);
  }, STAGE_RECONNECT_MS + Math.floor(Math.random() * 350));
}

function attachPeerConnection(connection, token) {
  state.stagePeerClients.set(connection.peer, connection);

  connection.addEventListener?.("open", () => {});
  connection.on("data", (message) => {
    if (token !== state.stageRealtimeToken) return;
    handleIncomingStageMessage(message, "peer", connection.peer);
  });
  connection.on("close", () => {
    if (token !== state.stageRealtimeToken) return;
    state.stagePeerClients.delete(connection.peer);
  });
  connection.on("error", () => {
    if (token !== state.stageRealtimeToken) return;
    state.stagePeerClients.delete(connection.peer);
  });
}

function becomeStageHost(peer, token) {
  state.stagePeer = peer;
  state.stageHostConnection = null;
  state.stageNetworkRole = "host";
  state.stageRealtimeReady = true;
  state.stagePeerClients.clear();

  peer.on("connection", (connection) => {
    if (token !== state.stageRealtimeToken) return;
    attachPeerConnection(connection, token);
    connection.on("open", () => {
      if (token !== state.stageRealtimeToken) return;
      if (connection.open) {
        connection.send(getFullSyncMessage());
      }
    });
  });

  peer.on("disconnected", () => {
    if (token !== state.stageRealtimeToken) return;
    state.stageRealtimeReady = false;
    scheduleStageReconnect(true, token);
  });

  peer.on("close", () => {
    if (token !== state.stageRealtimeToken) return;
    state.stageRealtimeReady = false;
    scheduleStageReconnect(true, token);
  });

  peer.on("error", (error) => {
    if (token !== state.stageRealtimeToken) return;
    console.warn("Stage host transport error", error);
    state.stageRealtimeReady = false;
    scheduleStageReconnect(true, token);
  });

  if (state.stageUser) {
    syncLocalOperator(true);
  }
}

function connectGuestToStageHost(token) {
  if (!state.stagePeer) return;

  const connection = state.stagePeer.connect(STAGE_HOST_PEER_ID, {
    reliable: false,
    serialization: "json",
  });
  state.stageHostConnection = connection;

  connection.on("open", () => {
    if (token !== state.stageRealtimeToken) return;
    state.stageNetworkRole = "guest";
    state.stageRealtimeReady = true;
    connection.send({ type: "stage-sync-request" });
    if (state.stageUser) {
      syncLocalOperator(true);
    }
  });

  connection.on("data", (message) => {
    if (token !== state.stageRealtimeToken) return;
    handleIncomingStageMessage(message, "peer", STAGE_HOST_PEER_ID);
  });
  connection.on("close", () => {
    if (token !== state.stageRealtimeToken) return;
    state.stageRealtimeReady = false;
    state.stageHostConnection = null;
    scheduleStageReconnect(true, token);
  });
  connection.on("error", (error) => {
    if (token !== state.stageRealtimeToken) return;
    console.warn("Stage guest transport error", error);
    state.stageRealtimeReady = false;
    state.stageHostConnection = null;
    scheduleStageReconnect(true, token);
  });
}

function createGuestPeer(token) {
  const peer = new window.Peer();
  state.stagePeer = peer;

  peer.on("open", () => {
    if (token !== state.stageRealtimeToken) return;
    connectGuestToStageHost(token);
  });

  peer.on("error", (error) => {
    if (token !== state.stageRealtimeToken) return;
    console.warn("Stage guest peer error", error);
    if (error?.type === "peer-unavailable") {
      clearStageRealtime();
      initRealtimeStage(true);
      return;
    }
    state.stageRealtimeReady = false;
    scheduleStageReconnect(true, token);
  });

  peer.on("disconnected", () => {
    if (token !== state.stageRealtimeToken) return;
    state.stageRealtimeReady = false;
    scheduleStageReconnect(true, token);
  });

  peer.on("close", () => {
    if (token !== state.stageRealtimeToken) return;
    state.stageRealtimeReady = false;
    scheduleStageReconnect(true, token);
  });
}

function initRealtimeStage(preferHost = true) {
  clearStageRealtime();
  state.stageRealtimeToken += 1;
  const token = state.stageRealtimeToken;

  if (!window.Peer) {
    console.warn("PeerJS is unavailable, stage sync will stay local to this browser.");
    return;
  }

  if (!preferHost) {
    createGuestPeer(token);
    return;
  }

  const peer = new window.Peer(STAGE_HOST_PEER_ID);
  let opened = false;

  peer.on("open", () => {
    opened = true;
    if (token !== state.stageRealtimeToken) return;
    becomeStageHost(peer, token);
  });

  peer.on("error", (error) => {
    if (token !== state.stageRealtimeToken) return;
    if (opened) {
      console.warn("Stage host transport error", error);
      state.stageRealtimeReady = false;
      scheduleStageReconnect(true, token);
      return;
    }

    if (error?.type === "unavailable-id") {
      peer.destroy();
      createGuestPeer(token);
      return;
    }

    console.warn("Could not claim the stage host role", error);
    peer.destroy();
    createGuestPeer(token);
  });
}

function setupStagePresence() {
  if ("BroadcastChannel" in window) {
    state.stageChannel = new BroadcastChannel(STAGE_CHANNEL_NAME);
    state.stageChannel.addEventListener("message", handleStageMessage);
    state.stageChannel.postMessage({ type: "stage-sync-request" });
  }

  initRealtimeStage(true);

  if (state.stageUser) {
    upsertOperator(getOperatorSnapshot());
  }

  renderOperators();

  state.stageHeartbeat = window.setInterval(() => {
    cleanupOperators();
    if (state.stageUser) {
      syncLocalOperator(true);
    }
  }, STAGE_HEARTBEAT_MS);

  window.addEventListener("beforeunload", () => {
    leaveStage(false, true);
    clearStageRealtime();
  });
}

function aimHoses() {
  const stageWidth = els.stage.clientWidth;
  const stageHeight = els.stage.clientHeight;
  const operators = getOperatorValues();

  operators.forEach((operator, index) => {
    const root = els.operatorDeck.querySelector(`[data-operator-id="${operator.id}"]`);
    const arm = root?.querySelector(".hose-arm");
    if (!arm) return;

    const pivotX = getOperatorX(index, operators.length) * stageWidth;
    const pivotY = stageHeight - 214;
    const pointer = operator.pointer || DEFAULT_POINTER;
    const targetX = pointer.x * stageWidth;
    const targetY = pointer.y * stageHeight;
    const angle = (Math.atan2(targetY - pivotY, targetX - pivotX) * 180) / Math.PI;
    operator.angle = (operator.angle ?? angle) + (angle - (operator.angle ?? angle)) * 0.18;
    arm.style.transform = `rotate(${operator.angle}deg)`;
  });
}

function getNozzlePoint(operatorId, fallbackX, fallbackY, fallbackAngle) {
  const stageRect = els.stage.getBoundingClientRect();
  const nozzle = els.operatorDeck
    .querySelector(`[data-operator-id="${operatorId}"] .hose-nozzle`);

  if (nozzle) {
    const nozzleRect = nozzle.getBoundingClientRect();
    return {
      x: nozzleRect.right - stageRect.left,
      y: nozzleRect.top + nozzleRect.height / 2 - stageRect.top,
      angle: fallbackAngle,
    };
  }

  return {
    x: fallbackX + Math.cos(fallbackAngle) * 76,
    y: fallbackY + Math.sin(fallbackAngle) * 76,
    angle: fallbackAngle,
  };
}

function emitDroplets() {
  const stageWidth = els.stage.clientWidth;
  const stageHeight = els.stage.clientHeight;
  const operators = getOperatorValues();

  operators.forEach((operator, index) => {
    if (!operator.sprayActive) return;
    const baseAngle = ((operator.angle ?? -16) * Math.PI) / 180;
    const pivotX = getOperatorX(index, operators.length) * stageWidth;
    const pivotY = stageHeight - 214;
    const nozzlePoint = getNozzlePoint(operator.id, pivotX, pivotY, baseAngle);

    for (let count = 0; count < 6; count += 1) {
      const speed = 7 + Math.random() * 4.5;
      const spread = ((Math.random() - 0.5) * 14 * Math.PI) / 180;
      state.droplets.push({
        x: nozzlePoint.x,
        y: nozzlePoint.y,
        vx: Math.cos(baseAngle + spread) * speed,
        vy: Math.sin(baseAngle + spread) * speed,
        life: 0,
        maxLife: 48 + Math.random() * 8,
        size: 1.8 + Math.random() * 2.2,
        hue: operator.hue,
      });
    }
  });
}

function drawScene() {
  fitCanvas();
  const ctx = els.canvas.getContext("2d");
  ctx.clearRect(0, 0, els.stage.clientWidth, els.stage.clientHeight);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  state.droplets = state.droplets.filter((droplet) => droplet.life < droplet.maxLife);
  state.droplets.forEach((droplet) => {
    droplet.life += 1;
    droplet.vy += 0.11;
    droplet.x += droplet.vx;
    droplet.y += droplet.vy;
    updateCrowdHit(droplet);

    const alpha = 1 - droplet.life / droplet.maxLife;
    ctx.beginPath();
    ctx.fillStyle = `hsla(${droplet.hue}, 100%, 82%, ${alpha})`;
    ctx.arc(droplet.x, droplet.y, droplet.size, 0, Math.PI * 2);
    ctx.fill();
  });

  state.animationFrame = requestAnimationFrame(loop);
}

function loop() {
  aimHoses();
  emitDroplets();
  drawScene();
  if (state.stageUser) {
    syncLocalOperator(false);
  }
}

function attachStageEvents() {
  const begin = (clientX, clientY) => {
    if (!state.stageUser) {
      setStatus("Join the main stage with a nickname first, then you can control your hose.");
      return;
    }

    updatePointer(clientX, clientY);
    if (state.operators[state.stageUser.id]) {
      state.operators[state.stageUser.id].sprayActive = true;
    }
    syncLocalOperator(true);
  };

  const move = (clientX, clientY) => {
    if (!state.stageUser) return;
    updatePointer(clientX, clientY);
    syncLocalOperator(false);
  };

  const end = () => {
    if (!state.stageUser) return;
    if (state.operators[state.stageUser.id]) {
      state.operators[state.stageUser.id].sprayActive = false;
    }
    syncLocalOperator(true);
  };

  els.stage.addEventListener("pointerdown", (event) => {
    begin(event.clientX, event.clientY);
  });
  els.stage.addEventListener("pointermove", (event) => {
    move(event.clientX, event.clientY);
  });
  els.stage.addEventListener("pointerup", end);
  els.stage.addEventListener("pointerleave", end);
  els.stage.addEventListener("touchstart", (event) => {
    const touch = event.touches?.[0];
    if (touch) begin(touch.clientX, touch.clientY);
  }, { passive: true });
  els.stage.addEventListener("touchmove", (event) => {
    const touch = event.touches?.[0];
    if (touch) move(touch.clientX, touch.clientY);
  }, { passive: true });
  els.stage.addEventListener("touchend", end);

  window.addEventListener("resize", () => {
    createCrowd();
    renderOperators();
  });
}

async function sha256(input) {
  const data = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return new Uint8Array(digest);
}

function base64UrlEncode(bytes) {
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function beginSpotifyLogin() {
  if (!CONFIG.clientId || CONFIG.clientId === "YOUR_SPOTIFY_CLIENT_ID") {
    setStatus("Add a real Spotify client ID in config.js before logging in with Spotify.");
    return;
  }

  const redirectValidation = validateRedirectUri();
  if (!redirectValidation.ok) {
    setStatus(redirectValidation.message);
    return;
  }

  const verifier = randomString(64);
  const authState = randomString(24);
  const challenge = base64UrlEncode(await sha256(verifier));
  sessionStorage.setItem("thingyan.pkce.verifier", verifier);
  sessionStorage.setItem(SPOTIFY_STATE_KEY, authState);

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("client_id", CONFIG.clientId);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", redirectValidation.redirectUri);
  authUrl.searchParams.set("scope", CONFIG.scopes.join(" "));
  authUrl.searchParams.set("state", authState);
  authUrl.searchParams.set("code_challenge_method", "S256");
  authUrl.searchParams.set("code_challenge", challenge);
  window.location.href = authUrl.toString();
}

async function finishSpotifyLogin() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const returnedState = params.get("state");
  if (!code) return false;

  const redirectValidation = validateRedirectUri();
  if (!redirectValidation.ok) {
    setStatus(redirectValidation.message);
    return false;
  }

  const verifier = sessionStorage.getItem("thingyan.pkce.verifier");
  const expectedState = sessionStorage.getItem(SPOTIFY_STATE_KEY);
  if (!verifier) {
    setStatus("Missing Spotify PKCE verifier. Please try logging in again.");
    return false;
  }

  if (!returnedState || !expectedState || returnedState !== expectedState) {
    setStatus("Spotify login state check failed. Please try logging in again.");
    return false;
  }

  const body = new URLSearchParams({
    client_id: CONFIG.clientId,
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectValidation.redirectUri,
    code_verifier: verifier,
  });

  const payload = await spotifyRequest("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  state.accessToken = payload.access_token;
  state.refreshToken = payload.refresh_token || "";
  state.expiresAt = Date.now() + payload.expires_in * 1000;
  saveSpotifySession();
  sessionStorage.removeItem("thingyan.pkce.verifier");
  sessionStorage.removeItem(SPOTIFY_STATE_KEY);
  window.history.replaceState({}, document.title, redirectValidation.redirectUri);
  return true;
}

async function refreshTokenIfNeeded() {
  if (!state.refreshToken || Date.now() < state.expiresAt - 60_000) {
    return;
  }

  const body = new URLSearchParams({
    client_id: CONFIG.clientId,
    grant_type: "refresh_token",
    refresh_token: state.refreshToken,
  });

  const payload = await spotifyRequest("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  state.accessToken = payload.access_token;
  state.expiresAt = Date.now() + payload.expires_in * 1000;
  if (payload.refresh_token) {
    state.refreshToken = payload.refresh_token;
  }
  saveSpotifySession();
}

async function spotifyFetch(path, options = {}) {
  await refreshTokenIfNeeded();
  return spotifyRequest(`https://api.spotify.com/v1${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${state.accessToken}`,
      "Content-Type": "application/json",
    },
  });
}

async function loadProfile() {
  if (!state.accessToken) return;

  try {
    state.spotifyUser = await spotifyFetch("/me");
    saveSpotifySession();
    const label = state.spotifyUser.display_name || state.spotifyUser.id || "Spotify";
    els.loginButton.textContent = `${label} connected`;
  } catch (error) {
    console.warn("Could not load Spotify profile", error);
    updateSpotifyUi();
  }
}

function waitForSpotifySdk() {
  return new Promise((resolve) => {
    if (window.Spotify) {
      resolve(window.Spotify);
      return;
    }

    window.onSpotifyWebPlaybackSDKReady = () => resolve(window.Spotify);
  });
}

async function setupPlayer() {
  if (!state.accessToken || state.player) return;

  const Spotify = await waitForSpotifySdk();
  state.player = new Spotify.Player({
    name: "Thingyan Waves Stage",
    getOAuthToken: (callback) => callback(state.accessToken),
    volume: state.volume,
  });

  state.player.addListener("ready", ({ device_id: deviceId }) => {
    state.deviceId = deviceId;
    updateSpotifyUi();
    setStatus("Spotify player is ready. Click a speaker or pick an item from the side panel.");
    spotifyFetch("/me/player", {
      method: "PUT",
      body: JSON.stringify({ device_ids: [deviceId], play: false }),
    }).catch((error) => {
      console.warn("Could not transfer playback to browser device", error);
    });
  });

  state.player.addListener("player_state_changed", (playerState) => {
    if (!playerState?.track_window?.current_track) return;
    const currentTrack = normalizeTrack(playerState.track_window.current_track);
    state.playbackTrackId = currentTrack.id;
    updateNowPlaying(currentTrack);
    state.isPlaying = !playerState.paused;
    setSpeakerState(state.isPlaying);
  });

  state.player.addListener("initialization_error", ({ message }) => {
    console.warn("Spotify initialization error", message);
    els.devicePill.textContent = "Premium playback may be unavailable";
  });

  state.player.addListener("authentication_error", ({ message }) => {
    console.warn("Spotify auth error", message);
    els.devicePill.textContent = "Spotify auth error";
    setStatus(`Spotify authentication failed: ${message}. Reconnect after granting all requested scopes.`);
  });

  state.player.addListener("account_error", ({ message }) => {
    els.devicePill.textContent = "Premium required";
    setStatus(`Spotify playback requires Premium: ${message}`);
  });

  state.player.addListener("playback_error", ({ message }) => {
    setStatus(`Spotify playback error: ${message}`);
  });

  state.player.addListener("autoplay_failed", () => {
    setStatus("Spotify is connected, but the browser blocked autoplay. Click a stage speaker again to begin playback.");
  });

  await state.player.connect();
}

function setActiveTab(tab) {
  state.activeTab = tab;
  if (tab === "songs") {
    state.activeCollection = null;
    state.activeCollectionItems = [];
  }
  els.songsTab.classList.toggle("active", tab === "songs");
  els.playlistsTab.classList.toggle("active", tab === "playlists");
  renderLibrary();
}

function createTrackCard(track) {
  const card = document.createElement("article");
  card.className = `track-card${state.currentTrack?.id === track.id ? " active" : ""}`;

  const title = document.createElement("h3");
  title.textContent = track.name;
  const subtitle = document.createElement("p");
  subtitle.textContent = `${(track.artists || []).map((artist) => artist.name).join(", ")} • ${track.album?.name || "Spotify"}`;

  const actions = document.createElement("div");
  actions.className = "track-actions";

  const stageButton = document.createElement("button");
  stageButton.type = "button";
  stageButton.className = "secondary-button compact";
  stageButton.textContent = "Play";
  stageButton.addEventListener("click", async (event) => {
    event.stopPropagation();
    await playTrack(track);
  });

  const link = document.createElement("a");
  link.className = "link-button";
  link.href = track.external_urls?.spotify || "https://open.spotify.com/";
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Open in Spotify";
  link.addEventListener("click", (event) => event.stopPropagation());

  actions.append(stageButton, link);
  card.append(title, subtitle, actions);
  card.addEventListener("click", () => {
    updateNowPlaying(track);
    renderLibrary();
    setStatus(`"${track.name}" is selected in the stage panel.`);
  });

  return card;
}

function createPlaylistCard(item) {
  const card = document.createElement("article");
  card.className = "playlist-card";

  const title = document.createElement("h3");
  title.textContent = item.name;
  const subtitle = document.createElement("p");
  subtitle.textContent = item.description;

  const actions = document.createElement("div");
  actions.className = "playlist-actions";

  const pill = document.createElement("span");
  pill.className = "pill";
  pill.textContent = item.artistLabel;

  const viewButton = document.createElement("button");
  viewButton.type = "button";
  viewButton.className = "secondary-button compact";
  viewButton.textContent = "View songs";
  viewButton.addEventListener("click", (event) => {
    event.stopPropagation();
    openCollection(item);
  });

  const link = document.createElement("a");
  link.className = "link-button";
  link.href = item.external_urls.spotify;
  link.target = "_blank";
  link.rel = "noreferrer";
  link.textContent = "Open in Spotify";
  link.addEventListener("click", (event) => event.stopPropagation());

  actions.append(pill, viewButton, link);
  card.append(title, subtitle, actions);
  card.addEventListener("click", () => openCollection(item));
  return card;
}

function renderLibrary() {
  els.resultsList.innerHTML = "";

  if (state.activeTab === "songs") {
    els.panelTitle.textContent = "Thingyan songs";
    els.resultsHint.textContent = "Select a song to put it on the stage.";
    els.playlistTrail.classList.add("hidden");
    SONGS.forEach((track) => {
      els.resultsList.appendChild(createTrackCard(track));
    });
    return;
  }

  if (!state.activeCollection) {
    els.panelTitle.textContent = "Thingyan playlists";
    els.resultsHint.textContent = "Open a playlist to see its songs and play them.";
    els.playlistTrail.classList.add("hidden");
    PLAYLISTS.forEach((item) => {
      els.resultsList.appendChild(createPlaylistCard(item));
    });
    return;
  }

  els.panelTitle.textContent = state.activeCollection.name;
  els.resultsHint.textContent = "Select a song from this playlist to put it on the stage.";
  els.playlistTrail.classList.remove("hidden");
  state.activeCollectionItems.forEach((track) => {
    els.resultsList.appendChild(createTrackCard(track));
  });
}

async function openCollection(item) {
  state.activeCollection = item;

  if (!state.accessToken) {
    state.activeCollectionItems = item.fallbackItems.map((track) => normalizeTrack(track, item.name));
    renderLibrary();
    setStatus(`Opened "${item.name}". Connect Spotify to load the full album tracks.`);
    return;
  }

  try {
    const payload = await spotifyFetch(`/albums/${item.id}/tracks?limit=50`);
    state.activeCollectionItems = (payload.items || []).map((track) => {
      const normalized = normalizeTrack(track, item.name);
      normalized.external_urls = {
        spotify: `https://open.spotify.com/track/${normalized.id}`,
      };
      return normalized;
    });
    renderLibrary();
    if (state.activeCollectionItems.length) {
      updateNowPlaying(state.activeCollectionItems[0]);
    }
    setStatus(`Opened "${item.name}". Pick a track from the album and press Play.`);
  } catch (error) {
    state.activeCollectionItems = item.fallbackItems.map((track) => normalizeTrack(track, item.name));
    renderLibrary();
    setStatus(`Could not load the full album from Spotify: ${error.message}`);
  }
}

async function startTrackPlayback(track) {
  if (!state.accessToken || !state.deviceId) {
    setStatus(`Connect Spotify first to play "${track.name}".`);
    return;
  }

  try {
    await spotifyFetch(`/me/player/play?device_id=${state.deviceId}`, {
      method: "PUT",
      body: JSON.stringify({ uris: [track.uri] }),
    });
    state.playbackTrackId = track.id;
    setSpeakerState(true);
    setStatus(`Now playing "${track.name}" on the stage speakers.`);
  } catch (error) {
    setStatus(`Could not start playback: ${error.message}`);
  }
}

async function pausePlayback() {
  if (!state.accessToken || !state.deviceId) {
    setStatus("Connect Spotify first to control the stage speakers.");
    return;
  }

  try {
    await spotifyFetch(`/me/player/pause?device_id=${state.deviceId}`, {
      method: "PUT",
    });
    setSpeakerState(false);
    setStatus("Paused the stage speakers.");
  } catch (error) {
    setStatus(`Could not pause playback: ${error.message}`);
  }
}

async function resumeCurrentPlayback() {
  if (!state.accessToken || !state.deviceId) {
    setStatus("Connect Spotify first to control the stage speakers.");
    return;
  }

  try {
    if (state.player) {
      await state.player.resume();
    } else {
      await spotifyFetch(`/me/player/play?device_id=${state.deviceId}`, {
        method: "PUT",
      });
    }
    setSpeakerState(true);
    setStatus(`Resumed "${state.currentTrack?.name || "the stage music"}".`);
  } catch (error) {
    setStatus(`Could not resume playback: ${error.message}`);
  }
}

async function playTrack(track) {
  if (!track) return;
  updateNowPlaying(track);

  if (!state.accessToken || !state.deviceId) {
    setStatus(`Connect Spotify first to play "${track.name}".`);
    return;
  }

  if (!state.isPlaying && state.playbackTrackId === track.id) {
    await resumeCurrentPlayback();
    return;
  }

  await startTrackPlayback(track);
}

async function togglePlayback() {
  if (state.isPlaying) {
    await pausePlayback();
    return;
  }

  if (state.playbackTrackId === state.currentTrack?.id) {
    await resumeCurrentPlayback();
    return;
  }

  await playTrack(state.currentTrack);
}

async function updateSpeakerVolume(value) {
  const clamped = Math.min(Math.max(Number(value), 0), 100);
  state.volume = clamped / 100;
  els.leftVolumeSlider.value = String(clamped);
  els.rightVolumeSlider.value = String(clamped);

  if (!state.player) return;

  try {
    await state.player.setVolume(state.volume);
  } catch (error) {
    console.warn("Could not set player volume", error);
    setStatus("Spotify volume control is unavailable right now.");
  }
}

function wireUi() {
  els.loginButton.addEventListener("click", beginSpotifyLogin);
  els.leftSpeaker.addEventListener("click", togglePlayback);
  els.rightSpeaker.addEventListener("click", togglePlayback);
  els.leftPlayPauseButton.addEventListener("click", togglePlayback);
  els.rightPlayPauseButton.addEventListener("click", togglePlayback);
  els.leftVolumeSlider.addEventListener("input", (event) => updateSpeakerVolume(event.target.value));
  els.rightVolumeSlider.addEventListener("input", (event) => updateSpeakerVolume(event.target.value));
  els.regenerateNameButton.addEventListener("click", regenerateStageName);
  els.songsTab.addEventListener("click", () => setActiveTab("songs"));
  els.playlistsTab.addEventListener("click", () => setActiveTab("playlists"));
  els.backToPlaylistsButton.addEventListener("click", () => {
    state.activeCollection = null;
    state.activeCollectionItems = [];
    renderLibrary();
  });

  els.stageJoinButton.addEventListener("click", () => joinStage(els.stageNameInput.value));
  els.stageLeaveButton.addEventListener("click", () => leaveStage(true));
  els.stageNameInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      joinStage(els.stageNameInput.value);
    }
  });
}

async function init() {
  restoreSpotifySession();
  restoreStageSession();
  seedStageNameField();
  createCrowd();
  attachStageEvents();
  setupStagePresence();
  wireUi();
  updateNowPlaying(SONGS[0]);
  renderLibrary();
  updateSpotifyUi();
  setSpeakerState(false);
  loop();

  try {
    const loggedInFromRedirect = await finishSpotifyLogin();
    if (loggedInFromRedirect || state.accessToken) {
      await loadProfile();
      updateSpotifyUi();
      await setupPlayer();
      setStatus("Spotify is connected. Click a speaker or choose a song from the side panel.");
    }
  } catch (error) {
    console.error(error);
    setStatus("The stage loaded, but Spotify setup needs attention. Stage login and the curated music lists still work.");
  }

  if (state.stageUser) {
    syncLocalOperator(true);
    renderOperators();
  }
}

init();
