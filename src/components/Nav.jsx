import { useEffect, useState } from 'react';

const NAV = ['About','Skills','Experience','Projects','Certifications','Contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const [active, setActive]     = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const fn = () => { if (window.innerWidth > 768) setOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  // ── Active section tracker (fixed) ──
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('section[id]'));

    const getActive = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let current = '';
      for (const s of sections) {
        if (s.offsetTop <= scrollY) current = s.id;
      }
      setActive(current);
    };

    getActive(); // run once on mount
    window.addEventListener('scroll', getActive, { passive: true });
    return () => window.removeEventListener('scroll', getActive);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const go = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const navBg = scrolled
    ? 'rgba(0,0,0,0.94)'
    : open ? '#000' : 'transparent';

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 'var(--nav-h)',
        display: 'flex', alignItems: 'center',
        background: navBg,
        borderBottom: scrolled ? '1px solid #1A1A1A' : '1px solid transparent',
        backdropFilter: scrolled && !open ? 'blur(20px)' : 'none',
        transition: 'background 0.35s, border-color 0.35s',
      }}>
        <div className="wrap" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%', gap: 24 }}>

          {/* ── Logo ── */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ fontFamily:'var(--fd)', fontSize:'1.4rem', fontWeight:700, color:'var(--white)', letterSpacing:'-0.03em', flexShrink:0 }}>
            DR<span style={{ color:'var(--amber)' }}>.</span>
          </button>

          {/* ── Desktop links ── */}
          <ul className="nav-links-desktop" style={{ gap: 2 }}>
            {NAV.map(n => (
              <li key={n}>
                <button onClick={() => go(n)} style={{
                  fontFamily: 'var(--fm)', fontSize: '0.72rem',
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: active === n.toLowerCase() ? 'var(--white)' : 'var(--gray-5)',
                  padding: '8px 14px',
                  borderBottom: active === n.toLowerCase() ? '1px solid var(--amber)' : '1px solid transparent',
                  transition: 'color 0.2s, border-color 0.2s',
                }}>
                  {n}
                </button>
              </li>
            ))}
          </ul>

          {/* ── Desktop CTA ── */}
          <button
            className="nav-cta-desktop"
            onClick={() => go('Contact')}
            style={{
              fontFamily:'var(--fd)', fontSize:'0.82rem', fontWeight:600,
              color:'var(--black)', background:'var(--amber)',
              padding:'10px 24px', borderRadius:2, flexShrink:0,
              transition:'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--amber-l)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--amber)'}>
            Hire Me
          </button>

          {/* ── Hamburger (mobile only) ── */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen(v => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{ flexDirection:'column', gap:5, padding:8, zIndex:1001 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: 'block', width: 22, height: 1.5,
                background: 'var(--white)', borderRadius: 2,
                transition: 'transform 0.25s, opacity 0.25s',
                transform: open
                  ? i===0 ? 'translateY(6.5px) rotate(45deg)'
                  : i===2 ? 'translateY(-6.5px) rotate(-45deg)'
                  : 'scaleX(0)'
                  : 'none',
                opacity: open && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Menu ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: '#000',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 8,
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.3s ease',
      }}>
        {NAV.map((n, i) => (
          <button key={n} onClick={() => go(n)}
            style={{
              fontFamily: 'var(--fd)', fontSize: 'clamp(1.6rem,6vw,2.4rem)', fontWeight: 700,
              color: active === n.toLowerCase() ? 'var(--amber)' : 'var(--white)',
              padding: '10px 40px', transition: 'color 0.2s',
              transform: open ? 'translateY(0)' : 'translateY(20px)',
              opacity: open ? 1 : 0,
              transitionDelay: open ? `${i * 0.05}s` : '0s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--amber)'}
            onMouseLeave={e => e.currentTarget.style.color = active === n.toLowerCase() ? 'var(--amber)' : 'var(--white)'}>
            {n}
          </button>
        ))}
        <button onClick={() => go('Contact')}
          style={{
            fontFamily: 'var(--fd)', fontSize: '1rem', fontWeight: 600,
            color: 'var(--black)', background: 'var(--amber)',
            padding: '14px 40px', borderRadius: 2, marginTop: 20,
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            opacity: open ? 1 : 0,
            transition: 'transform 0.3s, opacity 0.3s',
            transitionDelay: open ? `${NAV.length * 0.05}s` : '0s',
          }}>
          Hire Me
        </button>
      </div>
    </>
  );
}