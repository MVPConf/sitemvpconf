import Header from './components/Header';
import About from './components/About';
import Carousel from './components/Carousel';
import BoardOfDirectors from './components/BoardOfDirectors';
import Hero from './components/Hero';
import Speakers from './components/Speakers';
// import Schedule from './components/Schedule';
import Sponsors from './components/Sponsors';
import Location from './components/Location';
import Tickets from './components/Tickets';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import CodeOfConduct from './components/CodeOfConduct';
import { useEffect, useState } from 'react';

function App() {
  const [path, setPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  if (path === '/privacy') {
    return <PrivacyPolicy onBack={() => (window.location.href = '/')} />;
  }
  if (path === '/terms') {
    return <TermsOfUse onBack={() => (window.location.href = '/')} />;
  }
  if (path === '/code-of-conduct') {
    return <CodeOfConduct onBack={() => (window.location.href = '/')} />;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Carousel />
      <Speakers />
      {/* <Schedule /> */}
      <Sponsors />
      <Location />
      <Tickets />
      <BoardOfDirectors />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;