import { CountryMapPanel } from '../components/CountryMapPanel.jsx';
import { BrandMark } from '../components/BrandMark.jsx';
import { trackPluginCta, trackPluginFeature } from '../analytics.js';

function CogIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="aa-button-icon">
      <path
        d="M10.3 2.9h3.4l.5 2.1c.6.2 1.1.4 1.6.7l1.9-1.1 2.4 2.4-1.1 1.9c.3.5.5 1 .7 1.6l2.1.5v3.4l-2.1.5c-.2.6-.4 1.1-.7 1.6l1.1 1.9-2.4 2.4-1.9-1.1c-.5.3-1 .5-1.6.7l-.5 2.1h-3.4l-.5-2.1c-.6-.2-1.1-.4-1.6-.7l-1.9 1.1-2.4-2.4 1.1-1.9c-.3-.5-.5-1-.7-1.6l-2.1-.5V10.3l2.1-.5c.2-.6.4-1.1.7-1.6L4.6 6.3l2.4-2.4 1.9 1.1c.5-.3 1-.5 1.6-.7zm1.7 5.1a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function formatRelativeTime(timestamp) {
  if (!timestamp) return 'No updates yet';
  const seconds = Math.max(0, Math.round((Date.now() - timestamp) / 1000));
  if (seconds < 5) return 'Updated just now';
  if (seconds < 60) return `Updated ${seconds}s ago`;
  const minutes = Math.round(seconds / 60);
  return `Updated ${minutes}m ago`;
}

function CountryPulse({ liveState }) {
  return (
    <section className="aa-panel aa-world-panel">
      <div className="aa-panel-header">
        <div>
          <p className="aa-kicker">World / Country View</p>
        </div>
      </div>
      <div className="aa-world-grid">
        <CountryMapPanel
          countries={liveState.world.countries}
          hotCountryCode={liveState.world.hotCountry}
          updatedAt={formatRelativeTime(liveState.generatedAt)}
        />
      </div>
    </section>
  );
}

function EvidenceColumn({ liveState }) {
  return (
    <section className="aa-panel">
      <div className="aa-panel-header">
        <div>
          <p className="aa-kicker">Live Signals</p>
        </div>
      </div>
      <div className="aa-evidence-grid">
        <div className="aa-mini-panel">
          <h3>Top Pages</h3>
          {liveState.evidence.topPages.map((page) => (
            <div className="aa-mini-row" key={page.path}>
              <span>{page.path}</span>
              <strong>{page.visitors}</strong>
            </div>
          ))}
        </div>
        <div className="aa-mini-panel">
          <h3>Top Events</h3>
          {liveState.evidence.topEvents.map((event) => (
            <div className="aa-mini-row" key={event.event}>
              <span>{event.event}</span>
              <strong>{event.count}</strong>
            </div>
          ))}
        </div>
      </div>
      <div className="aa-feed">
        {liveState.evidence.recentEvents.map((event) => (
          <div className="aa-feed-row" key={event.id}>
            <div>
              <strong>{event.event}</strong>
              <span>{event.assetLabel || 'Unmapped asset'} · {event.path || 'no path'} · {event.country || '??'}</span>
            </div>
            <time>{formatRelativeTime(event.timestamp)}</time>
          </div>
        ))}
      </div>
    </section>
  );
}

function AssetCard({ asset, onSnooze }) {
  return (
    <article className={`aa-asset-card aa-asset-card-${asset.kind}`}>
      <div className="aa-asset-topline">
        <div>
          <p className="aa-kicker">Project Snapshot</p>
          <h3>{asset.label}</h3>
        </div>
        <span className={`aa-status-pill aa-status-${asset.status}`}>{asset.status}</span>
      </div>

      <div className="aa-asset-metrics">
        <div>
          <span>Visitors</span>
          <strong>{asset.activeVisitors}</strong>
        </div>
        <div>
          <span>Sessions</span>
          <strong>{asset.activeSessions}</strong>
        </div>
        <div>
          <span>Events / min</span>
          <strong>{asset.eventsPerMinute}</strong>
        </div>
      </div>

      <div className="aa-asset-details">
        <div>
          <span className="aa-label">Hot country</span>
          <strong>{asset.lastHotCountry || 'Waiting for stream'}</strong>
        </div>
        <div>
          <span className="aa-label">Updated</span>
          <strong>{formatRelativeTime(asset.lastUpdatedAt)}</strong>
        </div>
      </div>

      <div className="aa-asset-evidence">
        <div>
          <span className="aa-label">Top page</span>
          <strong>{asset.topPages[0]?.path || 'No pages yet'}</strong>
        </div>
        <div>
          <span className="aa-label">Top event</span>
          <strong>{asset.topEvents[0]?.event || 'No events yet'}</strong>
        </div>
      </div>

      <div className="aa-asset-actions">
        <button
          className="aa-button aa-button-ghost"
          onClick={() => {
            trackPluginFeature('asset_snoozed', {
              asset_key: asset.assetKey,
              project_name: asset.agentAnalyticsProject || asset.label,
            });
            onSnooze(asset.assetKey);
          }}
        >
          Snooze 30m
        </button>
      </div>
    </article>
  );
}

