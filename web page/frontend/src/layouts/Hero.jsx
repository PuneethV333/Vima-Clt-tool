import React from "react";

const Hero = () => {
  return (
    <section className="mt-6 w-full min-h-[70vh] flex items-center justify-center px-6">
      <div className="w-full max-w-6xl rounded-3xl bg-linear-to-r from-zinc-800/80 to-zinc-900/80 backdrop-blur-md shadow-xl px-10 py-16">
        <div className="max-w-4xl space-y-6">
          <div className="flex items-center space-x-4 text-zinc-400">
            <p>vima clt is a Node package</p>
            <div className="border-l-2 border-zinc-500 h-5"></div>
            <p>Build code fast and easy</p>
          </div>

          <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-tight leading-snug text-white">
            Vima CLI is a powerful command-line tool that helps developers rapidly
            scaffold modern frontend and backend projects, reducing setup time and
            letting you focus on meaningful code
          </h1>

          <div className="mt-6 flex gap-4">
            <a
              href="#body"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </a>
            <a
              href="https://github.com/PuneethV333/Vima-Clt-tool"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
