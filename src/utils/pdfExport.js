export async function exportToPdf(elementId = 'resume-preview', filename = 'resume.pdf') {
  // Grab the wrapper if it exists to get the font family styles and correct width!
  const wrapperId = elementId === 'resume-preview' ? 'resume-preview-wrapper' : elementId;
  const element = document.getElementById(wrapperId) || document.getElementById(elementId);
  if (!element) throw new Error('Preview element not found');

  // Clone element to avoid modifying the UI during export
  const cloneWrapper = element.cloneNode(true);
  
  // Create an off-screen container
  const printContainer = document.createElement('div');
  printContainer.className = 'pdf-export-container';
  printContainer.style.position = 'absolute';
  printContainer.style.top = '-9999px';
  printContainer.style.left = '-9999px';
  printContainer.style.width = '210mm';
  
  // Reset scaling and column layout on the clone because HTML2PDF handles vertical flow natively
  cloneWrapper.style.zoom = '1';
  cloneWrapper.style.transform = 'none';
  cloneWrapper.style.filter = 'none';
  cloneWrapper.style.boxShadow = 'none';
  cloneWrapper.style.height = 'auto'; // Let it grow vertically naturally
  cloneWrapper.style.columnWidth = 'auto';
  cloneWrapper.style.columnGap = '0';
  cloneWrapper.style.columnFill = 'auto';
  cloneWrapper.style.width = '210mm';
  cloneWrapper.style.background = '#fff';
  cloneWrapper.style.overflow = 'visible'; // Ensure wrapper shows all stacked content
  
  // Wipe out the internal paginator sliding transform entirely so the PDF gets the full vertical tree
  const resumePreviewNodes = cloneWrapper.querySelectorAll('#resume-preview');
  resumePreviewNodes.forEach(node => {
    node.style.transform = 'none';
    node.style.transition = 'none';
  });
  
  printContainer.appendChild(cloneWrapper);
  document.body.appendChild(printContainer);

  const html2pdf = (await import('html2pdf.js')).default;
  const opt = {
    margin: 0,
    filename,
    image: {
      type: 'jpeg',
      quality: 1.0
    },
    html2canvas: {
      scale: 2,
      useCORS: true,
      letterRendering: true,
      backgroundColor: '#ffffff',
      windowWidth: printContainer.scrollWidth
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait'
    },
    pagebreak: {
      mode: ['css', 'legacy']
    }
  };

  try {
    const blob = await html2pdf().set(opt).from(cloneWrapper).outputPdf('blob');
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  } finally {
    document.body.removeChild(printContainer);
  }
}
