# Agent Analytics Live for Paperclip

Live Agent Analytics inside a Paperclip company workspace.

The plugin adds a live page, dashboard widget, sidebar entry, and settings page so operators can see current traffic without leaving Paperclip.

Setup guide:

[Install and set up Agent Analytics for Paperclip](https://docs.agentanalytics.sh/guides/paperclip/)

## Install in Paperclip

1. In Paperclip, open `Settings` -> `Plugins`.
2. Click `Install Plugin`.
3. Install this package:

```text
@agent-analytics/paperclip-live-analytics-plugin
```

4. Open the plugin `Configure` page.
5. Connect your Agent Analytics account in the browser.
6. Select one Agent Analytics project for the current Paperclip company.

## Screenshot

![Agent Analytics Live widget inside the Paperclip dashboard](./src/ui/assets/aa-in-dashboard.jpg)

## Requirements

- An Agent Analytics account with live-read access
- A Paperclip instance with plugin support

Create or access your Agent Analytics account at [agentanalytics.sh](https://agentanalytics.sh).

## What ships today

- `page`: company-level live map and evidence view
- `dashboardWidget`: compact live status summary
- `sidebar`: left-nav entry that opens the live page
- `settingsPage`: browser-based login, connection status, and project selection
- Worker-owned auth, `/live` polling, `/stream` fan-out, and company-scoped cache/state

## Install from the CLI

```bash
npx paperclipai plugin install @agent-analytics/paperclip-live-analytics-plugin
```

After install, finish connection from the plugin settings page.

## Local development

```bash
cd paperclip-live-analytics-plugin
npm test
npm run build
npm pack
```

- `npm test` exercises the worker/shared logic.
- `npm run build` produces the Paperclip worker, manifest, and UI bundle.

## Publish

```bash
cd paperclip-live-analytics-plugin
npm install
npm test
npm run build
npm publish --access public
```

The package is configured for public scoped npm publishing.

## Repository layout

- `src/worker/`: auth, live polling, stream fan-out, and company-scoped state
- `src/ui/`: page, widget, and settings UI
- `src/paperclip/`: Paperclip-specific manifest and entrypoints
- `docs/`: operator and maintainer notes
