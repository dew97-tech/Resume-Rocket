import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import { FiDownload, FiEye, FiInfo, FiMinus, FiPlus, FiPrinter, FiRefreshCw, FiUpload, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useResume } from '../../contexts/ResumeContext';
import { useToast } from '../../contexts/ToastContext';
import { exportToPdf } from '../../utils/pdfExport';
import { sampleResume } from '../../utils/sampleResume';
import ClassicTemplate from './templates/ClassicTemplate';
import CleanTemplate from './templates/CleanTemplate';
import CorporateTemplate from './templates/CorporateTemplate';
import CreativeTemplate from './templates/CreativeTemplate';
import ElegantTemplate from './templates/ElegantTemplate';
import ExecutiveTemplate from './templates/ExecutiveTemplate';
import MinimalTemplate from './templates/MinimalTemplate';
import ModernTemplate from './templates/ModernTemplate';
import PortfolioTemplate from './templates/PortfolioTemplate';
import SidebarTemplate from './templates/SidebarTemplate';

const templates = {
  classic: { label: 'Classic', component: ClassicTemplate },
  modern: { label: 'Modern', component: ModernTemplate },
  minimal: { label: 'Minimal', component: MinimalTemplate },
  creative: { label: 'Creative', component: CreativeTemplate },
  executive: { label: 'Executive', component: ExecutiveTemplate },
  sidebar: { label: 'Sidebar', component: SidebarTemplate },
  portfolio: { label: 'Portfolio', component: PortfolioTemplate },
  corporate: { label: 'Corporate', component: CorporateTemplate },
  clean: { label: 'Clean', component: CleanTemplate },
  elegant: { label: 'Elegant', component: ElegantTemplate },
};

const fontCategories = [
  { label: 'Sans-Serif', fonts: ['Inter', 'Roboto', 'Poppins', 'Lato', 'Montserrat', 'Open Sans', 'Raleway', 'Nunito', 'Outfit', 'DM Sans', 'Plus Jakarta Sans', 'Space Grotesk', 'Sora', 'Source Sans 3'] },
  { label: 'Serif', fonts: ['Playfair Display', 'Merriweather', 'Georgia', 'Times New Roman', 'Crimson Text', 'Libre Baskerville'] },
  { label: 'Monospace', fonts: ['JetBrains Mono', 'Courier New'] },
];

const defaultSettings = {
  template: 'modern',
  primaryColor: '#7c5cfc',
  secondaryColor: '#c084fc',
  fontFamily: 'Inter',
  fontSize: 10,
  lineSpacing: 1.4,
  sectionSpacing: 16,
  marginSize: 32,
};

function InfoTooltip({ text }) {
  return (
    <span className="info-tooltip-wrap">
      <FiInfo size={13} className="info-icon" />
      <span className="info-tooltip">{text}</span>
    </span>
  );
}

