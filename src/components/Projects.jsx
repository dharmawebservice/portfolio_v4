import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const PROJECTS = [
  {
    id:1, num:'01',
    name:'CraveCart',
    type:'Full-Stack Platform',
    year:'2024',
    desc:'Production-ready food ordering platform with restaurant browsing, Razorpay checkout, coupon logic, live order tracking with courier integration, and Brevo transactional email.',
    stack:['Django','PostgreSQL','Razorpay','Python'],
    cat:'fullstack', featured:true,
    live:'#', github:'#',
    color:'#FF6B00',
  },
  {
    id:2, num:'02',
    name:'Object Detection System',
    type:'AI/ML + IoT',
    year:'2024',
    desc:'YOLOv3 real-time object detection on Raspberry Pi with voice feedback, ultrasonic obstacle avoidance sensors, and a Blynk IoT remote monitoring dashboard.',
    stack:['Python','YOLOv3','Raspberry Pi','OpenCV'],
    cat:'ai', featured:true,
    live:null, github:'#',
    color:'#22c55e',
  },
  {
    id:3, num:'03',
    name:'AI Recipe Generator',
    type:'Generative AI',
    year:'2024',
    desc:'Personalized recipe recommendations from user inputs via OpenAI API. Interactive Streamlit UI with real-time dynamic generation and dietary filter support.',
    stack:['OpenAI API','Streamlit','Python'],
    cat:'ai', featured:false,
    live:null, github:'#',
    color:'#3b82f6',
  },
  {
    id:4, num:'04',
    name:'SSD Nursery',
    type:'E-Commerce · Django',
    year:'2025',
    desc:'Client plant nursery e-commerce — product variants with pill UI, multi-image galleries, Razorpay payments, Delhivery/Blue Dart courier tracking, custom admin panel.',
    stack:['Django','PostgreSQL','Razorpay','Brevo'],
    cat:'fullstack', featured:false,
    live:null, github:'#',
    color:'#FF6B00',
  },
  {
    id:5, num:'05',
    name:'NGO Web Portal',
    type:'Web Development',
    year:'2023',
    desc:'Dynamic portal for Gramseva India Foundation. PHP + MySQL backend, responsive HTML/CSS/JS frontend enabling content management for rural outreach programs.',
    stack:['PHP','MySQL','HTML/CSS','JavaScript'],
    cat:'fullstack', featured:false,
    live:null, github:'#',
    color:'#a78bfa',
  },
  {
    id:6, num:'06',
    name:'Student Management System',
    type:'Desktop App',
    year:'2023',
    desc:'Python Tkinter desktop app for managing student records. Full CRUD, search functionality, report generation, and MySQL database integration.',
    stack:['Python','Tkinter','MySQL','Pandas'],
    cat:'desktop', featured:false,
    live:null, github:'#',
    color:'#f59e0b',
  },
];

const CATS = ['All','Full-Stack','AI/ML','Desktop'];

const fadeUp = (d=0) => ({
  hidden:  { y:50, opacity:0 },
  visible: { y:0, opacity:1, transition:{ duration:0.85, ease:[0.16,1,0.3,1], delay:d } }
});

