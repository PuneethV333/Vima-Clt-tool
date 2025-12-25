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
      "npm install express dotenv helmet cors compression express-rate-limit firebase-admin @prisma/client",
      { cwd: projPath, stdio: "inherit", shell: true }
    );

    
    console.log("📦 Installing dev dependencies...");
    execSync("npm install -D prisma nodemon", {
      cwd: projPath,
      stdio: "inherit",
      shell: true,
    });

    
    execSync("npx prisma init", {
      cwd: projPath,
      stdio: "inherit",
      shell: true,
    });

    
    const folders = ["controllers", "routes", "middleware", "utils", "config"];
    folders.forEach((f) =>
      fs.mkdirSync(path.join(projPath, f), { recursive: true })
    );

    
    fs.writeFileSync(
      path.join(projPath, "config", "prisma.js"),
      `
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;
`.trim()
    );

    
    fs.writeFileSync(
      path.join(projPath, "config", "firebase.js"),
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

const app = express();

app.use(helmet());
app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (_, res) => {
  res.json({ status: "Firebase + SQL backend running ✅" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(\`🚀 Server running on port \${PORT}\`)
);

module.exports = app;
`.trim()
    );

    
    fs.writeFileSync(
      path.join(projPath, ".env"),
      `
PORT=5000
FRONTEND_URL=http://localhost:5173

# SQLite
DATABASE_URL="file:./dev.db"

# Firebase
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
dev.db
`.trim()
    );

    
    const pkgPath = path.join(projPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    pkg.scripts = {
      start: "node index.js",
      dev: "nodemon index.js",
      prisma: "prisma",
      migrate: "prisma migrate dev",
    };

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    console.log("\n✅ Backend setup complete!");
    console.log("👉 cd backend");
    console.log("👉 npx prisma migrate dev");
    console.log("👉 npx nodemon index.js\n");
  } catch (err) {
    console.error("\n❌ Setup failed");
    console.error(err.message || err);
    process.exit(1);
  }
};

module.exports = { setup };
