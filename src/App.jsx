import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import CareerGuide from './pages/CareerGuide';
import CoverLetter from './pages/CoverLetter';
import CVWritingGuide from './pages/CVWritingGuide';
import Landing from './pages/Landing';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeTips from './pages/ResumeTips';
export default function App() {
  const location = useLocation();
  const isBuilder = location.pathname === '/builder' || location.pathname === '/cover-letter';
  return <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/builder" element={<ResumeBuilder />} />
          <Route path="/cover-letter" element={<CoverLetter />} />
          <Route path="/resume-tips" element={<ResumeTips />} />
          <Route path="/cv-writing-guide" element={<CVWritingGuide />} />
          <Route path="/career-guide" element={<CareerGuide />} />
        </Routes>
      </AnimatePresence>
      {!isBuilder && <Footer />}
    </>;
}
