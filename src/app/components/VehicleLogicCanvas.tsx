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
  Panel,
} from "reactflow";
import "reactflow/dist/style.css";

import { VehicleSpeedNode } from "@/app/components/nodes/VehicleSpeedNode";
import { ThresholdBlockNode } from "@/app/components/nodes/ThresholdBlockNode";
import { GateBlockNode } from "@/app/components/nodes/GateBlockNode";
import { CalculationBlockNode } from "@/app/components/nodes/CalculationBlockNode";
import { VehicleSignalsLibrary } from "@/app/components/VehicleSignalsLibrary";
import { BlockEditor } from "@/app/components/BlockEditor";

const nodeTypes = {
  vehicleSpeed: VehicleSpeedNode,
  thresholdBlock: ThresholdBlockNode,
  gateBlock: GateBlockNode,
  calculationBlock: CalculationBlockNode,
};

const initialNodes: Node[] = [
  {
    id: "1",
    type: "vehicleSpeed",
    position: { x: 100, y: 100 },
    data: { label: "Vehicle Speed", logicType: "on", operator: "=", value: 0 },
  },
  {
    id: "2",
    type: "thresholdBlock",
    position: { x: 400, y: 50 },
    data: {
      label: "Threshold Block",
      ssType: "bar graph",
      thresholdA: 20,
      thresholdB: 0,
      thresholdC: 0,
      thresholdD: 0,
    },
  },
  {
    id: "3",
    type: "gateBlock",
    position: { x: 700, y: 150 },
    data: { label: "Gate Block", operator: "AND" },
  },
  {
    id: "4",
    type: "calculationBlock",
    position: { x: 400, y: 300 },
    data: {
      label: "Calculation Block",
      calculationStep: "step 1",
      calculationType: "addition",
      upperThreshold: 0,
      lowerThreshold: 0,
    },
  },
];

const initialEdges: Edge[] = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    sourceHandle: "output",
    targetHandle: "input",
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    sourceHandle: "output-1",
    targetHandle: "input-1",
  },
  {
    id: "e4-3",
    source: "4",
    target: "3",
    sourceHandle: "output-1",
    targetHandle: "input-2",
  },
];

export const VehicleLogicCanvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

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
        type: "vehicleSpeed",
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
      {/* Vehicle Signals Library Panel */}
      <aside aria-label="Vehicle signals library">
        <VehicleSignalsLibrary onAddNode={addNode} />
      </aside>

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
            onClose={() => setSelectedNode(null)}
          />
        </aside>
      )}
    </div>
  );
};

function getDefaultNodeData(type: string) {
  switch (type) {
    case "vehicleSpeed":
      return { label: "Vehicle Speed", clause: "read" };
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
