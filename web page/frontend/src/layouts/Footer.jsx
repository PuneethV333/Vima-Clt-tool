import React from "react";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 w-full py-12 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between px-6 gap-8">

        
        <div className="flex flex-col justify-center space-y-3">
          <h1 className="text-lg md:text-xl text-cyan-400 font-semibold">
            Created by Puneeth.V — PES University, CSE (2nd year)
          </h1>
          <h2 className="text-sm italic text-zinc-400 max-w-md">
            This tool is under development and will have frequent updates in features
          </h2>
        </div>

        
        <div className="flex flex-col md:items-end space-y-2 text-slate-200">
          <a href="https://github.com/PuneethV333" className="hover:text-cyan-400 transition">GitHub</a>
          <a href="#" className="hover:text-cyan-400 transition">Instagram</a>
          <a href="https://www.npmjs.com/~vimatech" className="hover:text-cyan-400 transition">npmjs</a>
          <a href="https://www.linkedin.com/in/puneeth-v-78a394336/" className="hover:text-cyan-400 transition">LinkedIn</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
