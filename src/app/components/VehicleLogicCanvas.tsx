"use client";

import React, { useCallback, useState } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
} from "reactflow";
import "reactflow/dist/style.css";

import { SignalNode } from "@/app/components/nodes/SignalNode";
import { ThresholdBlockNode } from "@/app/components/nodes/ThresholdBlockNode";
import { GateBlockNode } from "@/app/components/nodes/GateBlockNode";
import { CalculationBlockNode } from "@/app/components/nodes/CalculationBlockNode";
import { VehicleSignalsLibrary } from "@/app/components/VehicleSignalsLibrary";
import { BlockEditor } from "@/app/components/BlockEditor";

const nodeTypes = {
  signal: SignalNode,
  thresholdBlock: ThresholdBlockNode,
  gateBlock: GateBlockNode,
  calculationBlock: CalculationBlockNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "signal",
    position: { x: 100, y: 100 },
    data: {
      label: "Vehicle Speed",
      logicType: "value",
      operator: ">",
      value: 20,
    },
  },
  {
    id: "2",
    type: "signal",
    position: { x: 100, y: 250 },
    data: {
      label: "System Time",
      logicType: "value",
      operator: ">",
      value: 17,
    },
  },
  {
    id: "3",
    type: "gateBlock",
    position: { x: 400, y: 175 },
    data: { label: "AND Gate", operator: "AND" },
  },
  {
    id: "4",
    type: "signal",
    position: { x: 700, y: 175 },
    data: {
      label: "Emergency Beacon",
      logicType: "write",
      operator: "=",
      value: 0,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-3",
    source: "1",
    target: "3",
    sourceHandle: "output",
    targetHandle: "input-1",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "output",
    targetHandle: "input-2",
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    sourceHandle: "output-1",
    targetHandle: "input",
  },
];

export const VehicleLogicCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isLibraryVisible, setIsLibraryVisible] = useState(false);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  const updateNodeData = useCallback(
    (nodeId: string, newData: Record<string, unknown>) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      );
    },
    [setNodes]
  );

  const removeNode = useCallback(
    (nodeId: string) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) =>
        eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId)
      );
      setSelectedNode(null);
    },
    [setNodes, setEdges]
  );

  const addNode = useCallback(
    (type: string, position: { x: number; y: number }) => {
      const newNodeId = `${Date.now()}`;
      const newNode: Node = {
        id: newNodeId,
        type,
        position,
        data: getDefaultNodeData(type),
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const addSignalNode = useCallback(
    (signalName: string, position: { x: number; y: number }) => {
      const newNodeId = `${Date.now()}`;
      const newNode: Node = {
        id: newNodeId,
        type: "signal",
        position,
        data: { label: signalName, clause: "read" },
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (!type) return;

      const position = {
        x: event.clientX - reactFlowBounds.left - 110, // Offset for node width
        y: event.clientY - reactFlowBounds.top - 50, // Offset for node height
      };

      // Check if it's a signal or a logic block
      if (type.startsWith("signal:")) {
        const signalName = type.replace("signal:", "");
        addSignalNode(signalName, position);
      } else {
        addNode(type, position);
      }
    },
    [addNode, addSignalNode]
  );

  return (
    <div className="w-full h-full flex">
      {/* Library Toggle Button */}
      <button
        onClick={() => setIsLibraryVisible(!isLibraryVisible)}
        className={`absolute top-4 z-10 bg-white border border-gray-300 rounded-md p-2 shadow-sm hover:bg-gray-50 transition-all cursor-pointer ${
          isLibraryVisible ? "left-84" : "left-4"
        }`}
        aria-label={
          isLibraryVisible ? "Hide library panel" : "Show library panel"
        }
      >
        <svg
          className={`w-4 h-4 text-gray-600 transition-transform ${
            isLibraryVisible ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Vehicle Signals Library Panel */}
      {isLibraryVisible && (
        <aside aria-label="Vehicle signals library">
          <VehicleSignalsLibrary onAddNode={addNode} />
        </aside>
      )}

      {/* Main Canvas */}
      <section className="flex-1 relative" aria-label="Logic design canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onPaneClick={onPaneClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          proOptions={{ hideAttribution: true }}
          fitView
          className="bg-gray-50"
        >
          <Background color="#e5e7eb" gap={20} />
          <Controls className="bg-white shadow-lg border border-gray-200" />
        </ReactFlow>
      </section>

      {/* Block Editor Panel */}
      {selectedNode && (
        <aside aria-label="Block editor panel">
          <BlockEditor
            node={selectedNode}
            onUpdateNode={updateNodeData}
            onRemoveNode={removeNode}
            onClose={() => setSelectedNode(null)}
          />
        </aside>
      )}
    </div>
  );
};

function getDefaultNodeData(type: string) {
  switch (type) {
    case "signal":
      return { label: "Signal", clause: "read" };
    case "thresholdBlock":
      return {
        label: "Threshold Block",
        ssType: "bar graph",
        thresholdA: 20,
        thresholdB: 0,
        thresholdC: 0,
        thresholdD: 0,
      };
    case "gateBlock":
      return { label: "Gate Block", operator: "AND" };
    case "calculationBlock":
      return {
        label: "Calculation Block",
        calculationStep: "step 1",
        calculationType: "addition",
        upperThreshold: 0,
        lowerThreshold: 0,
      };
    default:
      return { label: "Unknown Block" };
  }
}
