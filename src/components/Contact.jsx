import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const fadeUp = (d=0) => ({
  hidden:  { y:40, opacity:0 },
  visible: { y:0, opacity:1, transition:{ duration:0.8, ease:[0.16,1,0.3,1], delay:d } }
});

const METHODS = [
  { label:'Email', val:'dharmu17reddy@gmail.com', href:'mailto:dharmu17reddy@gmail.com' },
  { label:'Phone', val:'+91 96112 41651', href:'tel:+919611241651' },
  { label:'LinkedIn', val:'linkedin.com/in/dharmendra', href:'https://linkedin.com' },
  { label:'Location', val:'Hyderabad, Telangana, India', href:null },
];

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:'-80px' });
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState('idle');

  const submit = (e) => {
    e.preventDefault();
    setStatus('loading');
    setTimeout(() => { setStatus('success'); setForm({ name:'', email:'', subject:'', message:'' }); }, 1400);
    setTimeout(() => setStatus('idle'), 5000);
  };

  const field = (key, type='text', placeholder='', rows=null) => ({
    value: form[key],
    onChange: e => setForm({ ...form, [key]: e.target.value }),
    placeholder,
    required: true,
    style: {
      width:'100%', background:'transparent', border:'none',
      borderBottom:'1px solid var(--gray-3)', padding:'14px 0',
      fontFamily:'var(--fb)', fontSize:'0.95rem', color:'var(--white)',
      outline:'none', transition:'border-color 0.2s',
      resize: rows ? 'vertical' : undefined,
      minHeight: rows ? rows*28+'px' : undefined,
    },
    onFocus:  e => e.target.style.borderColor='var(--amber)',
    onBlur:   e => e.target.style.borderColor='var(--gray-3)',
  });

  return (
    <section id="contact" className="section"
      style={{ background:'var(--gray-1)', borderTop:'1px solid var(--gray-3)' }}
      ref={ref}>
      <div className="wrap">

        {/* Big CTA heading */}
        <motion.div variants={fadeUp(0)} initial="hidden" animate={inView?'visible':'hidden'}
          style={{ textAlign:'center', marginBottom:100 }}>
          <span className="label" style={{ display:'block', marginBottom:24 }}>Contact</span>
          <h2 style={{ fontFamily:'var(--fd)', fontSize:'clamp(2.5rem,7vw,6rem)', fontWeight:700, color:'var(--white)', lineHeight:0.95, letterSpacing:'-0.04em', marginBottom:24 }}>
            Let's build<br />
            <span style={{ color:'var(--amber)' }}>something great.</span>
          </h2>
          <p style={{ fontFamily:'var(--fb)', fontSize:'1.05rem', color:'var(--gray-5)', maxWidth:480, margin:'0 auto' }}>
            Open to full-time roles, freelance projects, and interesting collaborations.
            I typically respond within 24 hours.
          </p>
        </motion.div>

        {/* Two column: info + form */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1.4fr', gap:80 }} className="contact-grid">

          {/* Info */}
          <motion.div variants={fadeUp(0.15)} initial="hidden" animate={inView?'visible':'hidden'}>
            {/* Available badge */}
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:48, padding:'16px 20px', border:'1px solid var(--gray-3)' }}>
              <span style={{ width:8, height:8, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 8px #22c55e', animation:'pulse 2s infinite', flexShrink:0 }} />
              <div>
                <div style={{ fontFamily:'var(--fd)', fontSize:'0.875rem', fontWeight:600, color:'var(--white)', marginBottom:2 }}>Available for Opportunities</div>
                <div className="label" style={{ color:'var(--gray-5)' }}>Full-time · Freelance · Collaborations</div>
              </div>
            </div>

            <div style={{ display:'flex', flexDirection:'column', gap:0 }}>
              {METHODS.map((m, i) => (
                <div key={m.label} style={{ borderTop:'1px solid var(--gray-3)', padding:'20px 0', display:'flex', flexDirection:'column', gap:4 }}>
                  <span className="label" style={{ color:'var(--gray-4)' }}>{m.label}</span>
                  {m.href
                    ? <a href={m.href} target={m.href.startsWith('http') ? '_blank' : undefined}
                        style={{ fontFamily:'var(--fd)', fontSize:'0.95rem', fontWeight:500, color:'var(--white)', transition:'color 0.2s' }}
                        onMouseEnter={e=>e.target.style.color='var(--amber)'}
                        onMouseLeave={e=>e.target.style.color='var(--white)'}>
                        {m.val}
                      </a>
                    : <span style={{ fontFamily:'var(--fb)', fontSize:'0.95rem', color:'var(--gray-6)' }}>{m.val}</span>
                  }
                </div>
              ))}
              <div style={{ borderTop:'1px solid var(--gray-3)' }} />
            </div>
          </motion.div>

          {/* Form */}
          <motion.div variants={fadeUp(0.2)} initial="hidden" animate={inView?'visible':'hidden'}>
            <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:32 }}>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:32 }} className="form-row">
                <div>
                  <label className="label" style={{ display:'block', marginBottom:8, color:'var(--gray-5)' }}>Name</label>
                  <input type="text" {...field('name','text','Your name')} />
                </div>
                <div>
                  <label className="label" style={{ display:'block', marginBottom:8, color:'var(--gray-5)' }}>Email</label>
                  <input type="email" {...field('email','email','you@email.com')} />
                </div>
              </div>
              <div>
                <label className="label" style={{ display:'block', marginBottom:8, color:'var(--gray-5)' }}>Subject</label>
                <input type="text" {...field('subject','text','Project / Job Opportunity')} />
              </div>
              <div>
                <label className="label" style={{ display:'block', marginBottom:8, color:'var(--gray-5)' }}>Message</label>
                <textarea {...field('message','text','Tell me about your project or opportunity...', 5)} />
              </div>

              <motion.button type="submit"
                disabled={status !== 'idle'}
                whileHover={status==='idle' ? { y:-3 } : {}}
                whileTap={status==='idle' ? { scale:0.98 } : {}}
                style={{
                  fontFamily:'var(--fd)', fontWeight:700, fontSize:'0.95rem', letterSpacing:'-0.01em',
                  color:'var(--black)',
                  background: status==='success' ? '#22c55e' : 'var(--amber)',
                  padding:'18px 40px', borderRadius:2, alignSelf:'flex-start',
                  transition:'background 0.3s, transform 0.2s',
                  opacity: status==='loading' ? 0.7 : 1,
                  display:'flex', alignItems:'center', gap:10,
                }}>
                {status==='idle'    && <><span>Send Message</span><span style={{ fontSize:'1rem' }}>→</span></>}
                {status==='loading' && <span>Sending…</span>}
                {status==='success' && <><span>Message Sent!</span><span>✓</span></>}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @keyframes pulse{0%,100%{box-shadow:0 0 8px #22c55e}50%{box-shadow:0 0 16px #22c55e}}
        @media(max-width:900px){.contact-grid{grid-template-columns:1fr!important}}
        @media(max-width:480px){.form-row{grid-template-columns:1fr!important}}
        input::placeholder,textarea::placeholder{color:var(--gray-4)}
      `}</style>
    </section>
  );
}
