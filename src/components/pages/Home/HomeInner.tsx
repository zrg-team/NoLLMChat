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
import { nodeTypes } from 'src/components/molecules/FlowNodes'

import { HomePageContext } from 'src/contexts/HomePage/context'
import { useFlowState } from 'src/states/flow'

export default function HomeInner() {
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
    <div className="tw-w-full tw-h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}
