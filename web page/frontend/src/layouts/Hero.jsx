import React from "react";

const Hero = () => {
  return (
    <section className="mt-6 w-full min-h-[60vh] flex items-center justify-center px-4 sm:px-6 md:px-10">
      <div className="w-full max-w-6xl rounded-3xl bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 backdrop-blur-md shadow-xl px-6 sm:px-10 py-10 sm:py-16">
        <div className="max-w-4xl space-y-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 text-zinc-400 gap-2">
            <p className="text-center sm:text-left">vima clt is a Node package</p>
            <div className="border-l-2 border-zinc-500 h-5 hidden sm:block"></div>
            <p className="text-center sm:text-left">Build code fast and easy</p>
          </div>

          <h1 className="font-sans text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight leading-snug text-white">
            Vima CLI is a powerful command-line tool that helps developers rapidly
            scaffold modern frontend and backend projects, reducing setup time and
            letting you focus on meaningful code
          </h1>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a
              href="#body"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-lg font-semibold text-center transition"
            >
              Get Started
            </a>
            <a
              href="https://github.com/PuneethV333/Vima-Clt-tool"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white px-6 py-3 rounded-lg font-semibold text-center transition"
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
