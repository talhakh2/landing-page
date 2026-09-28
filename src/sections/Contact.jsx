import { PROFILE } from '../data/content.js';
import { useReveal } from '../hooks/useReveal.js';
import SectionHead from './SectionHead.jsx';

export default function Contact() {
  const pitchRef = useReveal();
  const listRef = useReveal(120);

  return (
    <section className="section contact" id="contact">
      <SectionHead num="05" title="Contact" invert />

      <div ref={pitchRef}>
        <p className="contact__pitch">
          Got a battery that keeps dying before the shift does?
        </p>
        <a className="contact__mail" href={`mailto:${PROFILE.email}`}>
          {PROFILE.email}
        </a>
      </div>

      <ul className="contact__list" ref={listRef}>
        <li>
          <span className="contact__key">Phone</span>
          <a href={`tel:${PROFILE.phone}`}>{PROFILE.phoneLabel}</a>
        </li>
        <li>
          <span className="contact__key">LinkedIn</span>
          <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer">
            {PROFILE.linkedinLabel}
          </a>
        </li>
        <li>
          <span className="contact__key">Location</span>
          <span>{PROFILE.location}</span>
        </li>
        <li>
          <span className="contact__key">Availability</span>
          <span>{PROFILE.availability}</span>
        </li>
      </ul>
    </section>
  );
}
