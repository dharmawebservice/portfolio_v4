import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const pos  = useRef({ x:-200, y:-200 });
  const lag  = useRef({ x:-200, y:-200 });

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px';
        dot.current.style.top  = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', onMove);

    let raf;
    const animate = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.12;
      lag.current.y += (pos.current.y - lag.current.y) * 0.12;
      if (ring.current) {
        ring.current.style.left = lag.current.x + 'px';
        ring.current.style.top  = lag.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const grow   = () => ring.current?.classList.add('cursor-big');
    const shrink = () => ring.current?.classList.remove('cursor-big');
    const addListeners = () => {
      document.querySelectorAll('a, button, [data-hover]').forEach(el => {
        el.addEventListener('mouseenter', grow);
        el.addEventListener('mouseleave', shrink);
      });
    };
    addListeners();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{
        position:'fixed', zIndex:99999, pointerEvents:'none',
        width:6, height:6,
        background:'var(--amber)', borderRadius:'50%',
        transform:'translate(-50%,-50%)',
        top:0, left:0,
      }} />
      <div ref={ring} style={{
        position:'fixed', zIndex:99998, pointerEvents:'none',
        width:38, height:38,
        border:'1px solid rgba(255,107,0,0.55)', borderRadius:'50%',
        transform:'translate(-50%,-50%)',
        top:0, left:0,
        transition:'width 0.2s, height 0.2s, border-color 0.2s, background 0.2s',
      }} className="cursor-ring" />
      <style>{`.cursor-ring.cursor-big{width:58px!important;height:58px!important;border-color:var(--amber)!important;background:rgba(255,107,0,0.05)!important}`}</style>
    </>
  );
}
