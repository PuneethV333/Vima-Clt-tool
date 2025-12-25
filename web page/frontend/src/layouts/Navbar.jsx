import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = ({ isAbout }) => {
  const navRef = useRef(null);
  const linkRefs = useRef([]);

  
  linkRefs.current = [];

  const addLinkRef = (el) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".logo", {
      opacity: 0,
      x: -2000, 
      duration: 1,
      ease: "power3.out",
    }).from(
      ".nav-link",
      {
        opacity: 0,
        y: -20,
        stagger: 0.15,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.5"
    );
  }, { scope: navRef });

  
  useEffect(() => {
    linkRefs.current.forEach((link) => {
      const enter = () => gsap.to(link, { scale: 1.1, duration: 0.2 });
      const leave = () => gsap.to(link, { scale: 1, duration: 0.2 });

      link.addEventListener("mouseenter", enter);
      link.addEventListener("mouseleave", leave);

      
      return () => {
        link.removeEventListener("mouseenter", enter);
        link.removeEventListener("mouseleave", leave);
      };
    });
  }, []);

  return (
    <div
      ref={navRef}
      className="bg-transparent flex items-center justify-between px-6 py-4 backdrop-blur-md sticky top-0 z-50"
    >
      
      <div className="logo transition-transform duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer">
        <a href="/">
          <img
          src="https://res.cloudinary.com/deymewscv/image/upload/v1760798310/make_the_background_emesg0.png"
          alt="Vima Tech Logo"
          className="h-20 rounded-2xl shadow-md"
        />
        </a>
      </div>

      
      <div className="flex items-center space-x-6 text-sky-100 font-medium text-lg">
        {!isAbout && (
          <a
            ref={addLinkRef}
            href="/about"
            className="nav-link hover:text-cyan-400 transition-colors"
          >
            About
          </a>
        )}
        <a
          ref={addLinkRef}
          href="https://github.com/PuneethV333/Vima-Clt-tool"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link hover:text-cyan-400 transition-colors"
        >
          Github
        </a>
        <a
          ref={addLinkRef}
          href="https://www.npmjs.com/package/vima-clt"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link hover:text-cyan-400 transition-colors"
        >
          npm
        </a>
      </div>
    </div>
  );
};

export default Navbar;
