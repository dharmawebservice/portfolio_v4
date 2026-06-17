const LINKS = ['About','Skills','Experience','Projects','Certifications','Contact'];
const go = (id) => document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:'smooth' });

export default function Footer() {
  return (
    <footer style={{ background:'#000', borderTop:'1px solid var(--gray-3)', padding:'60px 0 40px' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:60, marginBottom:60 }} className="footer-grid">
          {/* Brand */}
          <div>
            <div style={{ fontFamily:'var(--fd)', fontSize:'1.5rem', fontWeight:700, color:'var(--white)', letterSpacing:'-0.03em', marginBottom:14 }}>
              DR<span style={{ color:'var(--amber)' }}>.</span>
            </div>
            <p style={{ fontFamily:'var(--fb)', fontSize:'0.875rem', color:'var(--gray-5)', lineHeight:1.7, maxWidth:260 }}>
              Systems Engineer & Full-Stack Developer. Building scalable software and intelligent systems.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="label" style={{ color:'var(--gray-4)', marginBottom:20 }}>Navigate</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {LINKS.map(l => (
                <button key={l} onClick={() => go(l)}
                  style={{ fontFamily:'var(--fb)', fontSize:'0.875rem', color:'var(--gray-5)', textAlign:'left', transition:'color 0.2s' }}
                  onMouseEnter={e=>e.target.style.color='var(--amber)'}
                  onMouseLeave={e=>e.target.style.color='var(--gray-5)'}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Contact info */}
          <div>
            <div className="label" style={{ color:'var(--gray-4)', marginBottom:20 }}>Contact</div>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {[
                ['Email','mailto:dharmu17reddy@gmail.com','dharmu17reddy@gmail.com'],
                ['Phone','tel:+919611241651','+91 96112 41651'],
                ['LinkedIn','https://linkedin.com','linkedin.com/in/dharmendra'],
                ['GitHub','https://github.com','github.com/dharmendra'],
              ].map(([label, href, val]) => (
                <a key={label} href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  style={{ fontFamily:'var(--fb)', fontSize:'0.875rem', color:'var(--gray-5)', transition:'color 0.2s' }}
                  onMouseEnter={e=>e.target.style.color='var(--amber)'}
                  onMouseLeave={e=>e.target.style.color='var(--gray-5)'}>
                  {val}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ borderTop:'1px solid var(--gray-3)', paddingTop:28, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.7rem', color:'var(--gray-4)', letterSpacing:'0.06em' }}>
            © 2025 Dharmendra Reddy M S · Hyderabad, India
          </span>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.7rem', color:'var(--gray-4)', letterSpacing:'0.06em' }}>
            Built with React · Vite · Framer Motion
          </span>
        </div>
      </div>

      <style>{`@media(max-width:768px){.footer-grid{grid-template-columns:1fr!important;gap:40px!important}}`}</style>
    </footer>
  );
}
