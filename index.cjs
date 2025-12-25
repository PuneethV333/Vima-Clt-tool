#!/usr/bin/env node

const path = require("path");

const args = process.argv.slice(2);

(async () => {
  try {
    if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
      showHelp();
      process.exit(0);
    }

    const [command, version] = args;

    if (!command || !version) {
      console.error("❌ Missing command or version");
      showHelp();
      process.exit(1);
    }

    if (!["frontend", "backend"].includes(command)) {
      console.error(`❌ Unknown command: ${command}`);
      showHelp();
      process.exit(1);
    }

    if (!["1", "2", "3", "4"].includes(version)) {
      console.error(`❌ Unsupported version: ${version}`);
      showHelp();
      process.exit(1);
    }

    
    const setupModule = require(path.join(
      __dirname,
      `./libs/${command}/v${version}.js`
    ));

    if (!setupModule || !setupModule.setup) {
      throw new Error(`Setup function not found in ${command} v${version}`);
    }

    const result = setupModule.setup();
    
    if (result instanceof Promise) {
      await result;
    }

  } catch (err) {
    console.error("❌ Error running Vima CLI");
    console.error(err.message || err);
    process.exit(1);
  }
})();

function showHelp() {
  console.log(`
🚀 Vima CLI

Usage:
  vima frontend <version>     Create frontend project
  vima backend <version>      Create backend project

Supported versions: 1, 2, 3, 4

Examples:
  vima frontend 1
  vima frontend 3
  vima backend 2

Options:
  -h, --help                  Show help
`);
}
