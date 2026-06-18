import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const up = (d=0) => ({ hidden:{ y:40,opacity:0 }, visible:{ y:0,opacity:1,transition:{ duration:0.8,ease:[0.16,1,0.3,1],delay:d } } });

const PROJECTS = [
  { id:1, num:'01', name:'CraveCart',              type:'Full-Stack Platform',  year:'2024', cat:'fullstack', featured:true,  color:'#FF6B00', live:'#', github:'#', stack:['Django','PostgreSQL','Razorpay','Python'],    desc:'Production food ordering platform with restaurant browsing, Razorpay checkout, coupon logic, live order tracking with courier integration, and Brevo transactional email.' },
  { id:2, num:'02', name:'Object Detection System', type:'AI/ML + IoT',          year:'2024', cat:'ai',        featured:true,  color:'#22c55e', live:null, github:'#', stack:['Python','YOLOv3','Raspberry Pi','OpenCV'],   desc:'YOLOv3 real-time object detection on Raspberry Pi with voice feedback, ultrasonic obstacle avoidance sensors, and Blynk IoT remote monitoring dashboard.' },
  { id:3, num:'03', name:'AI Recipe Generator',    type:'Generative AI',        year:'2024', cat:'ai',        featured:false, color:'#3b82f6', live:null, github:'#', stack:['OpenAI API','Streamlit','Python'],           desc:'Personalized recipe recommendations from user inputs via OpenAI API. Interactive Streamlit UI with real-time dynamic generation and dietary filter support.' },
  { id:4, num:'04', name:'SSD Nursery',            type:'E-Commerce · Django',  year:'2025', cat:'fullstack', featured:false, color:'#FF6B00', live:null, github:'#', stack:['Django','PostgreSQL','Razorpay','Brevo'],     desc:'Client plant nursery e-commerce — product variants with pill UI, multi-image galleries, Razorpay payments, courier tracking, custom admin panel.' },
  { id:5, num:'05', name:'NGO Web Portal',         type:'Web Development',      year:'2023', cat:'fullstack', featured:false, color:'#a78bfa', live:null, github:'#', stack:['PHP','MySQL','HTML/CSS','JavaScript'],        desc:'Dynamic portal for Gramseva India Foundation. PHP + MySQL backend, responsive HTML/CSS/JS frontend enabling content management for rural outreach programs.' },
  { id:6, num:'06', name:'Student Management',     type:'Desktop App · Python', year:'2023', cat:'desktop',  featured:false, color:'#f59e0b', live:null, github:'#', stack:['Python','Tkinter','MySQL','Pandas'],          desc:'Python Tkinter desktop app for managing student records. Full CRUD, search functionality, report generation, and MySQL database integration.' },
];

const CATS = [
  { label:'All',        key:'all' },
  { label:'Full-Stack', key:'fullstack' },
  { label:'AI / ML',    key:'ai' },
  { label:'Desktop',    key:'desktop' },
];

function ProjectRow({ p, i }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity:0, y:40 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:20, scale:0.97 }}
      transition={{ duration:0.5, ease:[0.16,1,0.3,1], delay:i*0.06 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderTop:`1px solid ${hov ? p.color+'55' : 'var(--gray-3)'}`,
        padding:'36px 0',
        display:'grid', gridTemplateColumns:'1fr auto', gap:24,
        alignItems:'start', cursor:'default', transition:'border-color 0.3s',
      }}
      className="proj-row-inner">

      <div>
        {/* Meta */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:14, flexWrap:'wrap' }}>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.62rem', color:'var(--gray-4)', letterSpacing:'0.12em' }}>{p.num}</span>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.62rem', color:hov?p.color:'var(--gray-5)', letterSpacing:'0.08em', transition:'color 0.3s' }}>{p.type}</span>
          {p.featured && <span style={{ fontFamily:'var(--fm)', fontSize:'0.58rem', color:'var(--amber)', border:'1px solid rgba(255,107,0,0.35)', padding:'2px 8px', letterSpacing:'0.1em' }}>FEATURED</span>}
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.62rem', color:'var(--gray-4)', letterSpacing:'0.08em', marginLeft:'auto' }}>{p.year}</span>
        </div>

        {/* Name */}
        <h3 style={{ fontFamily:'var(--fd)', fontSize:'clamp(1.2rem,2.2vw,1.7rem)', fontWeight:700, color:hov?'var(--white)':'var(--gray-6)', letterSpacing:'-0.025em', marginBottom:12, transition:'color 0.3s' }}>
          {p.name}
        </h3>

        {/* Desc */}
        <p style={{ fontFamily:'var(--fb)', fontSize:'0.875rem', color:'var(--gray-5)', lineHeight:1.72, maxWidth:580, marginBottom:18 }}>
          {p.desc}
        </p>

        {/* Stack */}
        <div style={{ display:'flex', gap:7, flexWrap:'wrap' }}>
          {p.stack.map(s => (
            <span key={s} style={{ fontFamily:'var(--fm)', fontSize:'0.62rem', color:hov?p.color:'var(--gray-5)', border:`1px solid ${hov?p.color+'44':'var(--gray-3)'}`, padding:'4px 11px', letterSpacing:'0.06em', transition:'all 0.3s' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'flex-end', paddingTop:40, flexShrink:0 }}>
        {p.live && <a href={p.live} style={{ fontFamily:'var(--fm)', fontSize:'0.66rem', color:hov?p.color:'var(--gray-5)', letterSpacing:'0.1em', transition:'color 0.3s' }}>Live ↗</a>}
        <a href={p.github} style={{ fontFamily:'var(--fm)', fontSize:'0.66rem', color:hov?'var(--white)':'var(--gray-5)', letterSpacing:'0.1em', transition:'color 0.3s' }}>Code ↗</a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const [cat, setCat] = useState('all');

  const V = (v,x={}) => ({ variants:v, initial:'hidden', animate:inView?'visible':'hidden', ...x });

  const filtered = PROJECTS.filter(p => cat==='all' || p.cat===cat);

  return (
    <section id="projects" className="section" ref={ref}
      style={{ background:'var(--gray-1)', borderTop:'1px solid var(--gray-3)', borderBottom:'1px solid var(--gray-3)' }}>
      <div className="wrap">

        <div className="proj-head-grid">
          <motion.div {...V(up(0))}><span className="label">Projects</span></motion.div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:24 }}>
            <motion.h2 {...V(up(0.1))}
              style={{ fontFamily:'var(--fd)', fontSize:'clamp(2rem,4.5vw,3.8rem)', fontWeight:700, color:'var(--white)', lineHeight:1.0, letterSpacing:'-0.03em' }}>
              {filtered.length} project{filtered.length!==1?'s':''}.<br />
              <span style={{ color:'var(--amber)' }}>Real problems</span> solved.
            </motion.h2>

            <motion.div {...V(up(0.2))} className="proj-filters">
              {CATS.map((c,i) => (
                <button key={c.key} onClick={() => setCat(c.key)}
                  style={{
                    fontFamily:'var(--fm)', fontSize:'0.66rem', letterSpacing:'0.1em', textTransform:'uppercase',
                    padding:'10px 18px', color:cat===c.key?'var(--black)':'var(--gray-5)',
                    background:cat===c.key?'var(--amber)':'transparent',
                    borderRight:i<CATS.length-1?'1px solid var(--gray-3)':'none',
                    transition:'all 0.2s',
                  }}>
                  {c.label}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => <ProjectRow key={p.id} p={p} i={i} />)}
          </AnimatePresence>
        </motion.div>
        <div style={{ borderTop:'1px solid var(--gray-3)' }} />

      </div>
    </section>
  );
}
