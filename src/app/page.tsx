import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SelectedWorks from '../components/SelectedWorks';
import About from '../components/About';
import Capabilities from '../components/Capabilities';
import GalleryStrip from '../components/GalleryStrip';
import Process from '../components/Process';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-bgPrimary text-accentSoft">
      <Navbar />
      <main id="main-content">
        <Hero />
        <SelectedWorks />
        <About />
        <Capabilities />
        <GalleryStrip />
        <Process />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
