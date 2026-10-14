import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import AboutTemple from './sections/AboutTemple';
import Darshan from './sections/Darshan';
import Festivals from './sections/Festivals';
import Gallery from './sections/Gallery';
import InstagramFeed from './sections/InstagramFeed';
import HowToReach from './sections/HowToReach';
import Contact from './sections/Contact';
import './styles/app.css';

function App() {
  return (
    <LanguageProvider>
      <Header />
      <main>
        <Hero />
        <AboutTemple />
        <Darshan />
        <Festivals />
        <Gallery />
        <InstagramFeed />
        <HowToReach />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
