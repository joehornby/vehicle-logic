import React, { useState } from "react";

interface VehicleSignalsLibraryProps {
  onAddNode: (type: string, position: { x: number; y: number }) => void;
}

interface SignalCategory {
  name: string;
  isExpanded: boolean;
  signals: string[];
}

const initialCategories: SignalCategory[] = [
  {
    name: "Battery",
    isExpanded: false,
    signals: ["Battery Voltage", "Battery Current", "Battery Temperature"],
  },
  {
    name: "Climate",
    isExpanded: false,
    signals: ["Cabin Temperature", "Outside Temperature", "AC Status"],
  },
  {
    name: "Door",
    isExpanded: false,
    signals: ["Driver Door", "Passenger Door", "Rear Doors"],
  },
  {
    name: "Doors",
    isExpanded: false,
    signals: ["All Doors", "Door Locks", "Door Windows"],
  },
  {
    name: "Engine",
    isExpanded: false,
    signals: ["Engine RPM", "Engine Temperature", "Engine Load"],
  },
  {
    name: "I/O Status",
    isExpanded: false,
    signals: ["Digital Inputs", "Analog Outputs", "PWM Signals"],
  },
  {
    name: "Lighting",
    isExpanded: false,
    signals: ["Headlights", "Brake Lights", "Turn Signals"],
  },
  {
    name: "Restraints",
    isExpanded: false,
    signals: ["Seatbelt Status", "Airbag Status", "Safety Systems"],
  },
  {
    name: "Status",
    isExpanded: false,
    signals: ["Ignition Status", "Gear Position", "Vehicle Mode"],
  },
  {
    name: "Tilt",
    isExpanded: false,
    signals: ["Roll Angle", "Pitch Angle", "Yaw Rate"],
  },
  {
    name: "Time",
    isExpanded: false,
    signals: ["System Time", "GPS Time", "Timer Functions"],
  },
  {
    name: "Transmission",
    isExpanded: false,
    signals: ["Gear Ratio", "Transmission Temp", "Shift Position"],
  },
];

const logicBlocks = [
  { type: "thresholdBlock", name: "Threshold Block", icon: "📊" },
  { type: "gateBlock", name: "Gate Block", icon: "🚪" },
  { type: "calculationBlock", name: "Calculation Block", icon: "➕" },
];

export const VehicleSignalsLibrary: React.FC<VehicleSignalsLibraryProps> = ({
  onAddNode,
}) => {
  const [categories, setCategories] = useState(initialCategories);
  // Future feature: filter to show only used signals
  // const [showUsedSignalsOnly, setShowUsedSignalsOnly] = useState(false);

  const toggleCategory = (index: number) => {
    setCategories((prev) =>
      prev.map((category, i) =>
        i === index
          ? { ...category, isExpanded: !category.isExpanded }
          : category
      )
    );
  };

  const handleDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleAddLogicBlock = (type: string) => {
    // Add node at a default position - could be enhanced to add at mouse position
    onAddNode(type, {
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
    });
  };

  return (
    <nav className="w-80 bg-white border-r border-gray-300 flex flex-col h-full">
      {/* Header */}
      <header className="p-4 border-b border-gray-200">
        <h1 className="mb-4 font-semibold tracking-tight text-2xl">Vehicle Logic</h1>

        <section className="mb-4">
          <h2 className="font-semibold text-gray-800 mb-2 block">
            LIBRARY
          </h2>

          <div className="relative mb-2">
            <label htmlFor="signal-search" className="sr-only">Search signals</label>
            <input
              id="signal-search"
              type="text"
              placeholder="Search"
              className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
            />
          </div>
        </section>

        {/* Logic Blocks Section */}
        <section className="mb-4">
          <h3 className="font-semibold text-sm text-gray-700 mb-2">
            Logic Blocks
          </h3>
          <ul className="space-y-1">
            {logicBlocks.map((block) => (
              <li key={block.type}>
                <button
                  draggable
                  onDragStart={(e) => handleDragStart(e, block.type)}
                  onClick={() => handleAddLogicBlock(block.type)}
                  className="w-full flex items-center gap-2 p-2 text-sm text-gray-700 hover:bg-gray-50 rounded cursor-pointer border border-transparent hover:border-gray-200"
                  aria-label={`Add ${block.name} to canvas`}
                >
                  <span aria-hidden="true">{block.icon}</span>
                  <span>{block.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      </header>

      {/* Signals Categories */}
      <section className="flex-1 overflow-y-auto" aria-label="Vehicle signal categories">
        {categories.map((category, index) => (
          <article key={category.name} className="border-b border-gray-100">
            <button
              onClick={() => toggleCategory(index)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50"
              aria-expanded={category.isExpanded}
              aria-controls={`category-${index}-signals`}
            >
              <h3 className="text-sm font-medium text-gray-700">
                {category.name}
              </h3>
              <svg
                className={`w-4 h-4 text-gray-500 transition-transform ${
                  category.isExpanded ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {category.isExpanded && (
              <ul id={`category-${index}-signals`} className="px-6 pb-2">
                {category.signals.map((signal) => (
                  <li key={signal}>
                    <button
                      draggable
                      onDragStart={(e) => handleDragStart(e, `signal:${signal}`)}
                      className="w-full text-left py-1 text-sm text-gray-600 hover:text-gray-600 cursor-pointer"
                      aria-label={`Add ${signal} signal to canvas`}
                    >
                      {signal}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </section>

      {/* Footer controls */}
      <footer className="p-4 border-t border-gray-200 flex justify-center">
        <div className="flex gap-2" role="toolbar" aria-label="Canvas controls">
          <button className="p-2 text-gray-500 hover:text-gray-700" aria-label="Add new element">
            <svg
              className="w-5 h-5"
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
          <div className="w-px bg-gray-300 mx-1" aria-hidden="true"></div>
          <button className="p-2 text-gray-500 hover:text-gray-700" aria-label="View options">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <button className="p-2 text-gray-500 hover:text-gray-700" aria-label="Expand panel">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </footer>
    </nav>
  );
};
