#!/usr/bin/env node
const path = require("path");
const process = require("process");
const { execSync } = require("child_process");
const fsSync = require("fs");
const fs = require("fs/promises");

const setup = async () => {
  const projName = "frontend";
  const projPath = path.resolve(process.cwd(), projName);
  const srcPath = path.join(projPath, "src");

  try {
    if (fsSync.existsSync(projPath)) {
      throw new Error(`Folder "${projName}" already exists`);
    }

    console.log("🚀 Creating React + Vite app...");
    execSync(`npm create vite ${projName} -- --template react --yes`, {
      stdio: "inherit",
      shell: true,
    });

    console.log("📦 Installing dependencies...");
    execSync("npm install", {
      cwd: projPath,
      stdio: "inherit",
      shell: true,
    });

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

    await fs.writeFile(path.join(projPath, ".env"), `VITE_BACKEND_ROUTE=`);

    console.log("📦 Installing frontend libraries...");
    execSync(
      "npm i react-router-dom axios jwt-decode react-toastify react-icons framer-motion clsx dayjs lodash nanoid",
      { cwd: projPath, stdio: "inherit", shell: true }
    );

    execSync(
      "npm i @reduxjs/toolkit react-redux @tanstack/react-query",
      { cwd: projPath, stdio: "inherit", shell: true }
    );

    execSync("npm i react-hook-form zod @hookform/resolvers", {
      cwd: projPath,
      stdio: "inherit",
      shell: true,
    });

    const folders = [
      "app",
      "components",
      "features",
      "context",
      "hooks",
      "layouts",
      "pages",
      "routes",
      "services",
      "utils",
      "styles",
    ];
    for (const folder of folders) {
      await fs.mkdir(path.join(srcPath, folder), { recursive: true });
    }

    await fs.writeFile(path.join(srcPath, "index.css"), `@import "tailwindcss";`);

    await fs.writeFile(
      path.join(srcPath, "main.jsx"),
      `import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store";
import { queryClient } from "./app/queryClient";
import AuthProvider from "./context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
`
    );

    await fs.writeFile(
      path.join(srcPath, "App.jsx"),
      `const App = () => {
  return <h1 className="p-6 text-xl font-semibold">React + Vite via ViMa CLI</h1>;
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

    await fs.writeFile(
      path.join(srcPath, "app", "store.js"),
      `import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {},
});
`
    );

    await fs.writeFile(
      path.join(srcPath, "app", "queryClient.js"),
      `import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();
`
    );

    await fs.writeFile(
      path.join(srcPath, "services", "api.js"),
      `import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_ROUTE,
  withCredentials: true,
});
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

