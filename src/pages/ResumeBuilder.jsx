import { motion } from 'framer-motion';
import EditorPanel from '../components/resume/EditorPanel';
import PreviewPanel from '../components/resume/PreviewPanel';
import './ResumeBuilder.css';
export default function ResumeBuilder() {
  return <motion.div className="page-wrapper builder-page" initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} exit={{
    opacity: 0
  }} transition={{
    duration: 0.3
  }}>
      <div className="builder-layout">
        <EditorPanel />
        <PreviewPanel />
      </div>
    </motion.div>;
}