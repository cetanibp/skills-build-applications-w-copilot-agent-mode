# OctoFit Tracker Frontend

This React app connects to the OctoFit backend over the GitHub Codespaces public API URL.

## Required environment variable

The frontend expects `VITE_CODESPACE_NAME` to be defined before the app loads data. Add it to `.env.local` in the frontend folder, for example:

```bash
VITE_CODESPACE_NAME=my-codespace-name
```

When set, the app uses the Codespaces URL pattern:

```text
https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/[component]/
```

If `VITE_CODESPACE_NAME` is not set, the app falls back to the local backend URL at `http://localhost:8000` instead of creating an invalid `https://undefined-8000...` URL.

## Scripts

```bash
npm install
npm run dev
npm run build
```
