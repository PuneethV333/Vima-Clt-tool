import React from "react";
import Container from "../components/Container";

const Body = () => {
  return (
    <div id="body" className="px-4 sm:px-6 md:px-10 pt-16 space-y-16">
      
      <div className="max-w-4xl mx-auto space-y-4 text-center sm:text-left">
        <p className="text-base sm:text-lg text-zinc-400">
          Are you sick of creating folders, installing dependencies, and setting
          up Tailwind CSS?
        </p>

        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
          Use Vima CLI to make your web development fast and effortless
        </p>

        <p className="text-base sm:text-lg text-zinc-400">
          Just run a single command and set up your frontend or backend instantly.
        </p>

        <p className="text-sm sm:text-base text-zinc-500">
          Vima CLI provides powerful scaffolding for both frontend and backend.
        </p>
      </div>

      <div className="mx-auto w-3/4 border-b border-amber-50/40" />
      
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl text-zinc-300 text-center sm:text-left">
          We provide 4 variants for frontend
        </h2>

        <h3 className="text-base sm:text-lg text-zinc-400 text-center sm:text-left">
          React + Vite with Tailwind CSS comes pre-configured
        </h3>

        <div className="mt-10">
          <Container />
        </div>
      </div>
    </div>
  );
};

export default Body;
