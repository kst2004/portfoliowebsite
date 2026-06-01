import Reveal from './Reveal';
import { contactItems } from '../data/content';

export default function Contact() {
  return (
    <section id="contact" className="section-shell">
      <div className="page-shell">
        <Reveal className="mx-auto max-w-4xl text-center" y={24}>
          <p className="kicker">Contact</p>
          <h2 className="section-heading">Let&apos;s build something meaningful.</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                {...(item.href.startsWith('https://') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="glass-panel group px-5 py-5 text-left transition duration-700 hover:border-accentGold/35 hover:bg-white/[0.1]"
              >
                <p className="text-xs uppercase tracking-[0.24em] text-accentSoft/55">{item.label}</p>
                <p className="mt-2 text-base text-accentSoft/86 transition group-hover:text-accentGold">{item.value}</p>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
