import { useEffect, useRef } from 'react';
export default function ScrollProgress() {
  const bar = useRef(null);
  useEffect(() => {
    const fn = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = scrollTop / (scrollHeight - clientHeight) * 100;
      if (bar.current) bar.current.style.width = pct + '%';
    };
    window.addEventListener('scroll', fn, { passive:true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  return (
    <div style={{ position:'fixed', top:'var(--nav-h)', left:0, right:0, height:2, zIndex:999, background:'var(--gray-3)' }}>
      <div ref={bar} style={{ height:'100%', width:'0%', background:'var(--amber)', boxShadow:'0 0 8px var(--amber)', transition:'width 0.1s linear' }} />
    </div>
  );
}
