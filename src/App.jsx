import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import CareerGuide from './pages/CareerGuide';
import ColdEmailGenerator from './pages/toolkit/ColdEmailGenerator';
import CoverLetter from './pages/CoverLetter';
import CVChecker from './pages/toolkit/CVChecker';
import CVWritingGuide from './pages/CVWritingGuide';
import ExperienceFormatter from './pages/toolkit/ExperienceFormatter';
import Landing from './pages/Landing';
import ReadmeGenerator from './pages/toolkit/ReadmeGenerator';
import ResumeBuilder from './pages/ResumeBuilder';
import ResumeTips from './pages/ResumeTips';
import Toolkit from './pages/Toolkit';
export default function App() {
  const location = useLocation();
  const isBuilder = location.pathname === '/builder' || location.pathname === '/cover-letter' || location.pathname.startsWith('/toolkit/');
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
          <Route path="/toolkit" element={<Toolkit />} />
          <Route path="/toolkit/cv-checker" element={<CVChecker />} />
          <Route path="/toolkit/experience-formatter" element={<ExperienceFormatter />} />
          <Route path="/toolkit/readme-generator" element={<ReadmeGenerator />} />
          <Route path="/toolkit/cold-email" element={<ColdEmailGenerator />} />
        </Routes>
      </AnimatePresence>
      {!isBuilder && <Footer />}
    </>;
}
