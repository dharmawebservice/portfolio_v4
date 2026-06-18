import { useState, useEffect } from 'react';

export function useTypewriter(words, typingSpeed = 70, deletingSpeed = 38, pauseMs = 2000) {
  const [idx,  setIdx]  = useState(0);
  const [text, setText] = useState('');
  const [del,  setDel]  = useState(false);

  useEffect(() => {
    const word = words[idx];
    let timer;
    if (!del) {
      if (text.length < word.length) {
        timer = setTimeout(() => setText(word.slice(0, text.length + 1)), typingSpeed);
      } else {
        timer = setTimeout(() => setDel(true), pauseMs);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(word.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setDel(false);
        setIdx(i => (i + 1) % words.length);
      }
    }
    return () => clearTimeout(timer);
  }, [text, del, idx, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}
