import { useCallback, memo, useState, useMemo, useEffect, useRef } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { useTranslation } from 'react-i18next'
import { File, Folder, Tree } from 'src/lib/shadcn/ui/file-tree'
import { convertToElementsTree, ElementTree } from 'src/services/web-container/utils/file-tree'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/lib/shadcn/ui/select'
import { SOURCE_BASES } from 'src/services/web-container/source-bases'
import { Button } from 'src/lib/shadcn/ui/button'
import type { FileSystemTree } from '@webcontainer/api'
import { usePreventPitchZoom } from 'src/hooks/use-prevent-pitch-zoom'

// Function to map file extensions to language highlighting
const getLanguageExtension = async (extension?: string) => {
  switch (extension) {
    case 'js':
    case 'jsx':
      return (await import('@codemirror/lang-javascript')).javascript({ jsx: true })
    case 'ts':
    case 'tsx':
      return (await import('@codemirror/lang-javascript')).javascript({
        typescript: true,
        jsx: true,
      })
    case 'html':
      return (await import('@codemirror/lang-html')).html()
    case 'css':
      return (await import('@codemirror/lang-css')).css()
    case 'json':
      return (await import('@codemirror/lang-json')).json()
    case 'less':
      return (await import('@codemirror/lang-css')).css()
    default:
      return null
  }
}

const FileSystem: React.FC<{
  elements: ElementTree[]
  onSelectFile: (element: ElementTree) => void
}> = ({ onSelectFile, elements }) => {
  return (
    <>
      {elements.map((element) => (
        <ElementRenderer key={element.id} element={element} onSelectFile={onSelectFile} />
      ))}
    </>
  )
}

const ElementRenderer: React.FC<{
  element: ElementTree
  onSelectFile: (element: ElementTree) => void
}> = ({ element, onSelectFile }) => {
  if (element.children && element.children.length > 0) {
    return (
      <Folder element={element.name} value={element.id}>
        {element.children.map((child) => (
          <ElementRenderer key={child.id} element={child} onSelectFile={onSelectFile} />
        ))}
      </Folder>
    )
  } else {
    return (
      <File
        value={element.id}
        onClick={() => {
          onSelectFile(element)
        }}
      >
        <p>{element.name}</p>
      </File>
    )
  }
}

const CodeEditor = memo(
  ({
    fileSystemTree,
    updateCodeContainerFile,
    updateCodeContainerData,
  }: {
    fileSystemTree?: FileSystemTree
    updateCodeContainerData: (tree: FileSystemTree) => Promise<void>
    updateCodeContainerFile: (file: string, code: string) => Promise<void>
  }) => {
    const { t } = useTranslation('flows')
    const debouceRef = useRef<number>()
    const [elementTree, setElementTree] = useState<ElementTree[]>([])
    const [sourcebase, setSourcebase] = useState<string>()
    const [code, setCode] = useState<{ file: string; id: string; code: string; name: string }>()
    const [languageExtension, setLanguageExtension] =
      useState<Awaited<ReturnType<typeof getLanguageExtension>>>(null)
    const editorRef = useRef<HTMLDivElement | null>(null)
    usePreventPitchZoom(editorRef)

    const onChangeCode = useCallback(
      (val: string) => {
        if (!code?.file) return

        clearTimeout(debouceRef.current)
        setCode((pre) => (pre ? { ...pre, code: val } : pre))
        debouceRef.current = setTimeout(() => {
          updateCodeContainerFile(code.file, val || '')
        }, 500)
      },
      [code?.file, updateCodeContainerFile],
    )

    const handleSelectFile = useCallback(async (element: ElementTree) => {
      const fileExtension = element.name.split('.').pop()
      const extension = await getLanguageExtension(fileExtension)
      setLanguageExtension(extension)
      setCode({
        file: element.file,
        id: element.id,
        code: element.content || '',
        name: element.name,
      })
    }, [])

    useEffect(() => {
      if (!fileSystemTree) return

      setElementTree(convertToElementsTree(fileSystemTree))
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!!fileSystemTree])

    const renderSelectDefaultSource = useMemo(() => {
      if (elementTree?.length) {
        return undefined
      }
      return (
        <div className="flex items-center justify-center w-full h-full flex-col">
          <Select onValueChange={(value) => setSourcebase(value)}>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder={t('code_container_app.source_base_select_placeholder')} />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SOURCE_BASES).map(([key]) => {
                return (
                  <SelectItem key={`${key}`} value={`${key}`}>
                    {t(`code_container_app.sourcebases.${key.toLowerCase()}`)}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <Button
            onClick={() =>
              sourcebase &&
              updateCodeContainerData(SOURCE_BASES[sourcebase as keyof typeof SOURCE_BASES])
            }
          >
            {t('code_container_app.update_source')}
          </Button>
        </div>
      )
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [!!elementTree?.length, sourcebase])

    return (
      <div ref={editorRef} className="flex-1 flex h-full overflow-auto">
        <Tree
          className="p-2 bg-background w-64"
          initialExpandedItems={elementTree.map((item) => item.id)}
          elements={elementTree}
        >
          <FileSystem elements={elementTree} onSelectFile={handleSelectFile} />
          {renderSelectDefaultSource}
        </Tree>
        <CodeMirror
          value={code?.code || ''}
          className="flex-1 h-full overflow-auto nodrag nowheel"
          extensions={languageExtension ? [languageExtension] : []}
          onChange={onChangeCode}
          height="600px"
        />
      </div>
    )
  },
)

export default CodeEditor
