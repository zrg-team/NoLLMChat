import { lazy, memo, Suspense } from 'react'
import { useParams } from 'react-router-dom'

const DocumentViewer = lazy(() => import('src/components/pages/Document/DocumentViewer'))

const DocumentPage = memo(
  () => {
    const { documentId } = useParams()
    return (
      <Suspense>
        <DocumentViewer name={documentId || ''} />
      </Suspense>
    )
  },
  () => true,
)

export default DocumentPage
