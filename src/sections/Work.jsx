import { useState } from 'react';
import { WORK, WORK_STRIP } from '../data/content.js';
import { useReveal } from '../hooks/useReveal.js';
import SectionHead from './SectionHead.jsx';
import Lightbox from './Lightbox.jsx';

const ALL = [...WORK, WORK_STRIP];

/** One frame. The image fades in when it decodes rather than snapping in. */
function Tile({ item, index, onOpen, delay }) {
  const ref = useReveal(delay);

  return (
    <button
      className={`tile${item.feature ? ' tile--feature' : ''}`}
      type="button"
      ref={ref}
      onClick={() => onOpen(index)}
      aria-label={`${item.title} — open larger`}
    >
      <img
        src={`img/work/${item.id}@800.webp`}
        alt={item.alt ?? item.title}
        loading="lazy"
        decoding="async"
        onLoad={(e) => e.currentTarget.classList.add('is-loaded')}
        ref={(el) => {
          // Cached images can finish before React attaches onLoad.
          if (el?.complete) el.classList.add('is-loaded');
        }}
      />
      <span className="tile__plate">
        <span className="tile__tag">{item.tag}</span>
        <span className="tile__title">{item.title}</span>
      </span>
    </button>
  );
}

export default function Work() {
  const [active, setActive] = useState(null);
  const noteRef = useReveal(160);

  return (
    <section className="section" id="equipment">
      <SectionHead num="02" title="Equipment" />

      <div className="work">
        {WORK.map((item, i) => (
          <Tile key={item.id} item={item} index={i} onOpen={setActive} delay={i * 60} />
        ))}
      </div>

      <div className="work__strip">
        <Tile item={WORK_STRIP} index={ALL.length - 1} onOpen={setActive} delay={0} />
      </div>

      <p className="work__note" ref={noteRef}>
        Reference photographs of the equipment classes this work covers, not images of
        client sites. Credits and licences are shown with each plate.
      </p>

      {active !== null && (
        <Lightbox
          items={ALL}
          index={active}
          onIndex={setActive}
          onClose={() => setActive(null)}
        />
      )}
    </section>
  );
}
