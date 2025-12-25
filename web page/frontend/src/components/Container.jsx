import React from "react";
import { stacks } from "../context/data";
import StackSection from "./StackSection";
import StartStep from "./StartStep";


const Container = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white p-10 space-y-16">
      <StartStep/>
      <StackSection title="Frontend Variants" data={stacks.frontend} />
      <StackSection title="Backend Variants" data={stacks.backend} />
    </div>
  );
};

export default Container;
