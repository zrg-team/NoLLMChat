import { useRef, useState, useCallback, useMemo, useEffect } from 'react'
import { Tree, UncontrolledTreeEnvironment, TreeEnvironmentRef } from 'react-complex-tree'
import type * as RCT from 'react-complex-tree'
import type { FileSystemAPI } from '@webcontainer/api'
import { EventEmitter } from 'react-complex-tree/src/EventEmitter'
import { useAppState } from 'src/states/app'
import { cn } from 'src/lib/utils'
import LazyIcon from 'src/components/atoms/LazyIcon'
import { Label } from 'src/lib/shadcn/ui/label'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from 'src/lib/shadcn/ui/context-menu'
import { useTranslation } from 'react-i18next'
import { Popover, PopoverContent, PopoverTrigger } from 'src/lib/shadcn/ui/popover'
import { Separator } from 'src/lib/shadcn/ui/separator'

import { getDirAsTree } from '../modules/webcontainer'
import { debounce } from '../utils/debounce'
import { getIcon } from '../icons'
import { useMainVSLiteAppContext } from '../contexts/main'
import { Skeleton } from 'src/lib/shadcn/ui/skeleton'

interface FileTreeProps {
  hideAppName?: boolean
  fs: FileSystemAPI
  onAddFile: (path: string, name: string) => void
  onRenameItem: (path: string, name: string) => void
  onRenameFolder: (path: string, name: string) => void
  onTriggerItem: (path: string, name: string) => void
  onDeleteFile: (path: string) => void
  onAddFolder: (path: string, name: string) => void
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
  const { onAddFile, onTriggerItem, onRenameItem, onDeleteFile, onAddFolder, onRenameFolder } =
    props
  const { t } = useTranslation('vslite')
  const { ready } = useMainVSLiteAppContext()
  const [selectedItemIndex, setSelectedItemIndex] = useState<RCT.TreeItemIndex[]>()
  const [, setHoverItem] = useState<RCT.TreeItem<unknown> | undefined>()
  const [openRenamePopover, setOpenRenamePopover] = useState(false)

  const editorRef = useRef<HTMLDivElement>(null)
  const renameInputRef = useRef<HTMLInputElement>(null)
  const treeEnv = useRef<TreeEnvironmentRef<unknown, never> | null>(null)
  const provider = useRef<TreeProvider<string>>(new TreeProvider({ root }))
  const isDarkTheme = useAppState((state) => state.theme === 'dark')
  const isContextMenuRef = useRef(false)
  const hoverItemRef = useRef<RCT.TreeItem>()
  const { fileTreeStateRef, setFileTreeState } = useMainVSLiteAppContext()

  const refresh = useCallback(async (updateMessage?: unknown) => {
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
  }, [])

  fileTreeStateRef.current = { treeEnv, refresh: debounce(refresh, 300) }

  useEffect(() => {
    setFileTreeState?.(fileTreeStateRef.current)
  }, [])

  const selectItems = useMemo<RCT.TreeItem<unknown>[]>(() => {
    if (selectedItemIndex?.length) {
      return selectedItemIndex
        .map((index) => treeEnv.current?.items[`${index}`])
        .filter(Boolean) as RCT.TreeItem<unknown>[]
    }
    return []
  }, [selectedItemIndex])

  const handleAddFile = useCallback(() => {
    onAddFile(
      selectItems?.[0] && selectItems?.[0].isFolder ? `${selectItems[0].index}` : '/',
      'new_file.ts',
    )
  }, [onAddFile, selectItems])

  const handleAddFolder = useCallback(() => {
    onAddFolder(
      selectItems?.[0] && selectItems?.[0].isFolder ? `${selectItems[0].index}` : '/',
      'new_folder',
    )
  }, [onAddFolder, selectItems])

  const handleDeleteFile = useCallback(() => {
    if (selectItems?.[0]) {
      onDeleteFile(selectItems[0].index.toString())
    }
  }, [onDeleteFile, selectItems])

  const handleOpenRenameFile = useCallback(() => {
    if (selectedItemIndex?.length) {
      setOpenRenamePopover(true)
      setTimeout(() => {
        renameInputRef.current?.focus()
      }, 250)
    }
  }, [selectedItemIndex])

  const handleOnChangeName = useCallback(() => {
    const item = selectedItemIndex?.[0]
      ? treeEnv.current?.items[`${selectedItemIndex?.[0]}`]
      : undefined

    if (renameInputRef.current?.value && item && item?.isFolder) {
      onRenameFolder(item.index.toString(), renameInputRef.current.value)
    } else if (renameInputRef.current?.value && item) {
      onRenameItem(item.index.toString(), renameInputRef.current.value)
    }
    setOpenRenamePopover(false)
  }, [onRenameFolder, onRenameItem, selectedItemIndex])

