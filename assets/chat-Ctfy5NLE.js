import{j as e}from"./index-RiB-44Db.js";function r(o){const t={a:"a",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...o.components};return e.jsxs(e.Fragment,{children:[e.jsx(t.h2,{children:"Chat Application"}),`
`,e.jsx(t.p,{children:`A Chat Application is created from a workflow that optimizes user experience by focusing on chat with the LLM model.
You can create multiple threads to chat with the LLM model. You can also add a structured output, vector database retrieval, and system prompt to the Chat Application.`}),`
`,e.jsx(t.p,{children:e.jsx(t.a,{href:"./docs/chat-application.png",children:e.jsx(t.img,{src:"./docs/chat-application.png",alt:"App Project"})})}),`
`,e.jsx(t.h3,{children:"Get Started"}),`
`,e.jsx(t.p,{children:"You can follow the below tutorial to get started with Chat Application."}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"./#/document/chat-application",title:"<_self>",children:"Tutorial"})}),`
`,e.jsx(t.li,{children:e.jsx(t.a,{href:"./docs/Extract-City.json",title:"<download>",children:"Download Project File"})}),`
`]}),`
`,e.jsx(t.h3,{children:"How to build a Chat Application from workflow"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Step 1:"})," Create a LLM Node."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Step 2:"})," Load LLM model and then create a thread from the LLM Node."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Step 3:"})," From the Thread Node, create a Chat Application."]}),`
`]}),`
`,e.jsxs(t.p,{children:["Or ",e.jsx(t.a,{href:"./#/document/simple-workflow",title:"<_self>",children:"reference this for more detail"})]}),`
`,e.jsx(t.p,{children:"Before creating a Chat Application. You can add few nodes connecting to the Thread Node which will help you to have a advanced Chat Application."}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:["Connect a ",e.jsx(t.code,{children:"Schema Node"})," to the Thread Node to structured the LLM output."]}),`
`,e.jsxs(t.li,{children:["Connect a ",e.jsx(t.code,{children:"Tool Node"})," to the Thread Node to call a tool."]}),`
`,e.jsxs(t.li,{children:["Connect a ",e.jsx(t.code,{children:"Vector Database Node"})," to the Thread Node to retrieve data from the database."]}),`
`,e.jsxs(t.li,{children:["Connect a ",e.jsx(t.code,{children:"Prompt Node"})," to the Thread Node to add system prompt to the Chat Application."]}),`
`]}),`
`,e.jsx(t.h3,{children:"Features"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Chat:"})," Chat with LLM model."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Multiple Thread:"})," Create multiple threads to chat with LLM model."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Structured Output:"})," Display structured output from LLM model."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Vector Database Retrieval:"})," Retrieve data from the vector database."]}),`
`]}),`
`,e.jsx(t.h3,{children:"Components"}),`
`,e.jsxs(t.ul,{children:[`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Thread List"}),": List of threads created in the right panel of the Chat Application. You can select any thread or create a new thread."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Chat Area"}),": Chat area to chat with LLM model."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"LLM Model Info"}),": Display LLM model information in bottom of right panel. You must load the LLM model before starting the chat."]}),`
`,e.jsxs(t.li,{children:[e.jsx(t.strong,{children:"Vector Database Info"}),": If you have connected the Vector Database Node to the Thread Node, then you can see the Vector Database information in the bottom of right panel and on the top of LLM Model Info. You can see the data of vector database, add new record, or import from the file."]}),`
`]}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{})]})}function a(o={}){const{wrapper:t}=o.components||{};return t?e.jsx(t,{...o,children:e.jsx(r,{...o})}):r(o)}export{a as default};
