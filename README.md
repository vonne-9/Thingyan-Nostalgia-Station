# Thingyan Waves

## About

I built Thingyan Waves as an international student who has been away from home for four years. Being far from Myanmar during Thingyan has made me miss home deeply, especially the feeling of being surrounded by family, music, water, and the joyful energy of the festival.

Thingyan songs always bring back a strong sense of nostalgia for me. They instantly remind me of home, of past celebrations, and of the atmosphere that makes Thingyan so special. This project came from that feeling. I wanted to create something interactive and fun that could digitally bring together the music and water festival experience for people who are also far from home and missing it.

Thingyan Waves is my way of turning that homesickness into a small shared space where people can listen to familiar songs, join the stage, spray water, and reconnect with a piece of Thingyan wherever they are.

A nostalgic Burmese Thingyan-themed Spotify wrapper built as a static front-end. It includes:

- Spotify login with PKCE
- Spotify search and browser playback support
- A separate stage login that is independent from Spotify login
- A multi-hose festival stage that can show multiple active operators
- Pointer-driven water spray animation that soaks the crowd
- Cross-device stage sync so different phones and laptops can move hoses together

## Run it locally

From this folder, serve the files with any static server. For example:

```bash
python3 -m http.server 5500
```

Then open [http://127.0.0.1:5500](http://127.0.0.1:5500).

## Spotify setup

1. Create a Spotify app in the Spotify Developer Dashboard.
2. Copy `config.example.js` to `config.js` or edit `config.js` directly.
3. Set `clientId` to your Spotify app client ID.
4. Add your local URL as an allowed redirect URI in Spotify, for example:

```text
http://127.0.0.1:5500/
```

Use `http://127.0.0.1`, not `http://localhost`. For deployed environments, Spotify redirect URIs should use HTTPS.

## Notes

- Direct playback through the Spotify Web Playback SDK typically requires a Spotify Premium account.
- If Spotify is not configured yet, the page still works in demo mode so the Thingyan visuals and hose interaction can be explored.
- The multi-user stage now uses a WebRTC room via PeerJS, so different devices on the public site can join the same stage and see each other's hose movement live.
- If realtime transport is blocked by a browser/network policy, the app still falls back to same-browser sync with `BroadcastChannel`.
