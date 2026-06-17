import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EXP = [
  {
    role: 'Systems Engineer',
    co: 'Tata Consultancy Services',
    short: 'TCS',
    period: 'Apr 2026 – Present',
    loc: 'Hyderabad',
    current: true,
    points: [
      'Enterprise training in Python, Cloud technologies, and Full-Stack development frameworks.',
      'Active in Agile delivery — sprint planning, stand-ups, and retrospectives.',
      'Leveraging prior AI/ML + full-stack experience in production engineering context.',
    ],
    tags: ['Python','Cloud','Agile','Enterprise'],
  },
  {
    role: 'Full Stack Developer Intern',
    co: 'Kodnest Technologies',
    short: 'KODNEST',
    period: 'Jun 2025 – Mar 2026',
    loc: 'Bengaluru',
    current: false,
    points: [
      'Built full-stack web apps: Java backend, MySQL, HTML/CSS/JS frontend.',
      'Coordinated a 30-student internship batch — scheduling and progress tracking.',
      'Delivered CRUD modules with REST API integrations in Agile sprints.',
    ],
    tags: ['Java','MySQL','JavaScript','REST'],
  },
  {
    role: 'AI ML Engineer Intern',
    co: 'Rooman Technologies Pvt Ltd',
    short: 'ROOMAN',
    period: 'Sep 2024 – Feb 2025',
    loc: 'Bengaluru',
    current: false,
    points: [
      'Built ML models in Python with TensorFlow, NumPy, and Pandas.',
      'Deployed AI Recipe Generator using OpenAI API and Streamlit.',
      'Organised workshops training 50+ students in web development.',
    ],
    tags: ['Python','TensorFlow','OpenAI','Streamlit'],
  },
  {
    role: 'Web Developer Intern',
    co: 'Gramseva India Foundation',
    short: 'GRAMSEVA',
    period: 'Nov 2023 – Jan 2024',
    loc: 'Remote',
    current: false,
    points: [
      'Built NGO web pages with HTML, CSS, JavaScript, and PHP.',
      'MySQL database connections for dynamic content management.',
      'Responsive UI improving accessibility for rural outreach programs.',
    ],
    tags: ['PHP','MySQL','HTML/CSS','JS'],
  },
];

const fadeUp = (delay=0) => ({
  hidden:  { y:40, opacity:0 },
  visible: { y:0, opacity:1, transition:{ duration:0.8, ease:[0.16,1,0.3,1], delay } }
});

export default function Experience() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });

  return (
    <section id="experience" className="section" ref={ref}>
      <div className="wrap">

        {/* Header */}
        <div style={{ display:'grid', gridTemplateColumns:'200px 1fr', gap:80, marginBottom:100, alignItems:'start' }} className="exp-head-grid">
          <motion.div variants={fadeUp(0)} initial="hidden" animate={inView?'visible':'hidden'}>
            <span className="label">Experience</span>
          </motion.div>
          <motion.h2 variants={fadeUp(0.1)} initial="hidden" animate={inView?'visible':'hidden'}
            style={{ fontFamily:'var(--fd)', fontSize:'clamp(2rem,4.5vw,3.8rem)', fontWeight:700, color:'var(--white)', lineHeight:1.0, letterSpacing:'-0.03em' }}>
            Built across <span style={{ color:'var(--amber)' }}>three companies</span><br />
            before TCS.
          </motion.h2>
        </div>

        {/* Experience list */}
        <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
          {EXP.map((e, i) => (
            <motion.div key={e.co}
              variants={fadeUp(0.1 + i*0.1)} initial="hidden" animate={inView?'visible':'hidden'}
              style={{
                display:'grid', gridTemplateColumns:'200px 1fr',
                gap:80, borderTop:'1px solid var(--gray-3)',
                paddingTop:48, paddingBottom:48,
                transition:'background 0.25s',
              }}
              className="exp-row"
              onMouseEnter={ev=>ev.currentTarget.style.background='var(--gray-1)'}
              onMouseLeave={ev=>ev.currentTarget.style.background='transparent'}>

              {/* Left: number + short name */}
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                <span style={{ fontFamily:'var(--fm)', fontSize:'0.68rem', color:'var(--gray-4)', letterSpacing:'0.1em' }}>0{i+1}</span>
                <span className="label" style={{ color: e.current ? 'var(--amber)' : 'var(--gray-5)' }}>{e.short}</span>
                <span style={{ fontFamily:'var(--fm)', fontSize:'0.68rem', color:'var(--gray-5)', marginTop:4 }}>{e.loc}</span>
                {e.current && (
                  <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:8 }}>
                    <span style={{ width:6, height:6, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 6px #22c55e', animation:'pulse 2s infinite', flexShrink:0 }} />
                    <span style={{ fontFamily:'var(--fm)', fontSize:'0.62rem', color:'#22c55e', letterSpacing:'0.08em' }}>NOW</span>
                  </div>
                )}
              </div>

              {/* Right: full details */}
              <div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16, flexWrap:'wrap', gap:8 }}>
                  <div>
                    <h3 style={{ fontFamily:'var(--fd)', fontSize:'1.3rem', fontWeight:700, color:'var(--white)', letterSpacing:'-0.02em', marginBottom:4 }}>{e.role}</h3>
                    <div style={{ fontFamily:'var(--fb)', fontSize:'0.9rem', color:'var(--amber)' }}>{e.co}</div>
                  </div>
                  <span style={{ fontFamily:'var(--fm)', fontSize:'0.7rem', color:'var(--gray-5)', letterSpacing:'0.05em', whiteSpace:'nowrap' }}>{e.period}</span>
                </div>

                <ul style={{ display:'flex', flexDirection:'column', gap:10, marginBottom:24 }}>
                  {e.points.map(p => (
                    <li key={p} style={{ display:'flex', gap:14, fontFamily:'var(--fb)', fontSize:'0.9rem', color:'var(--gray-5)', lineHeight:1.65 }}>
                      <span style={{ color:'var(--amber)', flexShrink:0, marginTop:2 }}>→</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {e.tags.map(t => (
                    <span key={t} style={{ fontFamily:'var(--fm)', fontSize:'0.66rem', color:'var(--gray-5)', border:'1px solid var(--gray-3)', padding:'4px 12px', letterSpacing:'0.06em' }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Bottom border */}
          <div style={{ borderTop:'1px solid var(--gray-3)' }} />
        </div>
      </div>

      <style>{`
        @media(max-width:1024px){.exp-head-grid,.exp-row{grid-template-columns:1fr!important;gap:24px!important}}
        @keyframes pulse{0%,100%{box-shadow:0 0 6px #22c55e}50%{box-shadow:0 0 14px #22c55e}}
      `}</style>
    </section>
  );
}
