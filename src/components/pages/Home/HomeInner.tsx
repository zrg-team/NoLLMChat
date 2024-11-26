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
  Connection,
} from '@xyflow/react'
import { nodeTypes } from 'src/components/flows/Nodes'
import { HomePageContext } from 'src/contexts/HomePage/context'
import { useFlowState } from 'src/states/flow'
import { useAppState } from 'src/states/app'

export default function HomeInner() {
  const theme = useAppState((state) => state.theme)
  const nodes = useFlowState((state) => state.nodes)
  const edges = useFlowState((state) => state.edges)
  const { updateNodeChanges, updateEdgeChanges, updateEdgeConnection } = useContext(HomePageContext)

  const onNodesChange = useCallback(
    (changes: NodeChange<Node>[]) => {
      updateNodeChanges(changes)
    },
    [updateNodeChanges],
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange<Edge>[]) => {
      updateEdgeChanges(changes)
    },
    [updateEdgeChanges],
  )

  const onConnect = useCallback(
    (connection: Connection) => {
      updateEdgeConnection(connection)
    },
    [updateEdgeConnection],
  )

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        colorMode={theme}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={24} size={1} />
      </ReactFlow>
    </div>
  )
}
