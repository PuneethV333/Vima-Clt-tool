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

    console.log("🚀 Creating React app with Vite...");
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

    console.log("📦 Installing app libraries...");
    execSync(
      "npm i react-router-dom jwt-decode react-toastify react-icons framer-motion clsx swiper axios three gsap",
      { cwd: projPath, stdio: "inherit", shell: true }
    );

    console.log("🧹 Installing linting tools...");
    execSync(
      "npm i -D eslint prettier eslint-config-prettier eslint-plugin-react",
      { cwd: projPath, stdio: "inherit", shell: true }
    );

    
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
  plugins: [
    react(),
    tailwindcss(),
  ],
});
`;
    await fs.writeFile(viteConfigPath, viteConfigContent);

    
    const folders = [
      "components",
      "context",
      "pages",
      "protectedRoutes",
      "hooks",
      "utils",
      "services",
    ];
    for (const folder of folders) {
      await fs.mkdir(path.join(srcPath, folder), { recursive: true });
    }

    
    await fs.writeFile(
      path.join(srcPath, "index.css"),
      `@import "tailwindcss";`
    );

    
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
      `import { useEffect } from "react";
import * as THREE from "three";
import { gsap } from "gsap";

const App = () => {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    camera.position.z = 5;

    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    gsap.to(cube.rotation, { x: "+=6.28", duration: 5, repeat: -1 });
  }, []);

  return (
    <div className="p-6 text-xl font-semibold">
      React + Vite + Tailwind v4 + Three.js + GSAP 🚀
    </div>
  );
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

    console.log("\n✅ Frontend setup complete!");
    console.log(`👉 cd ${projName}`);
    console.log("👉 npm run dev\n");
  } catch (err) {
    console.error("❌ Frontend setup failed");
    console.error(err.message || err);
    process.exit(1);
  }
};

module.exports = { setup };
