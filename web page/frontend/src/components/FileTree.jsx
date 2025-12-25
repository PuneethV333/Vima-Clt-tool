import React from "react";

const FileTree = ({ files }) => {
  return (
    <ul className="text-sm text-zinc-300 space-y-1 font-mono">
      {files.map((file, index) => (
        <li key={index} className="flex items-center gap-2">
          📁 <span>{file}</span>
        </li>
      ))}
    </ul>
  );
};

export default FileTree;
