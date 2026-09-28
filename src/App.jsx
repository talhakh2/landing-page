import { useTheme } from './hooks/useTheme.js';
import TopBar from './sections/TopBar.jsx';
import Hero from './sections/Hero.jsx';
import Services from './sections/Services.jsx';
import Work from './sections/Work.jsx';
import Process from './sections/Process.jsx';
import Credentials from './sections/Credentials.jsx';
import Contact from './sections/Contact.jsx';

export default function App() {
  const [theme, toggleTheme] = useTheme();

  return (
    <>
      <a className="skip" href="#services">Skip to content</a>

      <TopBar theme={theme} onToggleTheme={toggleTheme} />

      <main>
        <Hero theme={theme} />
        <div className="hazard" aria-hidden="true" />
        <Services />
        <Work />
        <Process />
        <Credentials />
        <Contact />
      </main>

      <footer className="foot">
        <p>&copy; {new Date().getFullYear()} Abdullah Farooq</p>
        <p className="foot__note">Industrial battery service · Jeddah</p>
      </footer>
    </>
  );
}
