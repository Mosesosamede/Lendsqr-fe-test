# 🚀 Lendsqr Admin Portal (React + TypeScript + Sccs + Vite)

This project is a high-fidelity implementation of the Lendsqr Admin Dashboard, built to be a **100% pixel-perfect** representation of the Figma design. As a frontend engineer, the quality of this render is considered sacrosanct.

---

## 🛠 Quick Customization Guide (For Non-Developers)
If you need to edit this project without deep coding skills, follow these simple paths:

* **Change Logo:** Go to `src/components/Icons.tsx` and update the `Logo` component.
* **Change Login Image:** Navigate to `src/pages/LoginPage.tsx` and swap the `loginImg` asset.
* **Update API:** Open `src/services/api.ts` and change the `API_URL` to your live data source.
* **Modify Styles:** Use **SCSS** with the `@use` syntax; do not use the deprecated `@import` rule.

---

## 🎨 Visual Fidelity & Design Standards
* **Sacrosanct Quality:** Every component is audited for 1:1 visual fidelity against the design system.
* **Modern SCSS:** We use the latest SASS standards for better performance and scoping. We use `@use` to replace `@import` for SCSS style management.
* **Icon Architecture:** All graphical elements (Users, Loans, Savings, Filters) are centralized in the `Icons.tsx` component for consistency.
* **Responsiveness:** The layout is fully fluid, ensuring design responsiveness to all media types (Mobile, Tablet, Desktop).

---

## 📂 Key Folders & Logic
* **User Management:** Everything concerning **filtering and search** is found in `src/pages/UsersPage.tsx`.
* **Data Blueprints:** All **Card and Table** structures are defined in the project types `types.tsx`.
* **User Details:** Detailed personal information, education, and guarantor data are managed in `src/pages/UserDetailsPage.tsx` and to import `type.tsx` use import type {"what you wanna import"} from './type'.
* **Navigation:** The `Sidebar` organizes links into "Customers" and "Businesses" sections.

---

## ⚡ Technical Setup (Vite)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

### Official Plugins
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

### Installation & Build
1.  **Install dependencies:** `npm install`
2.  **Run Development Server:** `npm run dev`
3.  **Build for Production:** `npm run build`

### ESLint Configuration
For production applications, it is recommended to enable type-aware lint rules in your `eslint.config.js` to ensure code quality and consistency across variables and function naming.

---

