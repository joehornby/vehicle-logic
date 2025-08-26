import React from 'react';
import { Handle, Position } from 'reactflow';

interface CalculationBlockNodeData {
  label: string;
  calculationStep: string;
  calculationType: string;
  upperThreshold: number;
  lowerThreshold: number;
}

export const CalculationBlockNode: React.FC<{ data: CalculationBlockNodeData }> = ({ data }) => {
  return (
    <article className="bg-gray-800 text-white border border-gray-900 rounded-lg p-4 min-w-[220px] shadow-md" role="img" aria-label={`${data.label} node with ${data.calculationType} calculation`}>
      <header className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white rounded" aria-hidden="true"></div>
          <h3 className="font-semibold text-sm">{data.label}</h3>
        </div>
        <button className="text-gray-200 hover:text-white" aria-label="Node options">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </header>
      
      <section className="space-y-1 text-xs mb-3" aria-label="Calculation settings">
        <div>Calculation Step: {data.calculationStep}</div>
        <div>Calculation Type: {data.calculationType}</div>
        <div>Upper Threshold: {data.upperThreshold}</div>
        <div>Lower Threshold: {data.lowerThreshold}</div>
      </section>

      <section className="space-y-2" aria-label="Node connections">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <Handle
              type="target"
              position={Position.Left}
              id={`input-${i}`}
              style={{ top: `${10 + i * 15}%` }}
              className="w-3 h-3 !bg-gray-400 !border-2 !border-white"
              aria-label={`Input connection point ${i}`}
            />
            <span className="text-xs">Input Pin</span>
          </div>
        ))}
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xs">Output Pin</span>
          <Handle
            type="source"
            position={Position.Right}
            id="output-1"
            style={{ top: '70%' }}
            className="w-3 h-3 !bg-gray-400 !border-2 !border-white"
            aria-label="Output connection point 1"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs">Output Pin</span>
          <Handle
            type="source"
            position={Position.Right}
            id="output-2"
            style={{ top: '85%' }}
            className="w-3 h-3 !bg-gray-400 !border-2 !border-white"
            aria-label="Output connection point 2"
          />
        </div>
      </section>
    </article>
  );
};
