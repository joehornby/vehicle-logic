import React from 'react';
import { Handle, Position } from 'reactflow';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ThresholdBlockNodeData {
  label: string;
  ssType: string;
  thresholdA: number;
  thresholdB: number;
  thresholdC: number;
  thresholdD: number;
}

export const ThresholdBlockNode: React.FC<{ data: ThresholdBlockNodeData }> = ({ data }) => {
  return (
    <article
      className="bg-gray-800 text-white border border-gray-900 rounded-lg p-4 min-w-[220px] shadow-md"
      role="img"
      aria-label={`${data.label} node with ${data.ssType} display type`}
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

      <section
        className="space-y-1 text-xs mb-3"
        aria-label="Threshold settings"
      >
        <div>SS Type: {data.ssType}</div>
        <div>Threshold A: {data.thresholdA}</div>
        <div>Threshold B: {data.thresholdB}</div>
        <div>Threshold C: {data.thresholdC}</div>
        <div>Threshold D: {data.thresholdD}</div>
      </section>

      <section className="space-y-2" aria-label="Node connections">
        <Tooltip>
          <TooltipTrigger asChild>
            <Handle
              type="target"
              position={Position.Left}
              id="input"
              className="w-3 h-3 !bg-gray-400 !border-2 !border-white"
              aria-label="Input connection point"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Signal Input</p>
          </TooltipContent>
        </Tooltip>

        {[1, 2, 3, 4].map((i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <Handle
                type="source"
                position={Position.Right}
                id={`output-${i}`}
                style={{ top: `${20 + i * 15}%` }}
                className="w-3 h-3 !bg-gray-400 !border-2 !border-white"
                aria-label={`Output connection point ${i}`}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Zone {String.fromCharCode(64 + i)}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </section>
    </article>
  );
};