function EmptyProjectState({ accountLabel, setupHref }) {
  return (
    <section className="aa-panel aa-empty-state">
      <p className="aa-kicker">Live feed not configured</p>
      <h2>Select one Agent Analytics project to start the live map.</h2>
      <p className="aa-empty-copy">
        This Paperclip company is connected as <strong>{accountLabel}</strong>, but it does not have a live project selected yet.
        Open plugin setup, choose the project, and the live map will start populating.
      </p>
      <div className="aa-empty-actions">
        <a
          className="aa-button aa-button-primary"
          href={setupHref}
          onClick={() => trackPluginCta('open_plugin_setup_empty_state')}
        >
          Open plugin setup
        </a>
      </div>
    </section>
  );
}

export function PageSurface({ liveState, onSnooze, setupHref = '/instance/settings/plugins' }) {
  const primaryAsset = liveState.assets[0] || null;
  const accountLabel = liveState.account?.email || 'No connected account';
  const needsProjectSelection =
    liveState.connection.status === 'live' &&
    liveState.assets.length === 0 &&
    String(liveState.connection.detail || '').includes('Select one Agent Analytics project');
  const projectName = needsProjectSelection
    ? 'No project selected'
    : (primaryAsset?.agentAnalyticsProject || primaryAsset?.label || 'Agent Analytics');

  return (
    <div className="aa-page-shell">
      <header className="aa-live-header">
        <div className="aa-live-header-main">
          <BrandMark className="aa-live-header-logo" alt="" />
          <div>
            <p className="aa-kicker">Agent Analytics</p>
            <h1>{projectName}</h1>
            <p className="aa-live-header-copy">Live map</p>
          </div>
        </div>
        <div className="aa-live-header-status">
          <div className="aa-live-header-actions">
            <span className={`aa-status-pill aa-status-${liveState.connection.status}`}>{liveState.connection.label}</span>
            <a
              className="aa-button aa-button-ghost aa-button-icon-link"
              href={setupHref}
              onClick={() => trackPluginCta('open_plugin_setup_header')}
            >
              <CogIcon />
              <span>Plugin setup</span>
            </a>
          </div>
          <dl className="aa-live-header-meta">
            <div className="aa-live-header-meta-row">
              <dt>Agent Analytics account</dt>
              <dd>{accountLabel}</dd>
            </div>
          </dl>
        </div>
      </header>

      {needsProjectSelection ? (
        <EmptyProjectState accountLabel={accountLabel} setupHref={setupHref} />
      ) : (
        <>
      <section className="aa-metric-grid">
        <div className="aa-metric-card">
          <span>Active visitors</span>
          <strong>{liveState.metrics.activeVisitors}</strong>
        </div>
        <div className="aa-metric-card">
          <span>Active sessions</span>
          <strong>{liveState.metrics.activeSessions}</strong>
        </div>
        <div className="aa-metric-card">
          <span>Events / min</span>
          <strong>{liveState.metrics.eventsPerMinute}</strong>
        </div>
        <div className="aa-metric-card">
          <span>Visible assets</span>
          <strong>{liveState.metrics.assetsVisible}</strong>
        </div>
      </section>

      <div className="aa-main-grid">
        <CountryPulse liveState={liveState} />
        <EvidenceColumn liveState={liveState} />
      </div>

      <section className="aa-assets-section">
        <div className="aa-asset-grid">
          {liveState.assets.map((asset) => (
            <AssetCard key={asset.assetKey} asset={asset} onSnooze={onSnooze} />
          ))}
        </div>
      </section>
        </>
      )}
    </div>
  );
}
