import React, { useState, useEffect } from 'react';
import { Node } from 'reactflow';

interface BlockEditorProps {
  node: Node;
  onUpdateNode: (nodeId: string, newData: Record<string, unknown>) => void;
  onRemoveNode: (nodeId: string) => void;
  onClose: () => void;
}

export function BlockEditor({
  node,
  onUpdateNode,
  onRemoveNode,
  onClose,
}: BlockEditorProps) {
  const [formData, setFormData] = useState(node.data);

  useEffect(() => {
    setFormData(node.data);
  }, [node.data]);

  const handleInputChange = (key: string, value: string | number) => {
    const newData = { ...formData, [key]: value };
    setFormData(newData);
    onUpdateNode(node.id, newData);
  };

  const renderFormFields = () => {
    switch (node.type) {
      case "vehicleSpeed":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={formData.label || ""}
                onChange={(e) => handleInputChange("label", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Logic Type
              </label>
              <select
                value={formData.logicType || "on"}
                onChange={(e) => handleInputChange("logicType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <option value="on">on</option>
                <option value="value">value</option>
                <option value="write">write</option>
              </select>
            </div>
            {formData.logicType === "value" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Operator
                  </label>
                  <select
                    value={formData.operator || "="}
                    onChange={(e) =>
                      handleInputChange("operator", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  >
                    <option value="=">=</option>
                    <option value="<">&lt;</option>
                    <option value=">">&gt;</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Value
                  </label>
                  <input
                    type="number"
                    value={formData.value || 0}
                    onChange={(e) =>
                      handleInputChange("value", parseInt(e.target.value) || 0)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                  />
                </div>
              </>
            )}
          </div>
        );

      case "thresholdBlock":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={formData.label || ""}
                onChange={(e) => handleInputChange("label", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SS Type
              </label>
              <select
                value={formData.ssType || "bar graph"}
                onChange={(e) => handleInputChange("ssType", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <option value="bar graph">bar graph</option>
                <option value="line graph">line graph</option>
                <option value="pie chart">pie chart</option>
              </select>
            </div>
            {["A", "B", "C", "D"].map((letter) => (
              <div key={letter}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Threshold {letter}
                </label>
                <input
                  type="number"
                  value={formData[`threshold${letter}`] || 0}
                  onChange={(e) =>
                    handleInputChange(
                      `threshold${letter}`,
                      parseInt(e.target.value) || 0
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
                />
              </div>
            ))}
          </div>
        );

      case "gateBlock":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={formData.label || ""}
                onChange={(e) => handleInputChange("label", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Operator
              </label>
              <select
                value={formData.operator || "AND"}
                onChange={(e) => handleInputChange("operator", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <option value="AND">AND</option>
                <option value="OR">OR</option>
                <option value="NOT">NOT</option>
                <option value="XOR">XOR</option>
                <option value="NAND">NAND</option>
                <option value="NOR">NOR</option>
              </select>
            </div>
          </div>
        );

      case "calculationBlock":
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Label
              </label>
              <input
                type="text"
                value={formData.label || ""}
                onChange={(e) => handleInputChange("label", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calculation Step
              </label>
              <input
                type="text"
                value={formData.calculationStep || ""}
                onChange={(e) =>
                  handleInputChange("calculationStep", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Calculation Type
              </label>
              <select
                value={formData.calculationType || "addition"}
                onChange={(e) =>
                  handleInputChange("calculationType", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              >
                <option value="addition">addition</option>
                <option value="subtraction">subtraction</option>
                <option value="multiplication">multiplication</option>
                <option value="division">division</option>
                <option value="modulo">modulo</option>
                <option value="average">average</option>
                <option value="min">minimum</option>
                <option value="max">maximum</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upper Threshold
              </label>
              <input
                type="number"
                value={formData.upperThreshold || 0}
                onChange={(e) =>
                  handleInputChange(
                    "upperThreshold",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Lower Threshold
              </label>
              <input
                type="number"
                value={formData.lowerThreshold || 0}
                onChange={(e) =>
                  handleInputChange(
                    "lowerThreshold",
                    parseInt(e.target.value) || 0
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-500">
            No editor available for this block type.
          </div>
        );
    }
  };

  return (
    <aside className="w-80 bg-white border-l border-gray-300 flex flex-col h-full">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Editing Block</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 p-1"
          aria-label="Close block editor"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </header>

      {/* Block Info */}
      <section className="p-4 border-b border-gray-200">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-600">Block Name</h3>
        </div>
        <div className="bg-gray-100 p-2 rounded">
          <span className="text-sm text-gray-800">
            {node.data.label || "Unnamed Block"}
          </span>
        </div>
      </section>

      {/* Operator/Settings */}
      <section className="p-4 border-b border-gray-200">
        <div className="mb-2">
          <h3 className="text-sm font-medium text-gray-600">Operator</h3>
        </div>
        <div className="bg-foreground text-background p-2 rounded text-center">
          <span className="text-sm font-medium">
            {node.data.operator ||
              node.data.calculationType ||
              (node.data.logicType
                ? node.data.logicType === "on"
                  ? "on"
                  : `value ${node.data.operator || "="} ${node.data.value || 0}`
                : "not configured") ||
              node.data.clause ||
              "N/A"}
          </span>
        </div>
      </section>

      {/* Form Fields */}
      <section
        className="flex-1 overflow-y-auto p-4"
        aria-label="Block configuration form"
      >
        <form onSubmit={(e) => e.preventDefault()}>{renderFormFields()}</form>
      </section>

      {/* Footer */}
      <footer className="p-4 border-t border-gray-200 bg-gray-50">
        <button
          onClick={() => onRemoveNode(node.id)}
          className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors"
          aria-label="Remove this block from canvas"
        >
          Remove Block
        </button>
      </footer>
    </aside>
  );
};
