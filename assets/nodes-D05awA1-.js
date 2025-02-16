import{j as e,__tla as o}from"./index-CwRHVP6m.js";let r,l=Promise.all([(()=>{try{return o}catch{}})()]).then(async()=>{function i(n){const s={a:"a",em:"em",h2:"h2",h3:"h3",hr:"hr",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(s.h2,{children:"I. Introduction"}),`
`,e.jsx(s.p,{children:"By default, the following nodes are always present in your workspace to help you get started:"}),`
`,e.jsx(s.h3,{children:"Session Info Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Displays current session information, such as session count and details."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Provides essential session-related data to enhance user experience."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Toolbar Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Provides quick access to tools and options."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Use this node to enhance productivity by accessing frequently used functions."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Application Bar Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Creates a navigation or application bar."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Enhances the user interface with organized navigation elements."]}),`
`]}),`
`,e.jsx(s.p,{children:"These nodes are foundational and provide essential functionality to help you begin your workflow efficiently."}),`
`,e.jsx(s.h2,{children:"II. How to Add New Nodes"}),`
`,e.jsx(s.p,{children:"To create new nodes related to your workflow, you can use the Toolbar. Here's how you can add nodes like LLM, Thread, Vector Database, and more:"}),`
`,e.jsxs(s.p,{children:[e.jsx(s.img,{src:"./docs/toolbox-node.png",alt:"Toolbox"}),`
`,e.jsx(s.em,{children:"Example"}),": Toolbox with to add an LLM Node."]}),`
`,e.jsx(s.p,{children:"The application also supports some default applications like VSLite and Editor, etc which can be added in a similar manner to enhance your workflow with embedded development environments."}),`
`,e.jsxs(s.p,{children:[e.jsx(s.img,{src:"./docs/application-bar-node.png",alt:"Adding Applications"}),`
`,e.jsx(s.em,{children:"Example"}),": Application bar to add a VSLite App Node"]}),`
`,e.jsx(s.h2,{children:"III. Interaction with Nodes"}),`
`,e.jsx(s.p,{children:"Once you have added nodes to your workspace, you can interact with them to perform various actions. Here are some common interactions you can have with nodes:"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:"Drag and drop nodes to rearrange them in your workspace."}),`
`,e.jsx(s.li,{children:"Connect nodes to create a workflow by dragging a line from one node's output to another node's input."}),`
`]}),`
`,e.jsx(s.h2,{children:"IV. Delete node"}),`
`,e.jsx(s.p,{children:"Delete nodes by selecting them and pressing the delete key or using the delete option from node header."}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"./docs/node-interaction.gif",alt:"Node Interaction"})}),`
`,e.jsx(s.h2,{children:"V. Create Standalone Application"}),`
`,e.jsx(s.p,{children:"For some nodes, you can convert a node and connections to a standalone application by using the option from node header."}),`
`,e.jsx(s.p,{children:e.jsx(s.img,{src:"./docs/create-standalone-application.gif",alt:"Create standalone application"})}),`
`,e.jsx(s.h2,{children:"VI. Supported Nodes"}),`
`,e.jsx(s.p,{children:"Our application supports a variety of nodes, each designed to fulfill specific roles in your workflow. Here's a brief overview of each node type:"}),`
`,e.jsx(s.h3,{children:"LLM Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Integrate language models for processing and generating text."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Ideal for tasks involving natural language understanding and generation."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Toolbar Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Provides quick access to tools and options."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Use this node to enhance productivity by accessing frequently used functions."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Thread Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Organize and manage conversation threads."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Perfect for maintaining structured discussions or dialogues."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Message Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Send and receive messages."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Utilize this node for communication within your application."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Prompt Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Create prompts for user inputs or actions."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Employ this node to guide users through specific tasks or workflows."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Session Info Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Display session-related information."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Keep track of session details to enhance user experience."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Schema Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Define and manage data schemas."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Use this node for structuring data in your application."]}),`
`]}),`
`,e.jsx(s.h3,{children:"CSV Data Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Handle CSV data inputs and outputs."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Ideal for tasks involving data import/export in CSV format."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Tool Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Define custom tools and functionalities."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Extend your application's capabilities with specialized tools."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Embedding Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Utilize embedding models for data representation."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Great for applications involving machine learning and data analysis."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Vector Database Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Manage and query vector databases."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Use this node for efficient handling of vector data."]}),`
`]}),`
`,e.jsx(s.h3,{children:"JSONL Data Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Work with JSONL (JSON Lines) data format."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Suitable for applications requiring structured data processing."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Application Bar Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Create a navigation or application bar."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Enhance user interface with organized navigation elements."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Shape Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Add geometric shapes to your design."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Use this node for visual representation and design enhancements."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Circle Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Specifically add circular shapes."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Ideal for highlighting or marking specific areas."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Triangle Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Specifically add triangular shapes."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Use for directional indicators or design elements."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Editor App Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Integrate a text or code editor."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Perfect for applications requiring in-app editing capabilities."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Placeholder Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Reserve space for future content or features."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Use this node to plan and organize your layout."]}),`
`]}),`
`,e.jsx(s.h3,{children:"Code Container App Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Embed and run code snippets."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Ideal for applications that involve coding and development."]}),`
`]}),`
`,e.jsx(s.h3,{children:"VSLite App Node"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Purpose"}),": Integrate a lightweight visual studio-like environment."]}),`
`,e.jsxs(s.li,{children:[e.jsx(s.strong,{children:"Usage"}),": Enhance development workflows with an embedded IDE."]}),`
`]}),`
`,e.jsx(s.hr,{}),`
`,e.jsx(s.h2,{children:"Additional Resources"}),`
`,e.jsxs(s.ul,{children:[`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"./#/document/connections",title:"<_self>",children:"Node connections"})}),`
`,e.jsx(s.li,{children:e.jsx(s.a,{href:"./#/document/get-started",title:"<_self>",children:"Get started example"})}),`
`]}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{})]})}r=function(n={}){const{wrapper:s}=n.components||{};return s?e.jsx(s,{...n,children:e.jsx(i,{...n})}):i(n)}});export{l as __tla,r as default};
