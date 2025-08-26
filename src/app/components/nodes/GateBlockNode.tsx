import React from 'react';
import { Handle, Position } from 'reactflow';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GateBlockNodeData {
  label: string;
  operator: string;
}

export const GateBlockNode: React.FC<{ data: GateBlockNodeData }> = ({ data }) => {
  return (
    <article
      className="bg-gray-800 text-white border border-gray-900 rounded-lg p-4 min-w-[200px] shadow-md"
      role="img"
      aria-label={`${data.label} node with ${data.operator} operator`}
    >
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded" aria-hidden="true"></div>
          <h3 className="font-semibold text-sm">{data.label}</h3>
        </div>
        <button
          className="text-gray-200 hover:text-white"
          aria-label="Node options"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </header>

      <section className="text-xs mb-3" aria-label="Gate operator">
        <span>Operator: {data.operator}</span>
      </section>

      <section className="space-y-2" aria-label="Node connections">
        {[1, 2].map((i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <Handle
                type="target"
                position={Position.Left}
                id={`input-${i}`}
                style={{ top: `${30 + i * 20}%` }}
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white"
                aria-label={`Input connection point ${i}`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Input {i}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        <Tooltip>
          <TooltipTrigger asChild>
            <Handle
              type="source"
              position={Position.Right}
              id="output-1"
              className="w-3 h-3 !bg-gray-400 !border-2 !border-white"
              aria-label="Output connection point 1"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Result</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Handle
              type="source"
              position={Position.Right}
              id="output-2"
              style={{ top: "80%" }}
              className="w-3 h-3 !bg-gray-400 !border-2 !border-white"
              aria-label="Output connection point 2"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Inverse</p>
          </TooltipContent>
        </Tooltip>
      </section>
    </article>
  );
};
