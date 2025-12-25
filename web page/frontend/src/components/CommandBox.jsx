import React, { useState } from "react";

const CommandBox = ({ command }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);

    
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-zinc-950 border border-zinc-700 rounded-xl overflow-hidden">
      <div className="px-4 py-2 border-b border-zinc-700 text-zinc-400 text-sm flex justify-between items-center">
        <h1>
          Terminal
        </h1>
        <button
          onClick={handleCopy}
          className="p-2 rounded hover:bg-zinc-800 text-zinc-300"
          title="Copy"
        >
          {copied ? (
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5 text-green-500"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
        </button>
      </div>

      <div className="p-4 text-green-400 font-mono text-sm">
        $ {command}
      </div>
    </div>
  );
};

export default CommandBox;
