# Setup And Auth

## Default auth path

The plugin is browser-login-first.

1. Open the plugin `settingsPage`
2. Click `Connect Agent Analytics`
3. Finish approval in the opened browser tab or popup
4. The worker exchanges the returned session code
5. The plugin validates `GET /projects`
6. Select one Agent Analytics project for the Paperclip company

## Worker-owned boundary

- Access token and refresh token are stored in worker-owned company state
- The browser UI never receives a raw Agent Analytics API key
- `/stream` and `/live` are called only from the worker

## Compatibility fallback

The worker keeps legacy/internal compatibility paths, but the public v1 UI exposes browser-based agent-session auth only.
