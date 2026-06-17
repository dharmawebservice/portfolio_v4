import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = (delay=0) => ({
  hidden:  { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.85, ease: [0.16,1,0.3,1], delay } }
});

const FACTS = [
  { n:'B.E. CS & AI', s:'KLE Technological University · CGPA 7.66' },
  { n:'Systems Engineer', s:'Tata Consultancy Services · Apr 2026–Present' },
  { n:'3 Internships', s:'AI/ML · Full-Stack · Web Development' },
  { n:'50+ Students', s:'Workshops & batch coordination' },
];

const VALUES = [
  { icon:'⚡', t:'Speed + Quality', d:'Fast iteration without cutting corners. I ship, then refine.' },
  { icon:'🧠', t:'Continuous Learning', d:'New stacks, new paradigms. Comfort zones are growth ceilings.' },
  { icon:'🎯', t:'User First', d:'Every architectural decision traces back to the person using it.' },
  { icon:'🤝', t:'Community', d:"I've trained 50+ students. Sharing knowledge multiplies it." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section" ref={ref}>
      <div className="wrap">

        {/* Section label + heading */}
        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:80, marginBottom:100, alignItems:'start' }} className="about-head-grid">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={inView?'visible':'hidden'}>
            <span className="label">About</span>
          </motion.div>
          <motion.h2 variants={fadeUp(0.1)} initial="hidden" animate={inView?'visible':'hidden'}
            style={{ fontFamily:'var(--fd)', fontSize:'clamp(2rem,4.5vw,3.8rem)', fontWeight:700, color:'var(--white)', lineHeight:1.0, letterSpacing:'-0.03em' }}>
            CS & AI engineer.<br />
            <span style={{ color:'var(--amber)' }}>Builder</span> by instinct.<br />
            Hyderabad.
          </motion.h2>
        </div>

        {/* Bio + photo */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', gap:80, marginBottom:100, alignItems:'start' }} className="about-bio-grid">
          <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView?'visible':'hidden'}>
            <p style={{ fontFamily:'var(--fb)', fontSize:'1.1rem', color:'var(--gray-5)', lineHeight:1.85, marginBottom:32, maxWidth:560 }}>
              I'm a Computer Science and Artificial Intelligence graduate who genuinely loves the craft of building software.
              From the logic of a clean backend API to the feel of a smooth UI interaction — I care about every layer of the stack.
            </p>
            <p style={{ fontFamily:'var(--fb)', fontSize:'1.1rem', color:'var(--gray-5)', lineHeight:1.85, marginBottom:48, maxWidth:560 }}>
              I currently work as a <strong style={{ color:'var(--white)', fontWeight:500 }}>Systems Engineer at TCS</strong> in Hyderabad,
              bringing enterprise thinking to the code I write. Before TCS, I interned at three
              companies — AI/ML at Rooman Technologies, full-stack Java at Kodnest, and web development
              at Gramseva Foundation.
            </p>

            {/* Values grid */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:1, border:'1px solid var(--gray-3)' }} className="values-grid">
              {VALUES.map(({ icon, t, d }, i) => (
                <motion.div key={t}
                  variants={fadeUp(0.2 + i*0.08)} initial="hidden" animate={inView?'visible':'hidden'}
                  style={{ padding:'28px 24px', borderRight: i%2===0?'1px solid var(--gray-3)':'none', borderBottom: i<2?'1px solid var(--gray-3)':'none', transition:'background 0.25s' }}
                  onMouseEnter={e=>e.currentTarget.style.background='var(--gray-1)'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{ fontSize:'1.4rem', marginBottom:10 }}>{icon}</div>
                  <div style={{ fontFamily:'var(--fd)', fontSize:'0.9rem', fontWeight:600, color:'var(--white)', marginBottom:6 }}>{t}</div>
                  <div style={{ fontFamily:'var(--fb)', fontSize:'0.82rem', color:'var(--gray-5)', lineHeight:1.6 }}>{d}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div variants={fadeUp(0.2)} initial="hidden" animate={inView?'visible':'hidden'} className="about-photo">
            <div style={{ position:'relative' }}>
              <img src="/photo.jpg" alt="Dharmendra Reddy" style={{ width:'100%', objectFit:'cover', filter:'grayscale(15%)', display:'block' }} />
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:2, background:'var(--amber)' }} />
            </div>
            <div style={{ marginTop:16, fontFamily:'var(--fm)', fontSize:'0.68rem', color:'var(--gray-5)', letterSpacing:'0.08em' }}>
              Dharmendra Reddy M S — Hyderabad, 2025
            </div>
          </motion.div>
        </div>

        {/* Fact cards */}
        <hr className="h-rule" style={{ marginBottom:60 }} />
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:1, border:'1px solid var(--gray-3)' }} className="facts-grid">
          {FACTS.map(({ n, s }, i) => (
            <motion.div key={n}
              variants={fadeUp(0.1 + i*0.07)} initial="hidden" animate={inView?'visible':'hidden'}
              style={{ padding:'32px 28px', borderRight: i<3?'1px solid var(--gray-3)':'none', transition:'background 0.25s' }}
              onMouseEnter={e=>e.currentTarget.style.background='var(--gray-1)'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
              <div style={{ fontFamily:'var(--fd)', fontSize:'1.05rem', fontWeight:700, color:'var(--white)', marginBottom:8 }}>{n}</div>
              <div className="label" style={{ color:'var(--gray-5)' }}>{s}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){.about-head-grid{grid-template-columns:1fr!important;gap:24px!important}.about-bio-grid{grid-template-columns:1fr!important}.about-photo{display:none}.facts-grid{grid-template-columns:1fr 1fr!important}.values-grid{grid-template-columns:1fr!important}}
        @media(max-width:640px){.facts-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
