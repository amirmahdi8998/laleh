import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import { RoomDetailPage, RoomsPage } from './pages/Rooms';
import BookingPage from './pages/Booking';
import DiningPage from './pages/Dining';
import EventsPage from './pages/Events';
import WellnessPage from './pages/Wellness';
import GalleryPage from './pages/Gallery';
import TehranGuidePage from './pages/TehranGuide';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import NotFound from './pages/NotFound';
import { UIProvider } from './context';
import BranchesPage, { BranchDetailPage } from './pages/Branches';
import BlogPage from './pages/Blog';
import BlogDetailPage from './pages/BlogDetail';
import AdminPage from './pages/Admin';
import DigitalMenu from './pages/DigitalMenu';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
}

function PageShell() {
  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.4 });
  const [toast, setToast] = useState('');

  useEffect(() => {
    const handler = (e) => {
      setToast(e.detail);
      setTimeout(() => setToast(''), 3800);
    };
    window.addEventListener('laleh-toast', handler);
    return () => window.removeEventListener('laleh-toast', handler);
  }, []);

  const isAdmin = location.pathname === '/dashboard';

  return (
    <>
      {!isAdmin && <motion.div className="scroll-progress" style={{ scaleX }} />}
      {!isAdmin && <Navbar />}
      <main className={isAdmin ? 'admin-main' : ''}>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.28 }}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/rooms" element={<RoomsPage />} />
              <Route path="/rooms/:id" element={<RoomDetailPage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/dining" element={<DiningPage />} />
              <Route path="/branches" element={<BranchesPage />} />
              <Route path="/branches/:id" element={<BranchDetailPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/wellness" element={<WellnessPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/tehran" element={<TehranGuidePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/menu/:id" element={<DigitalMenu />} />
              <Route path="/dashboard" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {!isAdmin && <Footer />}
      {toast && <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{toast}</motion.div>}
      <ScrollToTop />
      {!isAdmin && <WhatsAppButton />}
    </>
  );
}

export default function App() {
  return (
    <UIProvider>
      <HashRouter>
        <PageShell />
      </HashRouter>
    </UIProvider>
  );
}
