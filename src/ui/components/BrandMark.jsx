import darkIcon from '../assets/agent-analytics-icon-dark-1024.png';
import lightIcon from '../assets/agent-analytics-icon-transparent.png';

export function BrandMark({ className = '', alt = 'Agent Analytics' }) {
  const classes = ['aa-theme-logo', className].filter(Boolean).join(' ');
  const accessibilityProps = alt
    ? { role: 'img', 'aria-label': alt }
    : { 'aria-hidden': 'true' };

  return (
    <span className={classes} {...accessibilityProps}>
      <img className="aa-theme-logo-image aa-theme-logo-image-light" src={lightIcon} alt="" aria-hidden="true" />
      <img className="aa-theme-logo-image aa-theme-logo-image-dark" src={darkIcon} alt="" aria-hidden="true" />
    </span>
  );
}
