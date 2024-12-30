/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
declare module 'pdfjs-dist/legacy/build/pdf.min.mjs'
declare module 'pdfjs-dist/legacy/build/pdf.worker.min.mjs'

declare module '*.mdx' {
  const MDXComponent: (props: {
    components: Record<string, (props: Record<string, unknown>) => JSX.Element>
  }) => JSX.Element
  export default MDXComponent
}