function Card({ p, inView, i }) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity:0, y:50 }}
      animate={{ opacity:1, y:0 }}
      exit={{ opacity:0, y:20, scale:0.96 }}
      transition={{ duration:0.55, ease:[0.16,1,0.3,1], delay:i*0.07 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderTop:`1px solid ${hov ? p.color : 'var(--gray-3)'}`,
        padding:'36px 0',
        display:'grid', gridTemplateColumns:'1fr auto',
        gap:32, alignItems:'start',
        cursor:'default',
        transition:'border-color 0.3s',
      }}>

      <div>
        {/* Top meta */}
        <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:14 }}>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.65rem', color:'var(--gray-4)', letterSpacing:'0.1em' }}>{p.num}</span>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.65rem', color: hov ? p.color : 'var(--gray-5)', letterSpacing:'0.08em', transition:'color 0.3s' }}>{p.type}</span>
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.65rem', color:'var(--gray-4)', letterSpacing:'0.08em', marginLeft:'auto' }}>{p.year}</span>
        </div>

        {/* Name */}
        <h3 style={{ fontFamily:'var(--fd)', fontSize:'clamp(1.3rem,2.5vw,1.8rem)', fontWeight:700, color: hov ? 'var(--white)' : 'var(--gray-6)', letterSpacing:'-0.025em', marginBottom:12, transition:'color 0.3s' }}>
          {p.name}
        </h3>

        {/* Desc */}
        <p style={{ fontFamily:'var(--fb)', fontSize:'0.9rem', color:'var(--gray-5)', lineHeight:1.7, maxWidth:600, marginBottom:20 }}>
          {p.desc}
        </p>

        {/* Stack */}
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {p.stack.map(s => (
            <span key={s} style={{ fontFamily:'var(--fm)', fontSize:'0.65rem', color: hov ? p.color : 'var(--gray-5)', border:`1px solid ${hov ? p.color+'44' : 'var(--gray-3)'}`, padding:'4px 12px', letterSpacing:'0.06em', transition:'all 0.3s' }}>
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div style={{ display:'flex', flexDirection:'column', gap:10, alignItems:'flex-end', paddingTop:40 }}>
        {p.live && (
          <a href={p.live} style={{ fontFamily:'var(--fm)', fontSize:'0.68rem', color: hov ? p.color : 'var(--gray-5)', letterSpacing:'0.1em', textTransform:'uppercase', transition:'color 0.3s', display:'flex', alignItems:'center', gap:6 }}>
            Live ↗
          </a>
        )}
        <a href={p.github} style={{ fontFamily:'var(--fm)', fontSize:'0.68rem', color: hov ? 'var(--white)' : 'var(--gray-5)', letterSpacing:'0.1em', textTransform:'uppercase', transition:'color 0.3s', display:'flex', alignItems:'center', gap:6 }}>
          Code ↗
        </a>
        {p.featured && (
          <span style={{ fontFamily:'var(--fm)', fontSize:'0.6rem', color:'var(--amber)', border:'1px solid rgba(255,107,0,0.3)', padding:'3px 8px', letterSpacing:'0.12em', marginTop:4 }}>
            FEATURED
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-60px' });
  const [active, setActive] = useState('All');

  const filtered = PROJECTS.filter(p =>
    active === 'All' ||
    (active === 'AI/ML'      && p.cat === 'ai') ||
    (active === 'Full-Stack' && p.cat === 'fullstack') ||
    (active === 'Desktop'    && p.cat === 'desktop')
  );

  return (
    <section id="projects" className="section" ref={ref}
      style={{ background:'var(--gray-1)', borderTop:'1px solid var(--gray-3)', borderBottom:'1px solid var(--gray-3)' }}>
      <div className="wrap">

        {/* Header row */}
        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:80, marginBottom:80, alignItems:'end' }} className="proj-head-grid">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={inView?'visible':'hidden'}>
            <span className="label">Projects</span>
          </motion.div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:20 }}>
            <motion.h2 variants={fadeUp(0.1)} initial="hidden" animate={inView?'visible':'hidden'}
              style={{ fontFamily:'var(--fd)', fontSize:'clamp(2rem,4.5vw,3.8rem)', fontWeight:700, color:'var(--white)', lineHeight:1.0, letterSpacing:'-0.03em' }}>
              {filtered.length} projects.<br />
              <span style={{ color:'var(--amber)' }}>Real problems</span> solved.
            </motion.h2>

            {/* Filter */}
            <motion.div variants={fadeUp(0.2)} initial="hidden" animate={inView?'visible':'hidden'}
              style={{ display:'flex', gap:0, border:'1px solid var(--gray-3)' }}>
              {CATS.map((c,i) => (
                <button key={c} onClick={() => setActive(c)}
                  style={{
                    fontFamily:'var(--fm)', fontSize:'0.68rem', letterSpacing:'0.1em', textTransform:'uppercase',
                    padding:'10px 18px', color: active===c ? 'var(--black)' : 'var(--gray-5)',
                    background: active===c ? 'var(--amber)' : 'transparent',
                    borderRight: i < CATS.length-1 ? '1px solid var(--gray-3)' : 'none',
                    transition:'all 0.2s',
                  }}>
                  {c}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Project list */}
        <motion.div layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <Card key={p.id} p={p} inView={inView} i={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @media(max-width:1024px){.proj-head-grid{grid-template-columns:1fr!important;gap:24px!important}}
        @media(max-width:640px){.proj-card-inner{grid-template-columns:1fr!important}}
      `}</style>
    </section>
  );
}
