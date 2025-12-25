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

    console.log("🚀 Creating Next.js app...");
    execSync(
      `npx create-next-app@latest ${projName} --ts --eslint --tailwind --src-dir --app --import-alias @/* --yes`,
      {
        stdio: "inherit",
        shell: true,
      }
    );

    if (!fsSync.existsSync(srcPath)) {
      throw new Error("src directory not found. Next.js setup failed.");
    }

    const folders = ["components", "hooks", "lib", "utils"];
    for (const folder of folders) {
      await fs.mkdir(path.join(srcPath, folder), { recursive: true });
    }

    await fs.writeFile(
      path.join(projPath, ".env.local"),
      `NEXT_PUBLIC_BACKEND_URL=`
    );

    console.log("✅ Next.js setup complete!");
    console.log(`👉 cd ${projName}`);
    console.log("👉 npm run dev");
  } catch (err) {
    console.error("❌ Frontend setup failed");
    console.error(err.message || err);
    process.exit(1);
  }
};

module.exports = { setup };