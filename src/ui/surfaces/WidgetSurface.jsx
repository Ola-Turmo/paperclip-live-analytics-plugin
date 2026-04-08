import { BrandMark } from '../components/BrandMark.jsx';
import { trackPluginCta } from '../analytics.js';

export function WidgetSurface({ widget, fullPageHref = '?surface=page' }) {
  const summary = widget.historicalSummary;

  return (
    <section className="aa-widget">
      <div className="aa-widget-header">
        <div>
          <div className="aa-widget-brand">
            <BrandMark className="aa-widget-brandmark" alt="" />
            <span className="aa-widget-brand-label">Agent Analytics</span>
          </div>
          <p className="aa-kicker">Live Status</p>
          <h2>{widget.connection.label}</h2>
        </div>
        <span className={`aa-status-pill aa-status-${widget.connection.status}`}>{widget.tier || 'tier unknown'}</span>
      </div>

      <div className="aa-widget-metrics">
        <div>
          <span>Visitors</span>
          <strong>{widget.metrics.activeVisitors}</strong>
        </div>
        <div>
          <span>Sessions</span>
          <strong>{widget.metrics.activeSessions}</strong>
        </div>
        <div>
          <span>EPM</span>
          <strong>{widget.metrics.eventsPerMinute}</strong>
        </div>
      </div>

      {summary ? (
        <div className="aa-widget-summary">
          <div className="aa-mini-row">
            <span>7d events</span>
            <strong>{summary.totals.events}</strong>
          </div>
          <div className="aa-mini-row">
            <span>Last active</span>
            <strong>{summary.lastActiveDate || 'none'}</strong>
          </div>
        </div>
      ) : null}

      <div className="aa-widget-footer">
        <a
          className="aa-button aa-button-secondary"
          href={fullPageHref}
          onClick={() => trackPluginCta('open_full_live_page_widget')}
        >
          Open full live page
        </a>
      </div>
    </section>
  );
}
