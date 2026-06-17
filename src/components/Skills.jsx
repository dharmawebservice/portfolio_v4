import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const LANGUAGES = [
  { name:'Java',       pct:88, note:'Primary enterprise language' },
  { name:'Python',     pct:85, note:'ML, scripting, Django backend' },
  { name:'SQL',        pct:83, note:'PostgreSQL & MySQL' },
  { name:'HTML / CSS', pct:85, note:'Semantic, responsive, animated' },
  { name:'JavaScript', pct:76, note:'ES6+, DOM, async patterns' },
  { name:'PHP',        pct:70, note:'Dynamic web pages, MySQL integration' },
];

const TOOLS = [
  ['Django','REST APIs','PostgreSQL','MySQL','TensorFlow','YOLOv3','OpenCV','OpenAI API'],
  ['Streamlit','NumPy','Pandas','Scikit-learn','Git / GitHub','Linux','Raspberry Pi','Blynk IoT'],
  ['Razorpay','Brevo API','Agile / Scrum','Tkinter','JDBC','Node.js','HTML5','CSS3'],
];

function AnimatedBar({ pct, color, inView }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    if (inView) setTimeout(() => setWidth(pct), 200);
  }, [inView, pct]);

  return (
    <div style={{ height:2, background:'var(--gray-3)', borderRadius:0, overflow:'hidden', marginTop:10 }}>
      <div style={{
        height:'100%', width: width + '%',
        background: color || 'var(--amber)',
        transition:'width 1.3s cubic-bezier(0.25,0.46,0.45,0.94)',
        position:'relative',
      }}>
        <div style={{ position:'absolute', right:0, top:-2, width:6, height:6, borderRadius:'50%', background: color || 'var(--amber)', boxShadow:`0 0 8px ${color||'var(--amber)'}` }} />
      </div>
    </div>
  );
}

const fadeUp = (delay=0) => ({
  hidden:  { y:40, opacity:0 },
  visible: { y:0, opacity:1, transition:{ duration:0.8, ease:[0.16,1,0.3,1], delay } }
});

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-100px' });
  const [hoveredBar, setHoveredBar] = useState(null);

  return (
    <section id="skills" className="section" ref={ref}
      style={{ background:'var(--gray-1)', borderTop:'1px solid var(--gray-3)', borderBottom:'1px solid var(--gray-3)' }}>
      <div className="wrap">

        {/* Header */}
        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:80, marginBottom:100, alignItems:'start' }} className="sk-head-grid">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={inView?'visible':'hidden'}>
            <span className="label">Skills</span>
          </motion.div>
          <motion.h2 variants={fadeUp(0.1)} initial="hidden" animate={inView?'visible':'hidden'}
            style={{ fontFamily:'var(--fd)', fontSize:'clamp(2rem,4.5vw,3.8rem)', fontWeight:700, color:'var(--white)', lineHeight:1.0, letterSpacing:'-0.03em' }}>
            Technical <span style={{ color:'var(--amber)' }}>stack</span><br />
            across the layers.
          </motion.h2>
        </div>

        {/* Two columns: bars + tools */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:80 }} className="sk-body-grid">

          {/* Language Bars */}
          <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView?'visible':'hidden'}>
            <p className="label" style={{ marginBottom:40 }}>Languages</p>
            <div style={{ display:'flex', flexDirection:'column', gap:32 }}>
              {LANGUAGES.map((lang, i) => (
                <div key={lang.name}
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                  style={{ cursor:'default', transition:'opacity 0.2s', opacity: hoveredBar !== null && hoveredBar !== i ? 0.4 : 1 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
                    <div style={{ fontFamily:'var(--fd)', fontSize:'1rem', fontWeight:600, color:'var(--white)' }}>{lang.name}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                      <span style={{ fontFamily:'var(--fm)', fontSize:'0.7rem', color:'var(--gray-5)' }}>{lang.note}</span>
                      <span style={{ fontFamily:'var(--fm)', fontSize:'0.78rem', color: hoveredBar===i ? 'var(--amber)' : 'var(--gray-5)' }}>{lang.pct}%</span>
                    </div>
                  </div>
                  <AnimatedBar pct={lang.pct} inView={inView} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div variants={fadeUp(0.2)} initial="hidden" animate={inView?'visible':'hidden'}>
            <p className="label" style={{ marginBottom:40 }}>Frameworks & Tools</p>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {TOOLS.map((row, ri) => (
                <div key={ri} style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {row.map((tool, ti) => (
                    <motion.div key={tool}
                      initial={{ opacity:0, scale:0.85 }}
                      animate={inView ? { opacity:1, scale:1 } : { opacity:0, scale:0.85 }}
                      transition={{ delay: 0.3 + ri*0.08 + ti*0.04, duration:0.4, ease:[0.16,1,0.3,1] }}
                      style={{
                        fontFamily:'var(--fm)', fontSize:'0.72rem', letterSpacing:'0.04em',
                        color:'var(--gray-5)', border:'1px solid var(--gray-3)',
                        padding:'8px 14px', cursor:'default',
                        transition:'all 0.2s',
                      }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--amber)'; e.currentTarget.style.color='var(--amber)'; e.currentTarget.style.background='rgba(255,107,0,0.06)'; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--gray-3)'; e.currentTarget.style.color='var(--gray-5)'; e.currentTarget.style.background='transparent'; }}>
                      {tool}
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            {/* Soft skills */}
            <div style={{ marginTop:56, borderTop:'1px solid var(--gray-3)', paddingTop:40 }}>
              <p className="label" style={{ marginBottom:24 }}>Soft Skills</p>
              <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
                {['Problem Solving','Team Collaboration','Technical Communication','Workshop Facilitation','Time Management','Adaptability'].map((s, i) => (
                  <motion.div key={s}
                    variants={fadeUp(0.4+i*0.05)} initial="hidden" animate={inView?'visible':'hidden'}
                    style={{ display:'flex', alignItems:'center', gap:16, padding:'14px 0', borderBottom:'1px solid var(--gray-3)', cursor:'default', transition:'all 0.2s' }}
                    onMouseEnter={e=>e.currentTarget.style.paddingLeft='8px'}
                    onMouseLeave={e=>e.currentTarget.style.paddingLeft='0'}>
                    <span style={{ color:'var(--amber)', fontFamily:'var(--fm)', fontSize:'0.7rem' }}>0{i+1}</span>
                    <span style={{ fontFamily:'var(--fb)', fontSize:'0.9rem', color:'var(--gray-6)' }}>{s}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){.sk-head-grid{grid-template-columns:1fr!important;gap:24px!important}.sk-body-grid{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
