import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CERTS = [
  { num:'01', name:'AI ML Engineer Training', issuer:'Rooman Technologies', year:'2025', color:'#FF6B00' },
  { num:'02', name:'Full Stack Java Development', issuer:'Kodnest Technologies', year:'2026', color:'#22c55e' },
  { num:'03', name:'TCS National Qualifier Test (NQT)', issuer:'Tata Consultancy Services', year:'2025', color:'#3b82f6' },
  { num:'04', name:'Web Developer Internship', issuer:'Gramseva India Foundation', year:'2024', color:'#a78bfa' },
  { num:'05', name:'Python for Data Science & AI', issuer:'NPTEL / Coursera', year:'2024', color:'#f59e0b' },
  { num:'06', name:'Machine Learning Specialization', issuer:'Coursera — Andrew Ng', year:'2024', color:'#ec4899' },
];

const fadeUp = (d=0) => ({
  hidden:  { y:40, opacity:0 },
  visible: { y:0, opacity:1, transition:{ duration:0.8, ease:[0.16,1,0.3,1], delay:d } }
});

export default function Certifications() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="certifications" className="section" ref={ref}>
      <div className="wrap">

        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:80, marginBottom:100, alignItems:'start' }} className="cert-head-grid">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={inView?'visible':'hidden'}>
            <span className="label">Credentials</span>
          </motion.div>
          <motion.h2 variants={fadeUp(0.1)} initial="hidden" animate={inView?'visible':'hidden'}
            style={{ fontFamily:'var(--fd)', fontSize:'clamp(2rem,4.5vw,3.8rem)', fontWeight:700, color:'var(--white)', lineHeight:1.0, letterSpacing:'-0.03em' }}>
            Certifications &amp;<br />
            <span style={{ color:'var(--amber)' }}>achievements.</span>
          </motion.h2>
        </div>

        {/* Grid of cert rows */}
        <div>
          {CERTS.map((c, i) => (
            <motion.div key={c.num}
              variants={fadeUp(0.1 + i*0.07)} initial="hidden" animate={inView?'visible':'hidden'}
              style={{
                display:'grid', gridTemplateColumns:'200px 1fr auto',
                gap:80, borderTop:'1px solid var(--gray-3)',
                padding:'32px 0', transition:'background 0.25s, padding-left 0.25s',
                cursor:'default',
              }}
              className="cert-row"
              onMouseEnter={ev=>{ ev.currentTarget.style.background='var(--gray-1)'; ev.currentTarget.style.paddingLeft='12px'; }}
              onMouseLeave={ev=>{ ev.currentTarget.style.background='transparent'; ev.currentTarget.style.paddingLeft='0'; }}>

              {/* Left */}
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                <span style={{ fontFamily:'var(--fm)', fontSize:'0.65rem', color:'var(--gray-4)', letterSpacing:'0.12em' }}>{c.num}</span>
                <div style={{ width:24, height:2, background:c.color, marginTop:4 }} />
              </div>

              {/* Centre */}
              <div>
                <h3 style={{ fontFamily:'var(--fd)', fontSize:'1.15rem', fontWeight:700, color:'var(--white)', letterSpacing:'-0.02em', marginBottom:6 }}>{c.name}</h3>
                <span style={{ fontFamily:'var(--fm)', fontSize:'0.7rem', color:'var(--gray-5)', letterSpacing:'0.06em' }}>{c.issuer}</span>
              </div>

              {/* Right */}
              <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
                <span style={{ fontFamily:'var(--fm)', fontSize:'0.7rem', color:'var(--gray-5)', letterSpacing:'0.08em' }}>{c.year}</span>
                <a href="#" style={{ fontFamily:'var(--fm)', fontSize:'0.65rem', color:c.color, letterSpacing:'0.1em', textTransform:'uppercase' }}>Verify ↗</a>
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop:'1px solid var(--gray-3)' }} />
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){.cert-head-grid,.cert-row{grid-template-columns:1fr!important;gap:20px!important}}
      `}</style>
    </section>
  );
}
