# React CV Maker

A powerful and fully client-side Resume and CV Builder built with React and Vite. Create, customize, and export professional A4 paginated resumes instantly without any backend requirements.

## 🚀 Key Features

- **Dynamic Interactive Pagination:** Simulates physical A4 page limits live in the browser using intelligent React `useLayoutEffect` DOM measurements.
- **Multiple Premium Templates:** Easily switch between Corporate, Clean, Executive, Elegant, and Classic professional designs.
- **Native PDF Exporting:** Utilizes `html2pdf.js` with offscreen un-scaled capturing to generate pixel-perfect scalable PDF prints directly from the browser context without styling loss.
- **Color & Font Theming:** Globally override fonts and active theme tint colors.

## 🛠 Tech Stack

- React 19 (via Vite)
- CSS (Native design tokens and multi-column grid layouts)
- `dnd-kit` (for section sorting options)
- `html2pdf.js` (for PDF extraction and slicing)

## 📦 Getting Started

To run the builder locally, run these commands inside the directory:
```bash
# install dependencies
npm install

# launch the development server
npm run dev
```
