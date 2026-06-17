import { useEffect, useState } from 'react';

const NAV = ['About','Skills','Experience','Projects','Contact'];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const go = (id) => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' }); setOpen(false); };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        height: 'var(--nav-h)', display: 'flex', alignItems: 'center',
        transition: 'background 0.4s, border-color 0.4s',
        background: scrolled ? 'rgba(0,0,0,0.92)' : 'transparent',
        borderBottom: scrolled ? '1px solid #1A1A1A' : '1px solid transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
      }}>
        <div className="wrap" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', width:'100%' }}>
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ fontFamily:'var(--fd)', fontSize:'1.4rem', fontWeight:700, color:'var(--white)', letterSpacing:'-0.03em' }}>
            DR<span style={{ color:'var(--amber)' }}>.</span>
          </button>

          {/* Desktop links */}
          <ul style={{ display:'flex', gap:4, listStyle:'none' }} className="nav-desktop">
            {NAV.map(n => (
              <li key={n}>
                <button onClick={() => go(n)} style={{
                  fontFamily:'var(--fm)', fontSize:'0.72rem', letterSpacing:'0.1em', textTransform:'uppercase',
                  color: active === n.toLowerCase() ? 'var(--white)' : 'var(--gray-5)',
                  padding:'8px 16px', borderRadius:4,
                  transition:'color 0.2s',
                  borderBottom: active === n.toLowerCase() ? '1px solid var(--amber)' : '1px solid transparent',
                }}>
                  {n}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <button onClick={() => go('Contact')} className="nav-desktop"
            style={{
              fontFamily:'var(--fd)', fontSize:'0.82rem', fontWeight:600,
              color:'var(--black)', background:'var(--amber)',
              padding:'10px 24px', borderRadius:2,
              transition:'background 0.2s, transform 0.2s',
            }}
            onMouseEnter={e => e.target.style.background='var(--amber-l)'}
            onMouseLeave={e => e.target.style.background='var(--amber)'}>
            Hire Me
          </button>

          {/* Hamburger */}
          <button onClick={() => setOpen(!open)} className="nav-mobile"
            style={{ display:'flex', flexDirection:'column', gap:5, padding:8 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display:'block', width:22, height:1.5, background:'var(--white)',
                borderRadius:2, transition:'all 0.25s',
                transform: open ? (i===0?'translateY(6.5px) rotate(45deg)':i===1?'scaleX(0)':'translateY(-6.5px) rotate(-45deg)') : 'none',
                opacity: open && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position:'fixed', inset:0, zIndex:999, background:'#000',
          display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:8,
        }}>
          {NAV.map(n => (
            <button key={n} onClick={() => go(n)} style={{
              fontFamily:'var(--fd)', fontSize:'2rem', fontWeight:700,
              color: active === n.toLowerCase() ? 'var(--amber)' : 'var(--white)',
              padding:'12px 40px', transition:'color 0.2s',
            }}>{n}</button>
          ))}
          <button onClick={() => go('Contact')} style={{
            fontFamily:'var(--fd)', fontSize:'1rem', fontWeight:600,
            color:'var(--black)', background:'var(--amber)',
            padding:'14px 40px', borderRadius:2, marginTop:24,
          }}>Hire Me</button>
        </div>
      )}

      <style>{`
        .nav-desktop { display:flex; align-items:center; }
        .nav-mobile { display:none; }
        @media(max-width:768px){.nav-desktop{display:none!important}.nav-mobile{display:flex!important}}
      `}</style>
    </>
  );
}
