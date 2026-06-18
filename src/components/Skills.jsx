import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const up = (d=0) => ({ hidden:{ y:40,opacity:0 }, visible:{ y:0,opacity:1,transition:{ duration:0.8,ease:[0.16,1,0.3,1],delay:d } } });

const LANGUAGES = [
  { name:'Java',       pct:88, note:'Enterprise & backend' },
  { name:'Python',     pct:85, note:'ML, scripting, Django' },
  { name:'SQL',        pct:85, note:'PostgreSQL & MySQL' },
  { name:'HTML / CSS', pct:85, note:'Responsive, semantic' },
  { name:'JavaScript', pct:65, note:'ES6+, async, DOM' },
  { name:'PHP',        pct:60, note:'Dynamic pages, MySQL' },
  { name:'UNIX',       pct:50, note:'Shell scripting, commands, file management' },
];

const TOOLS = [
  ['Django','REST APIs','PostgreSQL','MySQL','TensorFlow','YOLOv3','OpenCV','OpenAI API'],
  ['Streamlit','NumPy','Pandas','Scikit-learn','Git / GitHub','Linux','Raspberry Pi','Blynk IoT'],
  ['Razorpay','Brevo API','Agile / Scrum','Tkinter','JDBC','Node.js','HTML5','CSS3'],
];

function Bar({ name, pct, note, inView, active, onHover }) {
  const [w, setW] = useState(0);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setW(v => { const next = Math.min(v + pct/60, pct); if (next >= pct) clearInterval(id); return next; });
      setN(v => { const next = Math.min(v + pct/60, pct); return next; });
    }, 18);
    return () => clearInterval(id);
  }, [inView, pct]);

  const dim = active !== null && active !== name;

  return (
    <div
      onMouseEnter={() => onHover(name)}
      onMouseLeave={() => onHover(null)}
      style={{ transition:'opacity 0.2s', opacity: dim ? 0.35 : 1, cursor:'default' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:9 }}>
        <div style={{ fontFamily:'var(--fd)', fontSize:'1rem', fontWeight:600, color:'var(--white)' }}>{name}</div>
        <div style={{ display:'flex', gap:16, alignItems:'center' }}>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.68rem', color:'var(--gray-5)' }}>{note}</span>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.75rem', color: active===name ? 'var(--amber)' : 'var(--gray-5)', transition:'color 0.2s' }}>
            {Math.round(n)}%
          </span>
        </div>
      </div>
      <div style={{ height:2, background:'var(--gray-3)', overflow:'hidden', position:'relative' }}>
        <div style={{
          position:'absolute', left:0, top:0, bottom:0,
          width: w + '%',
          background: active===name
            ? 'linear-gradient(90deg, var(--amber), var(--amber-l))'
            : 'linear-gradient(90deg, var(--gray-4), var(--gray-5))',
          transition:'width 0.05s linear, background 0.3s',
        }}>
          <div style={{ position:'absolute', right:-1, top:-2, width:6, height:6, borderRadius:'50%', background: active===name ? 'var(--amber)' : 'var(--gray-5)', boxShadow: active===name ? '0 0 8px var(--amber)' : 'none', transition:'all 0.3s' }} />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const [active, setActive] = useState(null);

  const V = (variants, extra={}) => ({ variants, initial:'hidden', animate:inView?'visible':'hidden', ...extra });

  return (
    <section id="skills" className="section" ref={ref}
      style={{ background:'var(--gray-1)', borderTop:'1px solid var(--gray-3)', borderBottom:'1px solid var(--gray-3)' }}>
      <div className="wrap">

        <div className="sk-head-grid">
          <motion.div {...V(up(0))}><span className="label">Skills</span></motion.div>
          <motion.h2 {...V(up(0.1))}
            style={{ fontFamily:'var(--fd)', fontSize:'clamp(2rem,4.5vw,3.8rem)', fontWeight:700, color:'var(--white)', lineHeight:1.0, letterSpacing:'-0.03em' }}>
            Technical <span style={{ color:'var(--amber)' }}>stack</span><br />across the layers.
          </motion.h2>
        </div>

        <div className="sk-body-grid">
          {/* Bars */}
          <motion.div {...V(up(0.15))}>
            <p className="label" style={{ marginBottom:40 }}>Languages</p>
            <div style={{ display:'flex', flexDirection:'column', gap:30 }}>
              {LANGUAGES.map(l => (
                <Bar key={l.name} {...l} inView={inView} active={active} onHover={setActive} />
              ))}
            </div>
          </motion.div>

          {/* Tools */}
          <motion.div {...V(up(0.2))}>
            <p className="label" style={{ marginBottom:40 }}>Frameworks &amp; Tools</p>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {TOOLS.map((row, ri) => (
                <div key={ri} style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                  {row.map((tool, ti) => (
                    <motion.div key={tool}
                      initial={{ opacity:0, scale:0.8 }}
                      animate={inView ? { opacity:1, scale:1 } : { opacity:0, scale:0.8 }}
                      transition={{ delay:0.3+ri*0.07+ti*0.035, duration:0.35, ease:[0.16,1,0.3,1] }}
                      style={{ fontFamily:'var(--fm)', fontSize:'0.7rem', letterSpacing:'0.04em', color:'var(--gray-5)', border:'1px solid var(--gray-3)', padding:'7px 13px', transition:'all 0.2s', cursor:'default' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor='var(--amber)'; e.currentTarget.style.color='var(--amber)'; e.currentTarget.style.background='rgba(255,107,0,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor='var(--gray-3)'; e.currentTarget.style.color='var(--gray-5)'; e.currentTarget.style.background='transparent'; }}>
                      {tool}
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>

            {/* Soft skills */}
            <div style={{ marginTop:52, borderTop:'1px solid var(--gray-3)', paddingTop:40 }}>
              <p className="label" style={{ marginBottom:24 }}>Soft Skills</p>
              {['Problem Solving','Team Collaboration','Technical Communication','Workshop Facilitation','Time Management','Adaptability'].map((s, i) => (
                <motion.div key={s}
                  {...V(up(0.4+i*0.05))}
                  style={{ display:'flex', alignItems:'center', gap:16, padding:'13px 0', borderBottom:'1px solid var(--gray-3)', transition:'padding-left 0.25s', cursor:'default' }}
                  onMouseEnter={e => e.currentTarget.style.paddingLeft='10px'}
                  onMouseLeave={e => e.currentTarget.style.paddingLeft='0'}>
                  <span style={{ color:'var(--amber)', fontFamily:'var(--fm)', fontSize:'0.68rem', flexShrink:0 }}>0{i+1}</span>
                  <span style={{ fontFamily:'var(--fb)', fontSize:'0.875rem', color:'var(--gray-6)' }}>{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
