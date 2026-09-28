import { ABOUT, PROCESS } from '../data/content.js';
import { useReveal } from '../hooks/useReveal.js';
import SectionHead from './SectionHead.jsx';

function Step({ item, delay }) {
  const ref = useReveal(delay);
  return (
    <li className="step" ref={ref}>
      <span className="step__n">{item.n}</span>
      <h3 className="step__title">{item.title}</h3>
      <p className="step__body">{item.body}</p>
    </li>
  );
}

export default function Process() {
  const ledeRef = useReveal();

  return (
    <section className="section process" id="process">
      <SectionHead num="03" title="How a job runs" />
      <p className="process__lede" ref={ledeRef}>{ABOUT.lede}</p>
      <ol className="steps">
        {PROCESS.map((item, i) => (
          <Step key={item.n} item={item} delay={i * 60} />
        ))}
      </ol>
    </section>
  );
}
