import Header from './components/Header';
import About from './components/About';
import Hero from './components/Hero';
import Speakers from './components/Speakers';
import Schedule from './components/Schedule';
import Sponsors from './components/Sponsors';
import Location from './components/Location';
import Tickets from './components/Tickets';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Speakers />
      <Schedule />
      <Sponsors />
      <Location />
      <Tickets />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;