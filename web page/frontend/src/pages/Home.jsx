import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Navbar from "../layouts/Navbar";
import Hero from "../layouts/Hero";
import Body from "../layouts/Body";
import Footer from "../layouts/Footer";

const Home = () => {
  const headerRef = useRef(null);
  const dotRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect desktop/hover-capable devices
  useEffect(() => {
    setIsDesktop(window.matchMedia("(hover: hover)").matches);
  }, []);

  // Animate header
  useGSAP(() => {
    gsap.from(headerRef.current, {
      opacity: 0,
      y: -80,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // Dot effect only for desktop
  useEffect(() => {
    if (!isDesktop) return;

    const dot = dotRef.current;
    gsap.set(dot, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(dot, "x", { duration: 0.25, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.25, ease: "power3.out" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", move);

    const targets = document.querySelectorAll("p, a, h1, h2, h3, span,button");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", () => gsap.to(dot, { opacity: 0.4, duration: 0.2, ease: "power2.out" }));
      el.addEventListener("mouseleave", () => gsap.to(dot, { opacity: 1, duration: 0.2, ease: "power2.in" }));
    });

    return () => window.removeEventListener("mousemove", move);
  }, [isDesktop]);

  return (
    <div className="min-h-screen w-full bg-zinc-900 text-slate-100 flex flex-col">
      {/* Dot is only rendered on desktop */}
      {isDesktop && (
        <div
          ref={dotRef}
          className="w-10 aspect-square bg-white rounded-full fixed top-0 left-0 pointer-events-none z-50"
        />
      )}

      <header ref={headerRef} className="sticky top-0 z-50">
        <Navbar isAbout={false} />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <Hero />
      </main>

      <Body />
      <Footer />
    </div>
  );
};

export default Home;
