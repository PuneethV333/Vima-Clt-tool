#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const setup = () => {
  const projectName = "backend";
  const projPath = path.resolve(process.cwd(), projectName);

  try {
    if (fs.existsSync(projPath)) {
      throw new Error(`Folder "${projectName}" already exists`);
    }

    
    fs.mkdirSync(projPath, { recursive: true });
    console.log("✅ Backend folder created");

    
    console.log("📦 Initializing npm...");
    execSync("npm init -y", {
      cwd: projPath,
      stdio: "inherit",
      shell: true,
    });

    
    console.log("📦 Installing dependencies...");
    execSync(
      "npm install express mongoose dotenv helmet cors firebase-admin compression express-rate-limit",
      {
        cwd: projPath,
        stdio: "inherit",
        shell: true,
      }
    );

    
    const folders = [
      "db",
      "models",
      "controllers",
      "routes",
      "middleware",
      "config"
    ];

    folders.forEach((folder) =>
      fs.mkdirSync(path.join(projPath, folder), { recursive: true })
    );

    
    fs.writeFileSync(
      path.join(projPath, "db", "db.js"),
      `
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  console.log("🛑 MongoDB disconnected");
  process.exit(0);
});

module.exports = connectDB;
`.trim()
    );

    
    fs.writeFileSync(
      path.join(projPath,"config","firebase.js"),
      `
const admin = require("firebase-admin");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\\\n/g, "\\n"),
    }),
  });
}

module.exports = admin;
`.trim()
    );

    
    fs.writeFileSync(
      path.join(projPath, "index.js"),
      `
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

dotenv.config();

const connectDB = require("./db/db");

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.VITE_FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get("/", (_, res) => {
  res.json({ status: "Backend running ✅" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(\`🚀 Server running on port \${PORT}\`)
  );
});

module.exports = app;
`.trim()
    );

    
    fs.writeFileSync(
      path.join(projPath, ".env"),
      `
PORT=5000
VITE_FRONTEND_URL=http://localhost:5173
MONGO_URI=mongodb://127.0.0.1:27017/mydb
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
`.trim()
    );

    
    fs.writeFileSync(
      path.join(projPath, ".gitignore"),
      `
node_modules
.env
`.trim()
    );

    
    const pkgPath = path.join(projPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    pkg.scripts = {
      start: "node index.js",
    };

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    console.log("\n✅ Backend setup complete!");
    console.log("👉 cd backend");
    console.log("👉 npm start\n");
  } catch (err) {
    console.error("\n❌ Failed to setup backend");
    console.error(err.message || err);
    process.exit(1);
  }
};

module.exports = { setup };
