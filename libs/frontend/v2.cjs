#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs/promises");
const fsSync = require("fs");
const path = require("path");
const process = require("process");

const setup = async () => {
  const projName = "frontend";
  const projPath = path.resolve(process.cwd(), projName);
  const srcPath = path.join(projPath, "src");

  try {
    if (fsSync.existsSync(projPath)) {
      throw new Error(`Folder "${projName}" already exists`);
    }

    console.log("🚀 Creating React + Vite app...");
    execSync(
      `npm create vite ${projName} -- --template react --yes`,
      { stdio: "inherit", shell: true }
    );

    console.log("📦 Installing base dependencies...");
    execSync("npm install", { cwd: projPath, stdio: "inherit", shell: true });

    console.log("🎨 Installing Tailwind v4 + Vite plugin...");
    execSync("npm install -D tailwindcss @tailwindcss/vite", {
      cwd: projPath,
      stdio: "inherit",
      shell: true,
    });

    
    const viteConfigPathJs = path.join(projPath, "vite.config.js");
    const viteConfigPathTs = path.join(projPath, "vite.config.ts");
    const viteConfigPath = fsSync.existsSync(viteConfigPathTs)
      ? viteConfigPathTs
      : viteConfigPathJs;

    const viteConfigContent = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
`;
    await fs.writeFile(viteConfigPath, viteConfigContent);

    console.log("🔐 Creating environment variables...");
    await fs.writeFile(
      path.join(projPath, ".env"),
      `VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=
VITE_BACKEND_URL=
`
    );

    console.log("📦 Installing frontend libraries...");
    execSync(
      "npm i react-router-dom firebase react-toastify swiper axios",
      { cwd: projPath, stdio: "inherit", shell: true }
    );

    const folders = [
      "components",
      "config",
      "context",
      "pages",
      "restrictedRoute",
      "hooks",
      "utils",
      "services",
    ];
    for (const folder of folders) {
      await fs.mkdir(path.join(srcPath, folder), { recursive: true });
    }

    console.log("🔥 Creating Firebase config...");
    await fs.writeFile(
      path.join(srcPath, "config", "firebase.js"),
      `import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
`
    );

    await fs.writeFile(path.join(srcPath, "index.css"), `@import "tailwindcss";`);

    await fs.writeFile(
      path.join(srcPath, "main.jsx"),
      `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
`
    );

    await fs.writeFile(
      path.join(srcPath, "App.jsx"),
      `const App = () => {
  return <h1 className="p-6 text-xl font-semibold">React + Vite + Tailwind v4 via ViMa CLI</h1>;
};

export default App;
`
    );

    await fs.writeFile(
      path.join(srcPath, "context", "AuthProvider.jsx"),
      `import { createContext } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
`
    );

    console.log("✅ Frontend setup complete!");
    console.log(`👉 cd ${projName}`);
    console.log("👉 npm run dev");

    
  } catch (err) {
    console.error("❌ Frontend setup failed");
    console.error(err.message || err);
    process.exit(1);
  }
};

module.exports = { setup };
