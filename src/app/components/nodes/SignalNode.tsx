import React from 'react';
import { Handle, Position } from 'reactflow';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SignalNodeData {
  label: string;
  logicType: "on" | "value" | "write";
  operator: "=" | "<" | ">";
  value: number;
}

export const SignalNode: React.FC<{ data: SignalNodeData }> = ({ data }) => {
  return (
    <article
      className="bg-gray-200 border border-gray-400 rounded-lg p-4 min-w-[200px] shadow-md"
      role="img"
      aria-label={`${data.label} node with logic condition`}
    >
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded" aria-hidden="true"></div>
          <h3 className="font-semibold text-sm">{data.label}</h3>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700"
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

      <section className="text-xs text-gray-600 mb-3">
        <span>
          {!data.logicType
            ? "press + to configure"
            : data.logicType === "on"
            ? "when: on"
            : data.logicType === "write"
            ? "output: write signal"
            : `when: value ${data.operator || "="} ${data.value || 0}`}
        </span>
      </section>

      <section className="space-y-2" aria-label="Node connections">
        {data.logicType === "write" && (
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Handle
                  type="target"
                  position={Position.Left}
                  id="input"
                  className="w-3 h-3 !bg-gray-500 !border-2 !border-white"
                  aria-label="Input connection point"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Input</p>
              </TooltipContent>
            </Tooltip>
            <span className="text-xs text-gray-600">Input</span>
          </div>
        )}
        {data.logicType !== "write" && (
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs text-gray-600">Output</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <Handle
                  type="source"
                  position={Position.Right}
                  id="output"
                  className="w-3 h-3 !bg-gray-500 !border-2 !border-white"
                  aria-label="Output connection point"
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Output</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </section>
    </article>
  );
};
