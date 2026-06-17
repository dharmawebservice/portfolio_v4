import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const ROLES = ['Systems Engineer', 'Full-Stack Developer', 'AI/ML Engineer', 'Django Expert'];

function useTypewriter(words) {
  const [idx, setIdx]       = useState(0);
  const [text, setText]     = useState('');
  const [del, setDel]       = useState(false);
  const [wait, setWait]     = useState(false);

  useEffect(() => {
    if (wait) return;
    const word = words[idx];
    let timer;
    if (!del) {
      if (text.length < word.length) {
        timer = setTimeout(() => setText(word.slice(0, text.length + 1)), 70);
      } else {
        timer = setTimeout(() => setDel(true), 2000);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(word.slice(0, text.length - 1)), 38);
      } else {
        setDel(false);
        setIdx(i => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(timer);
  }, [text, del, idx, wait, words]);

  return text;
}

export default function Hero() {
  const role    = useTypewriter(ROLES);
  const canvasRef = useRef(null);

  /* Noise grain canvas */
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let raf;
    const draw = () => {
      c.width = window.innerWidth; c.height = window.innerHeight;
      const img = ctx.createImageData(c.width, c.height);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 18 | 0;
        img.data[i] = img.data[i+1] = img.data[i+2] = v;
        img.data[i+3] = 255;
      }
      ctx.putImageData(img, 0, 0);
      raf = setTimeout(draw, 80);
    };
    draw();
    return () => clearTimeout(raf);
  }, []);

  const titleVar = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } }
  };
  const wordVar = {
    hidden:  { y: '105%', opacity: 0 },
    visible: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };
  const fadeUp = { hidden:{ y:30,opacity:0 }, visible:{ y:0, opacity:1, transition:{ duration:0.8, ease:[0.16,1,0.3,1] } } };

  const titleWords = ['Dharmendra', 'Reddy', 'M S'];

  return (
    <section id="home" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden', paddingTop:'var(--nav-h)' }}>

      {/* Grain overlay */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.025, pointerEvents:'none', zIndex:0 }} />

      {/* Amber horizontal rule accent */}
      <div style={{ position:'absolute', top:0, left:0, right:0, height:2, background:'var(--amber)', zIndex:1, transformOrigin:'left' }}>
        <motion.div style={{ height:'100%', background:'var(--amber)' }} initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ duration:1.2, ease:[0.16,1,0.3,1], delay:0.3 }} />
      </div>

      <div className="wrap" style={{ position:'relative', zIndex:2, paddingTop:80, paddingBottom:80 }}>

        {/* Status line */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay:0.4 }}
          style={{ display:'flex', alignItems:'center', gap:10, marginBottom:40 }}>
          <span style={{ width:7,height:7,borderRadius:'50%',background:'#22c55e',boxShadow:'0 0 8px #22c55e',flexShrink:0, animation:'pulse 2s infinite' }} />
          <span className="label" style={{ color:'var(--gray-5)' }}>Available · Systems Engineer @ TCS, Hyderabad</span>
        </motion.div>

        {/* Big title */}
        <div style={{ overflow:'hidden', marginBottom:8 }}>
          <motion.h1 variants={titleVar} initial="hidden" animate="visible" transition={{ delayChildren:0.5 }}
            style={{ fontFamily:'var(--fd)', fontSize:'clamp(3.2rem,9vw,8rem)', fontWeight:700, lineHeight:0.92, letterSpacing:'-0.04em', color:'var(--white)', display:'flex', flexWrap:'wrap', gap:'0 0.2em' }}>
            {titleWords.map(w => (
              <span key={w} style={{ overflow:'hidden', display:'inline-block' }}>
                <motion.span variants={wordVar} style={{ display:'inline-block' }}>{w}</motion.span>
              </span>
            ))}
          </motion.h1>
        </div>

        {/* Role typewriter */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay:1 }}
          style={{ fontFamily:'var(--fm)', fontSize:'clamp(0.85rem,2vw,1.1rem)', color:'var(--amber)', marginBottom:36, minHeight:'1.6em' }}>
          {role}<span style={{ animation:'blink 0.8s step-end infinite', marginLeft:2 }}>_</span>
        </motion.div>

        {/* Desc + photo layout */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:80, alignItems:'end' }} className="hero-grid">
          <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay:1.1 }}>
            <p style={{ fontFamily:'var(--fb)', fontSize:'clamp(1rem,1.6vw,1.2rem)', color:'var(--gray-5)', lineHeight:1.75, maxWidth:520, marginBottom:48 }}>
              CS &amp; AI graduate crafting scalable systems, intelligent products, and
              clean code. I build things end-to-end — from database schemas to pixel-level UI.
            </p>
            <div style={{ display:'flex', gap:16, flexWrap:'wrap' }}>
              <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' })}
                style={{ fontFamily:'var(--fd)', fontWeight:600, fontSize:'0.875rem',
                  color:'var(--black)', background:'var(--amber)', padding:'14px 36px', borderRadius:2,
                  transition:'all 0.2s', letterSpacing:'-0.01em' }}
                onMouseEnter={e=>e.currentTarget.style.transform='translateY(-3px)'}
                onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
                View Work
              </button>
              <a href="mailto:dharmu17reddy@gmail.com"
                style={{ fontFamily:'var(--fd)', fontWeight:500, fontSize:'0.875rem',
                  color:'var(--white)', border:'1px solid var(--gray-3)', padding:'14px 36px', borderRadius:2,
                  display:'inline-flex', alignItems:'center', transition:'all 0.2s' }}
                onMouseEnter={e=>{ e.currentTarget.style.borderColor='var(--amber)'; e.currentTarget.style.color='var(--amber)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.borderColor='var(--gray-3)'; e.currentTarget.style.color='var(--white)'; }}>
                dharmu17reddy@gmail.com
              </a>
            </div>
          </motion.div>

          {/* Photo */}
          <motion.div initial={{ opacity:0, scale:0.92, rotate:-2 }} animate={{ opacity:1, scale:1, rotate:0 }} transition={{ duration:1.1, ease:[0.16,1,0.3,1], delay:0.8 }}
            style={{ width:260, flexShrink:0 }} className="hero-photo-wrap">
            <div style={{ position:'relative' }}>
              <img src="/photo.jpg" alt="Dharmendra Reddy" style={{ width:'100%', aspectRatio:'3/4', objectFit:'cover', filter:'grayscale(20%) contrast(1.05)', display:'block' }} />
              {/* Amber corner accent */}
              <div style={{ position:'absolute', bottom:0, left:0, right:0, height:3, background:'var(--amber)' }} />
              <div style={{ position:'absolute', top:0, left:0, width:3, height:'100%', background:'var(--amber)' }} />
              {/* Badge */}
              <div style={{ position:'absolute', top:12, right:12, background:'rgba(0,0,0,0.9)', border:'1px solid var(--gray-3)', padding:'8px 12px', fontFamily:'var(--fm)', fontSize:'0.62rem', color:'var(--amber)', letterSpacing:'0.1em', backdropFilter:'blur(8px)' }}>
                TCS · ENG
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay:1.3 }}
          style={{ display:'flex', gap:0, marginTop:80, borderTop:'1px solid var(--gray-3)', paddingTop:48 }}>
          {[['5+','Projects'],['3','Internships'],['50+','Trained'],['7+','Languages']].map(([n,l],i,arr) => (
            <div key={l} style={{ flex:1, paddingLeft: i===0?0:40, borderLeft: i===0?'none':'1px solid var(--gray-3)' }}>
              <div style={{ fontFamily:'var(--fd)', fontSize:'clamp(2rem,4vw,3.2rem)', fontWeight:700, color:'var(--white)', letterSpacing:'-0.04em', lineHeight:1 }}>{n}</div>
              <div className="label" style={{ marginTop:6, color:'var(--gray-5)' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes pulse{0%,100%{box-shadow:0 0 8px #22c55e}50%{box-shadow:0 0 16px #22c55e}}
        @media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}.hero-photo-wrap{display:none}}
        @media(max-width:640px){.hero-stats{flex-direction:column!important}}
      `}</style>
    </section>
  );
}
