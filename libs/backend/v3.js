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
    execSync("npm init -y", { cwd: projPath, stdio: "inherit" });

    console.log("📦 Installing dependencies...");
    execSync(
      "npm install express cors dotenv helmet morgan jsonwebtoken bcrypt express-rate-limit zod @prisma/client",
      { cwd: projPath, stdio: "inherit" }
    );

    console.log("📦 Installing dev dependencies...");
    execSync("npm install -D prisma nodemon", {
      cwd: projPath,
      stdio: "inherit",
    });

    console.log("🛠 Initializing Prisma...");
    execSync("npx prisma init", {
      cwd: projPath,
      stdio: "inherit",
    });

    
    const folders = [
      "config",
      "controllers",
      "routes",
      "middleware",
      "utils",
      "models",
    ];

    folders.forEach((folder) =>
      fs.mkdirSync(path.join(projPath, folder), { recursive: true })
    );

    
    fs.writeFileSync(
      path.join(projPath, "config", "prisma.js"),
      `const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;
`
    );

    
    fs.writeFileSync(
      path.join(projPath, "index.js"),
      `const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);

app.get("/", (req, res) => {
  res.send("Backend running ✅");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(\`🚀 Server running on port \${PORT}\`);
});

module.exports = app;
`
    );

    
    fs.writeFileSync(
      path.join(projPath, ".env"),
      `PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET=supersecretkey
FRONTEND_URL=http://localhost:5173
`
    );

    
    fs.writeFileSync(
      path.join(projPath, ".gitignore"),
      `node_modules
.env
`
    );

    
    const pkgPath = path.join(projPath, "package.json");
    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));

    pkg.scripts = {
      start: "node index.js",
      dev: "nodemon index.js",
      prisma: "prisma",
    };

    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));

    console.log("\n✅ Backend setup complete!");
    console.log("👉 cd backend");
    console.log("👉 npx nodemon index.js\n");
  } catch (err) {
    console.error("\n❌ Failed to setup backend");
    console.error(err.message || err);
    process.exit(1);
  }
};

module.exports = { setup };
