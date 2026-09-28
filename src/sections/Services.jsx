import { SERVICES } from '../data/content.js';
import { useReveal } from '../hooks/useReveal.js';
import SectionHead from './SectionHead.jsx';

function Service({ item, delay }) {
  const ref = useReveal(delay);
  return (
    <article className="svc" ref={ref}>
      <span className="svc__n">{item.n}</span>
      <h3 className="svc__title">{item.title}</h3>
      <p className="svc__body">{item.body}</p>
    </article>
  );
}

export default function Services() {
  return (
    <section className="section" id="services">
      <SectionHead num="01" title="What I do" />
      <div className="svcs">
        {SERVICES.map((item, i) => (
          <Service key={item.n} item={item} delay={i * 50} />
        ))}
      </div>
    </section>
  );
}
