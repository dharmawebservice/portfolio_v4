import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const pct = (scrollTop / (scrollHeight - clientHeight)) * 100;
      if (barRef.current) barRef.current.style.width = pct + '%';
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  return (
    <div style={{ position:'fixed', top:'var(--nav-h)', left:0, right:0, height:2, zIndex:999, background:'var(--gray-3)' }}>
      <div ref={barRef} style={{ height:'100%', background:'var(--amber)', width:'0%', transition:'width 0.1s linear', boxShadow:'0 0 8px var(--amber)' }} />
    </div>
  );
}
