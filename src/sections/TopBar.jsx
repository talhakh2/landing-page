import { NAV } from '../data/content.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';

const IDS = NAV.map((n) => n.id);

export default function TopBar({ theme, onToggleTheme }) {
  const active = useScrollSpy(IDS);

  return (
    <header className="topbar">
      <a className="topbar__mark" href="#top">
        <span className="topbar__initials">AF</span>
        <span className="topbar__name">Abdullah Farooq</span>
      </a>

      <nav className="topbar__nav" aria-label="Sections">
        {NAV.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? 'is-active' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <button
        className="toggle"
        type="button"
        onClick={onToggleTheme}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      >
        <span className="toggle__dot" aria-hidden="true" />
        <span className="toggle__label">{theme === 'dark' ? 'Dark' : 'Light'}</span>
      </button>
    </header>
  );
}