  const handleSelectItems = useCallback((items: RCT.TreeItemIndex[]) => {
    setSelectedItemIndex(items)
  }, [])

  const renderItem = useCallback(
    (props: {
      title: string
      item: RCT.TreeItem<unknown>
      context: RCT.TreeItemRenderContext<never>
      info: RCT.TreeInformation
    }) => {
      const icon = getIcon(
        `${props.item.data}`,
        '',
        props.item.isFolder || false,
        props.item.index === 'root',
        isDarkTheme ? 'dark' : 'light',
      )

      const item = (
        <span
          onMouseEnter={() => {
            if (!isContextMenuRef.current) {
              hoverItemRef.current = props.item
              setHoverItem(props.item)
            }
          }}
          onMouseLeave={() => {
            if (!isContextMenuRef.current) {
              hoverItemRef.current = undefined
              setHoverItem(undefined)
            }
          }}
          className={cn(
            icon,
            'flex content-center items-center text-ellipsis overflow-hidden whitespace-nowrap',
          )}
        >{`${props.item.data}`}</span>
      )

      if (!selectedItemIndex?.includes(props.item.index)) {
        return item
      }

      return <PopoverTrigger>{item}</PopoverTrigger>
    },
    [isDarkTheme, selectedItemIndex],
  )

  const handleRenderItemTitle = useCallback((item: RCT.TreeItem<unknown>) => {
    return `${item.data}`
  }, [])

  const handlePrimaryAction = useCallback(
    (item: RCT.TreeItem<unknown>) => {
      return onTriggerItem(item.index.toString(), `${item.data}`)
    },
    [onTriggerItem],
  )

  const handleRenameItem = useCallback(
    (item: RCT.TreeItem<unknown>, name: string) => onRenameItem(item.index.toString(), name),
    [onRenameItem],
  )

  const handleContextMenuOpenChange = useCallback((isOpen: boolean) => {
    if (!isOpen) {
      hoverItemRef.current = undefined
      isContextMenuRef.current = false
      setHoverItem(undefined)
    } else {
      isContextMenuRef.current = true
    }
  }, [])

  const viewState = useMemo(() => {
    return { filetree: {} }
  }, [])

  const handleOnPopoverOpenChange = useCallback(() => {}, [])

  return (
    <Popover open={openRenamePopover} onOpenChange={handleOnPopoverOpenChange}>
      <ContextMenu onOpenChange={handleContextMenuOpenChange}>
        <ContextMenuTrigger>
          <div className="flex h-full flex-col">
            {!props?.hideAppName ? (
              <div className="w-full p-2 pt-4 flex items-center gap-2 pl-8 cursor-grab">
                <LazyIcon name="square-terminal" />
                <Label className="cursor-grab">VSLite</Label>
              </div>
            ) : (
              <div />
            )}

            <div
              ref={editorRef}
              className={cn(
                'flex-1 !overflow-scroll max-h-full nowheel nodrag relative',
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
                onSelectItems={handleSelectItems}
                dataProvider={provider.current}
                getItemTitle={handleRenderItemTitle}
                renderItemTitle={renderItem}
                onPrimaryAction={handlePrimaryAction}
                onRenameItem={handleRenameItem}
                disableMultiselect
                viewState={viewState}
              >
                <Tree treeId="filetree" treeLabel="Explorer" rootItem="root" />
              </UncontrolledTreeEnvironment>
              {!ready ? (
                <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-2 z-50 p-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </div>
              ) : undefined}
            </div>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem disabled>
            {`${selectItems?.[0]?.index || './'}`.replace('./', '')}
          </ContextMenuItem>
          <Separator />
          <ContextMenuItem onClick={handleAddFile}>{t('context_menu.new_file')}</ContextMenuItem>
          <ContextMenuItem onClick={handleAddFolder}>
            {t('context_menu.new_folder')}
          </ContextMenuItem>
          <ContextMenuItem onClick={handleOpenRenameFile} disabled={!selectedItemIndex?.length}>
            {t('context_menu.rename')}
          </ContextMenuItem>
          <ContextMenuItem onClick={handleDeleteFile} disabled={!selectedItemIndex?.length}>
            {t('context_menu.delete')}
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <PopoverContent
        side="bottom"
        autoFocus
        className="w-48 !p-2"
        onPointerDownOutside={handleOnChangeName}
      >
        <input
          ref={renameInputRef}
          defaultValue={`${selectItems?.[0]?.data || ''}`}
          className="w-full bg-transparent"
        />
      </PopoverContent>
    </Popover>
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
