import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import Cursor       from './components/Cursor';
import Loader       from './components/Loader';
import Nav          from './components/Nav';
import ScrollProgress from './components/ScrollProgress';
import Hero         from './components/Hero';
import About        from './components/About';
import Skills       from './components/Skills';
import Experience   from './components/Experience';
import Projects     from './components/Projects';
import Certifications from './components/Certifications';
import Contact      from './components/Contact';
import Footer       from './components/Footer';

export default function App() {
  const [ready, setReady] = useState(false);

  return (
    <>
      <Cursor />
      <AnimatePresence>
        {!ready && <Loader onDone={() => setReady(true)} />}
      </AnimatePresence>

      {ready && (
        <>
          <Nav />
          <ScrollProgress />
          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
