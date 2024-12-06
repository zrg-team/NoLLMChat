import { useRef, Ref } from 'react'
import { Tree, UncontrolledTreeEnvironment, TreeEnvironmentRef } from 'react-complex-tree'
import type * as RCT from 'react-complex-tree'
import type { FileSystemAPI } from '@webcontainer/api'
import { EventEmitter } from 'react-complex-tree/src/EventEmitter'
import { useAppState } from 'src/states/app'
import { cn } from 'src/lib/utils'
import { usePreventPitchZoom } from 'src/hooks/use-prevent-pitch-zoom'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Label } from 'src/lib/shadcn/ui/label'

import { getDirAsTree } from '../modules/webcontainer'
import { debounce } from '../utils/debounce'
import { getIcon } from '../icons'
import { useMainVSLiteAppContext } from '../contexts/main'

interface FileTreeProps {
  fs: FileSystemAPI
  onRenameItem: (path: string, name: string) => void
  onTriggerItem: (path: string, name: string) => void
}

const root: RCT.TreeItem<string> = {
  index: 'root',
  data: 'root',
  isFolder: true,
  canMove: false,
  canRename: false,
  children: [],
}

export function FileTree(props: FileTreeProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const treeEnv = useRef() as Ref<TreeEnvironmentRef<unknown, never>>
  const provider = useRef<TreeProvider<string>>(new TreeProvider({ root }))
  const isDarkTheme = useAppState((state) => state.theme === 'dark')
  const { fileTreeStateRef } = useMainVSLiteAppContext()

  usePreventPitchZoom(editorRef)

  const refresh = async (updateMessage?: unknown) => {
    if (typeof updateMessage === 'string') {
      const data = await getDirAsTree(
        props.fs,
        '.',
        'root',
        Object.assign({}, root, { children: [] }),
        {},
      )
      provider.current.updateItems(data)
    }
  }

  fileTreeStateRef.current = { treeEnv, refresh: debounce(refresh, 300) }

  const renderItem = (item: RCT.TreeItem<unknown>) => {
    const icon = getIcon(
      `${item.data}`,
      '',
      item.isFolder || false,
      item.index === 'root',
      isDarkTheme ? 'dark' : 'light',
    )
    return <span className={cn(icon, 'flex content-center items-center')}>{`${item.data}`}</span>
  }

  return (
    <div className="flex flex-col">
      <div className="w-full p-2 pt-4 flex items-center gap-2 pl-8 cursor-grab">
        <LazyIcon name="square-terminal" />
        <Label className="cursor-grab">VSLite</Label>
      </div>
      <div
        ref={editorRef}
        className={cn(
          'flex-1 !overflow-scroll max-h-full nowheel nodrag',
          isDarkTheme ? 'rct-dark' : 'rct-default',
        )}
      >
        <UncontrolledTreeEnvironment
          ref={treeEnv}
          canRename
          canSearch
          canDragAndDrop
          canDropOnFolder
          canSearchByStartingTyping
          dataProvider={provider.current}
          getItemTitle={(item) => `${item.data}`}
          renderItemTitle={(props) => renderItem(props.item)}
          onPrimaryAction={(item) => props.onTriggerItem(item.index.toString(), `${item.data}`)}
          onRenameItem={(item, name) => props.onRenameItem(item.index.toString(), name)}
          // onExpandItem={(item) => {debug('expand', item)}}
          viewState={{ filetree: {} }}
        >
          <Tree treeId="filetree" treeLabel="Explorer" rootItem="root" />
        </UncontrolledTreeEnvironment>
      </div>
    </div>
  )
}

class TreeProvider<T = unknown> implements RCT.TreeDataProvider {
  private data: RCT.ExplicitDataSource
  private onDidChangeTreeDataEmitter = new EventEmitter<RCT.TreeItemIndex[]>()

  constructor(items: Record<RCT.TreeItemIndex, RCT.TreeItem<T>>) {
    this.data = { items }
  }

  public async updateItems(items: Record<RCT.TreeItemIndex, RCT.TreeItem<T>>) {
    this.data = { items }
    this.onDidChangeTreeDataEmitter.emit(Object.keys(items))
  }

  public async getTreeItem(itemId: RCT.TreeItemIndex): Promise<RCT.TreeItem> {
    return this.data.items[itemId]
  }

  public onDidChangeTreeData(
    listener: (changedItemIds: RCT.TreeItemIndex[]) => void,
  ): RCT.Disposable {
    const handlerId = this.onDidChangeTreeDataEmitter.on((payload) => listener(payload))
    return { dispose: () => this.onDidChangeTreeDataEmitter.off(handlerId) }
  }
}
