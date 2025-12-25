export const stacks = {
  frontend: {
    v1: {
      title: "Frontend v1",
      command: "vima frontend 1",
      framework: "React + Vite",
      useCase: "Animation-heavy projects, portfolios, 3D websites",
      fileTree: [
        "src/components",
        "src/context",
        "src/pages",
        "src/hooks",
        "src/utils",
        "src/services"
      ]
    },
    v2: {
      title: "Frontend v2",
      command: "vima frontend 2",
      framework: "React + Vite",
      useCase: "Firebase-based apps",
      fileTree: [
        "src/components",
        "src/config",
        "src/context",
        "src/pages",
        "src/hooks",
        "src/utils"
      ]
    },
    v3: {
      title: "Frontend v3",
      command: "vima frontend 3",
      framework: "React + Vite",
      useCase: "Large-scale SaaS apps",
      fileTree: [
        "src/app",
        "src/features",
        "src/layouts",
        "src/services",
        "src/store",
        "src/utils"
      ]
    },
    v4: {
      title: "Frontend v4",
      command: "vima frontend 4",
      framework: "Next.js (App Router)",
      useCase: "SEO-first production apps",
      fileTree: [
        "app",
        "components",
        "lib",
        "styles",
        "public"
      ]
    }
  },

  backend: {
    v1: {
      title: "Backend v1",
      command: "vima backend 1",
      stack: "Express + MongoDB + Firebase",
      useCase: "Firebase-auth REST APIs",
      fileTree: [
        "db",
        "models",
        "controllers",
        "routes",
        "middleware",
        "config"
      ]
    },
    v2: {
      title: "Backend v2",
      command: "vima backend 2",
      stack: "Express + MongoDB + JWT",
      useCase: "Traditional MERN apps",
      fileTree: [
        "db",
        "models",
        "controllers",
        "routes",
        "middleware",
        "utils"
      ]
    },
    v3: {
      title: "Backend v3",
      command: "vima backend 3",
      stack: "Express + Prisma + SQL",
      useCase: "Enterprise backends",
      fileTree: [
        "config",
        "controllers",
        "routes",
        "middleware",
        "models",
        "utils"
      ]
    },
    v4: {
      title: "Backend v4",
      command: "vima backend 4",
      stack: "Express + Prisma + Firebase",
      useCase: "Modern scalable apps",
      fileTree: [
        "controllers",
        "routes",
        "middleware",
        "utils",
        "config"
      ]
    }
  }
};
