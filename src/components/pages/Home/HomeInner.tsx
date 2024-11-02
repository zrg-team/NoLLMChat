import { useCallback, useContext } from 'react'
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  Node,
  NodeChange,
  Edge,
  EdgeChange,
  applyNodeChanges,
  applyEdgeChanges,
} from '@xyflow/react'
import { nodeTypes } from 'src/components/molecules/FlowNode'

import { HomePageContext } from 'src/contexts/HomePage/context'

export default function HomeInner() {
  const { nodes, edges, setNodes, setEdges } = useContext(HomePageContext)

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      setNodes?.((nds) => applyNodeChanges(changes, nds))
    },
    [setNodes],
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      setEdges?.((eds) => applyEdgeChanges(changes, eds))
    },
    [setEdges],
  )

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}
