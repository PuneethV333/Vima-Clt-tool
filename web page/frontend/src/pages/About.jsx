import React, { useRef } from "react";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const About = () => {
  const dotRef = useRef(null);

  useGSAP(() => {
    const dot = dotRef.current;

    
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    
    const xTo = gsap.quickTo(dot, "x", { duration: 0.25, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.25, ease: "power3.out" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", move);

    
    const targets = document.querySelectorAll(
      "p, a, h1, h2, h3, span,button"
    );

    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(dot, {
          opacity: 0.4, 
          duration: 0.2,
          ease: "power2.out",
        });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(dot, {
          opacity: 1,
          duration: 0.2,
          ease: "power2.in",
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  });
  return (
    <div className="min-h-screen w-full bg-zinc-900 text-slate-100 flex flex-col">
      <div
        ref={dotRef}
        className="w-10 aspect-square bg-white rounded-full
                   fixed top-0 left-0 pointer-events-none z-9999"
      />      
      
      <header className="sticky top-0 z-50">
        <Navbar isAbout={true} />
      </header>

      
      <main className="flex-1 px-6 py-20 flex justify-center">
        <div className="w-full max-w-5xl">

          
          <h1 className="text-4xl md:text-5xl font-semibold mb-6">
            About <span className="text-cyan-400">Vima-Clt</span>
          </h1>

          <p className="text-slate-300 text-lg leading-relaxed mb-10">
            Vima-Clt is a developer-focused toolkit designed to simplify and speed up
            modern application development. It provides clean, production-ready
            scaffolding so you can focus on building features instead of
            repeating setup work.
          </p>

          
          <div className="grid md:grid-cols-2 gap-8">

            <div className="rounded-3xl bg-zinc-800/60 backdrop-blur-md p-8 shadow-xl">
              <h2 className="text-2xl font-medium mb-4 text-cyan-300">
                Why Vima?
              </h2>
              <ul className="space-y-3 text-slate-300">
                <li>⚡ Faster project setup</li>
                <li>🧩 Scalable folder structure</li>
                <li>🎯 Best practices baked in</li>
                <li>🛠️ Frontend & Backend variants</li>
              </ul>
            </div>

            <div className="rounded-3xl bg-zinc-800/60 backdrop-blur-md p-8 shadow-xl">
              <h2 className="text-2xl font-medium mb-4 text-cyan-300">
                Tech Stack
              </h2>
              <ul className="space-y-3 text-slate-300">
                <li>React / Vite</li>
                <li>Node.js</li>
                <li>Tailwind CSS</li>
                <li>GSAP Animations</li>
              </ul>
            </div>

          </div>
        </div>
      </main>

      
      <Footer />
    </div>
  );
};

export default About;
