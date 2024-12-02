import { useCallback, memo, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { File, Folder, Tree } from 'src/lib/shadcn/ui/file-tree'
import { ElementTree } from 'src/services/web-container/utils/file-tree'

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

const CodeEditor = memo(({ filesystem }: { filesystem: ElementTree[] }) => {
  const [code, setCode] = useState<{ file: string; id: string; code: string; name: string }>()
  const [languageExtension, setLanguageExtension] =
    useState<Awaited<ReturnType<typeof getLanguageExtension>>>(null)

  const onChangeCode = useCallback((val: string) => {
    setCode((pre) => (pre ? { ...pre, code: val } : pre))
  }, [])

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

  return (
    <div className="flex w-full rounded-md h-full">
      <Tree
        className="p-2 rounded-md bg-background w-64"
        initialExpandedItems={filesystem.map((item) => item.id)}
        elements={filesystem}
      >
        <FileSystem elements={filesystem} onSelectFile={handleSelectFile} />
      </Tree>
      <CodeMirror
        value={code?.code || ''}
        className="flex-1 rounded-md h-full overflow-y-auto nodrag nowheel"
        extensions={languageExtension ? [languageExtension] : []}
        height="600px"
        onChange={onChangeCode}
        maxHeight="600px"
      />
    </div>
  )
})

export default CodeEditor
