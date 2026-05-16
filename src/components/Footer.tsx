export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="page-shell flex flex-col items-center justify-between gap-3 text-sm text-accentSoft/55 sm:flex-row">
        <p>© 2026 Saiteja Kolan. All rights reserved.</p>
        <div className="flex items-center gap-5 uppercase tracking-[0.2em]">
          <a href="https://linkedin.com/in/saitejakolan" className="transition hover:text-accentGold">
            LinkedIn
          </a>
          <a href="https://instagram.com/saiteja.visuals" className="transition hover:text-accentGold">
            Instagram
          </a>
          <a href="mailto:saiteja.creative@example.com" className="transition hover:text-accentGold">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
