# 🚀 Resume Rocket

**Resume Rocket** is a highly advanced, fully client-side Resume and CV Builder built with **React** and **Vite**. It is designed to create, customize, and export professional A4 paginated resumes instantly without relying on a backend server or complex LaTeX generators. 

## ✨ Key Features

- **Dynamic Interactive Pagination:** Simulates physical A4 page limits live in the browser using intelligent React `useLayoutEffect` DOM measurements. It dynamically calculates physical heights and injects padding to ensure no text or sections are ever "sliced" in half across pages!
- **Multiple Premium Templates:** Easily switch between Corporate, Clean, Executive, Elegant, Modern, and Classic professional designs without losing data.
- **Flawless Native PDF Export:** Utilizes `html2pdf.js` with off-screen DOM cloning. The system strips UI-specific scaling and active-page boundaries on a virtual node tree to generate continuous, pixel-perfect scalable PDF prints directly from the browser context without styling loss.
- **Drag & Drop Reordering:** Fully interactive section reordering using `dnd-kit`.
- **Global Theming:** Override fonts globally (Sans-Serif, Serif, Monospace) and adjust active theme tint colors.
- **Local JSON Storage & Portability:** Import and export your entire resume state flawlessly to a `.json` file for local backup.

## 🛠 Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Advanced Native CSS (CSS Variables, Flex/Grid Templates, Multi-column safeguards)
- **PDF Generation:** `html2pdf.js` (Canvas + jsPDF)
- **Interactivity:** `@dnd-kit/core` & `@dnd-kit/sortable` (for drag/drop)
- **Icons:** `react-icons` (Feather Icons pack)

## 🧠 Architectural Highlights for Developers

Resume Rocket solves several notoriously difficult browser constraints regarding WYSIWYG printing:
1. **The Chromium Zoom / Multicolumn Bug:** Browsers natively fail to calculate `display: grid` and CSS `column-width` properties safely when elements are inside scaling layouts. Resume Rocket bypasses this by tracking pure CSS unscaled pixel coordinates and programmatically assigning margins via React.
2. **True WYSIWYG Representation:** Unlike most PDF generators that slice your data randomly, our `PreviewPanel.jsx` synchronizes element heights and pushes boundaries iteratively to explicitly mimic the *exact* print cuts that the `html2pdf` service will commit to.

## 📁 Project Structure

- `/src/components/resume/`: Contains the core builder interface (`EditorPanel.jsx`, `PreviewPanel.jsx`).
- `/src/components/resume/templates/`: Modular library of all resume templates. Each template acts as an isolated React interface parsing uniform `resume` JSON props.
- `/src/contexts/`: Global state management (`ResumeContext`, `ThemeContext`).
- `/src/utils/`: Core utilities including the `pdfExport.js` virtual DOM cloning logic.

## 📦 Getting Started

To run the builder locally, run these commands inside the directory:
```bash
# install dependencies
npm install

# launch the development server
npm run dev

# build for production
npm run build
```

## 🌐 Deployment
This project is entirely static and pre-rendered. It can be instantly deployed to **Vercel**, **Netlify**, or **GitHub Pages** by simply pointing to the root and executing `npm run build`.
