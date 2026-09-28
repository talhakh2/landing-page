import { useState } from 'react';
import { ABOUT, CREDENTIALS, LANGUAGES } from '../data/content.js';
import { useReveal } from '../hooks/useReveal.js';
import SectionHead from './SectionHead.jsx';

function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`portrait__frame${failed ? ' is-empty' : ''}`}>
      {!failed && (
        <img
          src="img/profile.jpg"
          alt="Abdullah Farooq, on site in a hi-vis vest"
          width="960"
          height="1200"
          onError={() => setFailed(true)}
        />
      )}
      <span className="portrait__fallback" aria-hidden="true">AF</span>
    </div>
  );
}

export default function Credentials() {
  const bioRef = useReveal();
  const listRef = useReveal(100);

  return (
    <section className="section" id="credentials">
      <SectionHead num="04" title="Who you're calling" />

      <div className="cred">
        <div className="cred__bio" ref={bioRef}>
          <Portrait />
          <p className="cred__text">{ABOUT.body}</p>
          <ul className="langs__inline">
            {LANGUAGES.map(([name, level]) => (
              <li key={name}>
                {name} <em>{level}</em>
              </li>
            ))}
          </ul>
        </div>

        <ul className="cred__list" ref={listRef}>
          {CREDENTIALS.map((c) => (
            <li key={c.title}>
              <span className="cred__kind">{c.kind}</span>
              <span className="cred__title">{c.title}</span>
              <span className="cred__issuer">{c.issuer}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