export default function PreviewPanel() {
  const { resume, dispatch } = useResume();
  const toast = useToast();
  const [exporting, setExporting] = useState(false);
  const [zoom, setZoom] = useState(0.6);
  const fileInputRef = useRef(null);
  const { settings } = resume;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useLayoutEffect(() => {
    const wrapper = document.getElementById('resume-preview-wrapper');
    const content = document.getElementById('resume-preview');
    if (!wrapper || !content) return;

    // 1. Reset manually injected pagination margins to read natural layout
    const breakableElements = Array.from(content.querySelectorAll('.rt-section, .rt-entry'));
    breakableElements.forEach(el => {
      el.style.marginTop = '';
    });

    const pageHeight = wrapper.clientHeight; // Represents strict 297mm container px
    if (pageHeight <= 0) return;

    // 2. Iterate elements and push them down if they cross the strict page cutline
    breakableElements.forEach(el => {
      let top = 0;
      let curr = el;
      while (curr && curr !== content) {
        top += curr.offsetTop;
        curr = curr.offsetParent;
      }

      const bottom = top + el.offsetHeight;
      const pageOfTop = Math.floor(top / pageHeight);
      const pageOfBottom = Math.floor((bottom - 1) / pageHeight);

      // If text crosses the threshold, shift the whole block exactly to the top of the next page (+32px padding)
      if (pageOfBottom > pageOfTop && el.offsetHeight < pageHeight) {
        const targetTop = (pageOfBottom * pageHeight) + 32;
        const pushAmount = targetTop - top;
        // Use inline styling to inject padding gap pushing it beyond standard CSS margins
        const currentMargin = parseFloat(window.getComputedStyle(el).marginTop) || 0;
        el.style.marginTop = `${currentMargin + pushAmount}px`;
      }
    });

    // 3. Update pagination states
    const finalHeight = content.scrollHeight;
    const pages = Math.max(1, Math.ceil(finalHeight / pageHeight));
    setTotalPages(pages);
    if (currentPage > pages) setCurrentPage(Math.max(1, pages));

  }, [resume, settings, zoom]);

  const updateSetting = (key, value) => {
    dispatch({ type: 'SET_SETTINGS', payload: { [key]: value } });
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      await exportToPdf('resume-preview', `${resume.personalInfo.fullName || 'Resume'}.pdf`);
      toast.success('PDF exported successfully!');
    } catch (err) {
      toast.error('Failed to export PDF. Please try again.');
      console.error(err);
    } finally {
      setExporting(false);
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('resume-preview');
    if (!printContent) return;
    const w = window.open('', '_blank');
    w.document.write(`
      <html><head><title>Print Resume</title>
      <link href="https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(/ /g, '+')}&display=swap" rel="stylesheet">
      <style>
        body { margin: 0; font-family: '${settings.fontFamily}', sans-serif; font-size: ${settings.fontSize}pt; line-height: ${settings.lineSpacing}; }
        * { box-sizing: border-box; }
        @media print { @page { margin: 0; size: A4; } }
      </style></head><body>${printContent.innerHTML}</body></html>`);
    w.document.close();
    w.onload = () => { w.print(); w.close(); };
  };

  const handleExportJSON = () => {
    const data = JSON.stringify(resume, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resume.personalInfo.fullName || 'resume'}_data.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Resume data exported as JSON!');
  };

  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target.result);
        dispatch({ type: 'LOAD_RESUME', payload: data });
        toast.success('Resume data imported successfully!');
      } catch {
        toast.error('Invalid JSON file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleDownloadSample = () => {
    const data = JSON.stringify(sampleResume, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'John_Doe_sample_resume.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('Sample JSON downloaded!');
  };

  const handlePreviewSample = () => {
    dispatch({ type: 'LOAD_RESUME', payload: sampleResume });
    toast.success('Sample resume loaded — explore all fields!');
  };

  const handleResetDesign = () => {
    dispatch({ type: 'SET_SETTINGS', payload: { ...defaultSettings } });
    toast.success('Design settings reset to defaults.');
  };

  const TemplateComponent = templates[settings.template]?.component || ModernTemplate;

  return <div className="preview-panel">
      <div className="preview-toolbar">
        <div className="toolbar-group">
          <label>
            Template
            <InfoTooltip text="Select the base architectural layout structure for your resume" />
          </label>
          <select className="toolbar-select" value={settings.template} onChange={e => updateSetting('template', e.target.value)}>
            {Object.entries(templates).map(([key, t]) => <option key={key} value={key}>{t.label}</option>)}
          </select>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <label>
            Color
            <InfoTooltip text="Customize the primary theme tint to match your personal brand" />
          </label>
          <input type="color" className="toolbar-color" value={settings.primaryColor} onChange={e => updateSetting('primaryColor', e.target.value)} />
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <label>
            Font
            <InfoTooltip text="Choose a typography style for global application" />
          </label>
          <select className="toolbar-select" value={settings.fontFamily} onChange={e => updateSetting('fontFamily', e.target.value)}>
            {fontCategories.map(cat => <optgroup key={cat.label} label={cat.label}>
                {cat.fonts.map(f => <option key={f} value={f}>{f}</option>)}
              </optgroup>)}
          </select>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <label>
            Size
            <InfoTooltip text="Base font size for body text. Default: 10pt" />
          </label>
          <input type="range" className="toolbar-range" min={8} max={14} step={0.5} value={settings.fontSize} onChange={e => updateSetting('fontSize', parseFloat(e.target.value))} />
          <span className="metric-value">{settings.fontSize}pt</span>
        </div>

        <div className="toolbar-group">
          <label>
            Spacing
            <InfoTooltip text="Line height multiplier. Controls vertical space between lines. Default: 1.4×" />
          </label>
          <input type="range" className="toolbar-range" min={1} max={2} step={0.1} value={settings.lineSpacing} onChange={e => updateSetting('lineSpacing', parseFloat(e.target.value))} />
          <span className="metric-value">{settings.lineSpacing.toFixed(1)}×</span>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group zoom-group">
          <label>
            Zoom
            <InfoTooltip text="Scale the visual builder relative to your screen (Does not alter native PDF scale)" />
          </label>
          <button className="zoom-btn" onClick={() => setZoom(z => Math.max(0.3, z - 0.1))} title="Zoom out"><FiMinus size={14} /></button>
          <span className="zoom-value">{Math.round(zoom * 100)}%</span>
          <button className="zoom-btn" onClick={() => setZoom(z => Math.min(1.5, z + 0.1))} title="Zoom in"><FiPlus size={14} /></button>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} title="Navigate to previous page (Physical layout shifts upwards)">
            <FiChevronLeft size={16} /> Prev
          </button>
          <span className="metric-value" title="Active Page Viewer (Calculated automatically from template density boundaries)">Page {currentPage} of {totalPages}</span>
          <button className="btn btn-ghost btn-sm" style={{ padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} title="Navigate to next page of over-flowing context">
            Next <FiChevronRight size={16} />
          </button>
        </div>

        <div className="toolbar-divider" />

        <button className="btn btn-ghost btn-sm" onClick={handleResetDesign} title="Wipe out current style manipulations and return to global default settings">
          <FiRefreshCw size={14} /> Reset
        </button>
      </div>

      <div className="preview-toolbar preview-toolbar-secondary">
        <button className="btn btn-ghost btn-sm" onClick={handlePrint} title="Launch your system local Print dialog (Or save as standard text PDF)">
          <FiPrinter size={16} /> Print
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleExportJSON} title="Export your entire resume data strictly as a local JSON file (Recommended Backup mechanism)">
          <FiDownload size={16} /> Save JSON
        </button>
        <button className="btn btn-ghost btn-sm" onClick={() => fileInputRef.current?.click()} title="Import and instantly restore a .json resume backup file into the builder">
          <FiUpload size={16} /> Load JSON
        </button>
        <input ref={fileInputRef} type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />

        <div className="toolbar-divider" />

        <button className="btn btn-ghost btn-sm" onClick={handleDownloadSample} title="Download a pre-populated example layout file">
          <FiDownload size={16} /> Sample JSON
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handlePreviewSample} title="Inject a comprehensively dense dummy profile (2 Pages) to test template behavior seamlessly">
          <FiEye size={16} /> Preview Sample
        </button>

        <button className="btn btn-primary btn-sm export-btn" onClick={handleExport} disabled={exporting} title="Execute high-fidelity off-screen algorithm scaling out native PDF slice extraction completely free">
          <FiDownload size={16} />
          {exporting ? 'Exporting...' : 'Export PDF'}
        </button>
      </div>

      <div className="preview-container">
        <div id="resume-preview-wrapper" className="resume-preview-wrapper" style={{
          fontFamily: settings.fontFamily,
          fontSize: settings.fontSize + 'pt',
          lineHeight: settings.lineSpacing,
          zoom: zoom
        }}>
          <div id="resume-preview" style={{ 
            transform: `translateY(calc(-${(currentPage - 1) * 297}mm))`, 
            transition: 'transform 0.3s ease-in-out' 
          }}>
            <TemplateComponent resume={resume} settings={settings} />
          </div>
        </div>
      </div>
    </div>;
}
