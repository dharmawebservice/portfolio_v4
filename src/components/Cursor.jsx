import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot   = useRef(null);
  const ring  = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const pos   = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', move);

    let raf;
    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.13;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.13;
      if (dot.current)  { dot.current.style.transform  = `translate(${mouse.current.x}px,${mouse.current.y}px) translate(-50%,-50%)`; }
      if (ring.current) { ring.current.style.transform = `translate(${pos.current.x}px,${pos.current.y}px) translate(-50%,-50%)`; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const over = () => ring.current?.classList.add('big');
    const out  = () => ring.current?.classList.remove('big');
    document.querySelectorAll('a,button,[data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', over);
      el.addEventListener('mouseleave', out);
    });

    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position:'fixed',top:0,left:0,width:6,height:6,background:'var(--amber)',borderRadius:'50%',pointerEvents:'none',zIndex:99999,willChange:'transform' }} />
      <div ref={ring} style={{ position:'fixed',top:0,left:0,width:36,height:36,border:'1px solid rgba(255,107,0,0.5)',borderRadius:'50%',pointerEvents:'none',zIndex:99998,willChange:'transform',transition:'width 0.25s,height 0.25s,border-color 0.25s' }}
        className="cursor-ring" />
      <style>{`.cursor-ring.big{width:56px!important;height:56px!important;border-color:var(--amber)!important}`}</style>
    </>
  );
}
