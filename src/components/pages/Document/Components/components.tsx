import Code from './CodeViewer'

export const components: Record<string, (props: Record<string, unknown>) => JSX.Element> = {
  pre: ({ children }: { children?: null | JSX.Element }) => <Code>{children}</Code>,
  code: ({ children }: { children?: null | JSX.Element | JSX.Element[] }) => (
    <code className="rounded-md border px-1 border-gray-600 ">{children}</code>
  ),
  h1: (props) => <h1 className="text-4xl font-black pb-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-bold pb-4" {...props} />,
  h3: (props) => <h3 className="text-2xl font-semibold pb-4 " {...props} />,
  h4: (props) => <h4 className="text-xl font-medium pb-4" {...props} />,
  h5: (props) => <h5 className="text-lg font-normal pb-4" {...props} />,
  h6: (props) => <h6 className="text-base font-light pb-4" {...props} />,
  p: (props) => <p className="text-lg mb-4" {...props} />,
  li: (props) => <li className="pb-1" {...props} />,
  ul: (props) => <ul className="list-disc pl-6 pb-4" {...props} />,
  ol: (props) => <ol className="list-decimal pl-6 pb-4" {...props} />,
  hr: (props) => <hr className="my-4" {...props} />,
  blockquote: (props) => <blockquote className="border-l-4 pl-4 my-4 pb-0" {...props} />,
  a: (props) => <a className="text-blue-500 underline" {...props} />,
}
