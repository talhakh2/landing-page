import { lazy, Suspense } from 'react';
import { FACTS, PROFILE } from '../data/content.js';
import { useReveal } from '../hooks/useReveal.js';

// three.js is the heaviest thing on the page — keep it out of the first chunk.
const BatteryScene = lazy(() => import('../three/BatteryScene.jsx'));

export default function Hero({ theme }) {
  const textRef = useReveal();
  const sceneRef = useReveal(120);
  const factsRef = useReveal(220);

  return (
    <section className="hero" id="top">
      <div className="hero__grid">
        <div className="hero__text" ref={textRef}>
          <p className="eyebrow">
            <span className="eyebrow__tick" aria-hidden="true" />
            {PROFILE.eyebrow}
          </p>

          <h1 className="display">
            {PROFILE.headline.map((line, i) => (
              <span className="display__line" key={line}>
                {i === PROFILE.headline.length - 1 ? <mark>{line}</mark> : line}
              </span>
            ))}
          </h1>

          <p className="hero__role">{PROFILE.role}</p>

          <div className="hero__actions">
            <a className="btn btn--solid" href={`mailto:${PROFILE.email}`}>
              Request an inspection
            </a>
            <a className="btn" href={`tel:${PROFILE.phone}`}>
              {PROFILE.phoneLabel}
            </a>
          </div>
        </div>

        <div className="hero__scene" ref={sceneRef}>
          <Suspense fallback={<div className="scene scene--loading" aria-hidden="true" />}>
            <BatteryScene theme={theme} />
          </Suspense>
        </div>
      </div>

      <dl className="factbar" ref={factsRef}>
        {FACTS.map((fact) => (
          <div className="factbar__item" key={fact.key}>
            <dt>{fact.key}</dt>
            <dd>{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
