import { lazy, Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { DefaultLoader } from 'src/components/atoms/DefaultLoader'

const DocumentViewer = lazy(() => import('src/components/pages/Document/DocumentViewer'))

const DocumentPage = () => {
  const { documentId } = useParams()
  return (
    <Suspense fallback={<DefaultLoader flickeringGrid className="w-full h-full" />}>
      <DocumentViewer name={documentId || ''} />
    </Suspense>
  )
}

export default DocumentPage
