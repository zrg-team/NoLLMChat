import { memo, useCallback } from 'react'
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
  PanOnScrollMode,
} from '@xyflow/react'
import { nodeTypes } from 'src/components/flows/Nodes'
import { useFlowState } from 'src/states/flow'
import { useAppState } from 'src/states/app'
import { DevTools } from 'src/lib/shadcn/devtools'
import { isDev } from 'src/constants/dev'
import { useHomePage } from './hooks/use-home-page'

const HomeInner = () => {
  const theme = useAppState((state) => state.theme)
  const nodes = useFlowState((state) => state.nodes)
  const edges = useFlowState((state) => state.edges)
  const { updateNodeChanges, updateEdgeChanges, updateEdgeConnection } = useHomePage()

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
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      panOnScroll
      panOnScrollMode={PanOnScrollMode.Free}
      colorMode={theme}
      fitView
    >
      <Background variant={BackgroundVariant.Dots} gap={24} size={1} />
      <Controls />
      <MiniMap />
      {isDev ? <DevTools /> : undefined}
    </ReactFlow>
  )
}

export default memo(HomeInner)
