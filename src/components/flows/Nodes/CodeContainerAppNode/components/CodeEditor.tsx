import { useCallback, memo, useState } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { File, Folder, Tree } from 'src/lib/shadcn/ui/file-tree'
import { ElementTree } from 'src/services/web-container/utils/file-tree'

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
  const onChangeCode = useCallback((val: string) => {
    setCode((pre) => (pre ? { ...pre, code: val } : pre))
  }, [])

  const handleSelectFile = useCallback((element: ElementTree) => {
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
        extensions={[javascript({ jsx: true })]}
        height="400px"
        onChange={onChangeCode}
      />
    </div>
  )
})

export default CodeEditor
