import { BrandMark } from '../components/BrandMark.jsx';

export function WidgetSurface({ widget, fullPageHref = '?surface=page' }) {
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

      <div className="aa-widget-footer">
        <a className="aa-button aa-button-secondary" href={fullPageHref}>Open full live page</a>
      </div>
    </section>
  );
}
