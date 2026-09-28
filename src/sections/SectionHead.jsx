import { useReveal } from '../hooks/useReveal.js';

export default function SectionHead({ num, title, invert = false }) {
  const ref = useReveal();
  return (
    <div className={`section__head${invert ? ' section__head--invert' : ''}`} ref={ref}>
      <span className="section__num">{num}</span>
      <h2 className="section__title">{title}</h2>
      <span className="section__rule" aria-hidden="true" />
    </div>
  );
}
