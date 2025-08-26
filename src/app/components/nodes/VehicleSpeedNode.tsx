import React from 'react';
import { Handle, Position } from 'reactflow';

interface VehicleSpeedNodeData {
  label: string;
  logicType: 'on' | 'value';
  operator: '=' | '<' | '>';
  value: number;
}

export const VehicleSpeedNode: React.FC<{ data: VehicleSpeedNodeData }> = ({ data }) => {
  return (
    <article className="bg-gray-200 border border-gray-400 rounded-lg p-4 min-w-[200px] shadow-md" role="img" aria-label={`${data.label} node with logic condition`}>
      <header className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-600 rounded" aria-hidden="true"></div>
          <h3 className="font-semibold text-sm">{data.label}</h3>
        </div>
        <button className="text-gray-500 hover:text-gray-700" aria-label="Node options">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </header>
      
      <section className="text-xs text-gray-600 mb-3">
        <span>
          {!data.logicType ? 
            'press + to configure' : 
            data.logicType === 'on' ? 
              'when: on' : 
              `when: value ${data.operator || '='} ${data.value || 0}`
          }
        </span>
      </section>

      <section className="space-y-2" aria-label="Node connections">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Input Pin</span>
          <Handle
            type="target"
            position={Position.Left}
            id="input"
            className="w-3 h-3 !bg-gray-500 !border-2 !border-white"
            aria-label="Input connection point"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-600">Output Pin</span>
          <Handle
            type="source"
            position={Position.Right}
            id="output"
            className="w-3 h-3 !bg-gray-500 !border-2 !border-white"
            aria-label="Output connection point"
          />
        </div>
      </section>
    </article>
  );
};
