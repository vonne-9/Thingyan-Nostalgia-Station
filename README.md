# Thingyan Waves

A nostalgic Burmese Thingyan-themed Spotify wrapper built as a static front-end. It includes:

- Spotify login with PKCE
- Spotify search and browser playback support
- A separate stage login that is independent from Spotify login
- A multi-hose festival stage that can show multiple active operators
- Pointer-driven water spray animation that soaks the crowd

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
- The multi-user stage uses browser tab/window sync on the same origin, so you can open multiple windows and join with different stage nicknames to see multiple hoses live.
