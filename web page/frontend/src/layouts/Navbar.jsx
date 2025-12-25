import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";

const Navbar = ({isAbout}) => {
  const navRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".logo", {
      opacity: 0,
      x: -14000,
      duration: 1,
      ease: "power3.out",
    }).from(
      ".nav-link",
      {
        opacity: 0,
        y: -20,
        stagger: 0.15,
        duration: 0.4,
      },
      "-=0.3"
    );
  }, { scope: navRef });

  return (
    <div
      ref={navRef}
      className="bg-transparent flex items-center justify-between px-6 py-4 backdrop-blur-md"
    >
      
      <div className="logo transition-transform duration-300 hover:-translate-y-1 hover:scale-105 cursor-pointer">
        <img
          src="https://res.cloudinary.com/deymewscv/image/upload/v1760798310/make_the_background_emesg0.png"
          alt="Vima tech logo"
          className="h-20 rounded-2xl shadow-md"
        />
      </div>

      
      <div className="flex items-center space-x-6 text-sky-100 font-medium">
        {!isAbout && <a href="/about" className="nav-link hover:text-cyan-400 transition-colors">
          About
        </a>}
        <a
          href="https://github.com/PuneethV333/Vima-Clt-tool"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link hover:text-cyan-400 transition-colors"
        >
          Github
        </a>
        <a
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
