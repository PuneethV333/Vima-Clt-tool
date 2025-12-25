import React from "react";
import CommandBox from "./CommandBox";
import FileTree from "./FileTree";

const VariantCard = ({ variant }) => {
  return (
    <div className="bg-zinc-900 rounded-2xl p-4 sm:p-6 border border-zinc-700 flex flex-col">
      <h3 className="text-lg sm:text-xl font-semibold mb-1">{variant.title}</h3>
      <p className="text-zinc-400 text-xs sm:text-sm mb-4">{variant.useCase}</p>

      <CommandBox command={variant.command} />

      <div className="mt-4 overflow-x-auto">
        <p className="text-sm sm:text-base text-zinc-400 mb-2">File Structure</p>
        <FileTree files={variant.fileTree} />
      </div>
    </div>
  );
};

export default VariantCard;
