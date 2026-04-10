# Agent Analytics Live for Paperclip

Live Agent Analytics inside a Paperclip company workspace.

The plugin adds a live page, dashboard widget, sidebar entry, and settings page so operators can see current traffic without leaving Paperclip.

Docs:

- [Set up Agent Analytics for your Paperclip company](https://docs.agentanalytics.sh/guides/paperclip/)
- [Paperclip Live Plugin](https://docs.agentanalytics.sh/reference/paperclip-live-plugin/)

## Install in Paperclip

1. In Paperclip, open `Settings` -> `Plugins`.
2. Click `Install Plugin`.
3. Install this package:

```text
@agent-analytics/paperclip-live-analytics-plugin
```

4. Open the plugin `Configure` page.
5. If the account is not set up yet, use the Paperclip setup task shown in the plugin help panel or the docs guide first.
6. Log in with your existing Agent Analytics account in the browser.
7. Open the company live page from the sidebar and choose the Agent Analytics project for that Paperclip company.

## Screenshot

![Agent Analytics Live widget inside the Paperclip dashboard](./src/ui/assets/aa-in-dashboard.jpg)

## Requirements

- An existing Agent Analytics account with live-read access
- A Paperclip instance with plugin support

First-time Agent Analytics setup for Paperclip should be driven by the Paperclip task flow in the docs guide, not by this login popup:

[Set up Agent Analytics for your Paperclip company](https://docs.agentanalytics.sh/guides/paperclip/)

## What ships today

- `page`: company-level live map and evidence view
- `dashboardWidget`: compact live status summary
- `sidebar`: left-nav entry that opens the live page
- `settingsPage`: existing-account browser login, Paperclip setup help, and advanced plugin settings
- Worker-owned auth, `/live` polling, `/stream` fan-out, and company-scoped cache/state

## Install from the CLI

```bash
npx paperclipai plugin install @agent-analytics/paperclip-live-analytics-plugin
```

After install, finish connection from the plugin settings page, then choose the company’s Agent Analytics project on the live page.

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
