import Reveal from './Reveal';
import GlassCard from './GlassCard';
import GlassText from './GlassText';
import { contactItems } from '../data/content';

export default function Contact() {
  return (
    <section id="contact" className="section-shell">
      <div className="page-shell">
        <Reveal className="mx-auto max-w-4xl text-center" y={24}>
          <p className="kicker">Contact</p>
          <h2 className="section-heading">
            <GlassText>Let&apos;s build something meaningful.</GlassText>
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {contactItems.map((item) => (
              <GlassCard
                as="a"
                key={item.label}
                href={item.href}
                {...(item.href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="glass-panel group block px-5 py-5 text-left hover:border-white/35"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-white/55">{item.label}</p>
                <p className="mt-2 text-base text-white/85 transition group-hover:text-white">{item.value}</p>
              </GlassCard>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
