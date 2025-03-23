import{j as e}from"./index-DtEubEwZ.js";function s(a){const n={a:"a",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",strong:"strong",ul:"ul",...a.components};return e.jsxs(e.Fragment,{children:[e.jsx(n.h2,{children:"Local LLM (WebLLM)"}),`
`,e.jsx(n.p,{children:`The application supports WebLLM by default, a web-based interface for the LLM model.
WebLLM running locally in the browser provides a user-friendly interface for interacting with the LLM model. You can input text prompts, select model configurations, and generate text output in real-time.`}),`
`,e.jsx(n.p,{children:e.jsxs(n.strong,{children:["It totally ",e.jsx(n.strong,{children:"free"})," and ",e.jsx(n.strong,{children:"open-source"}),". You can access the WebLLM interface by visiting the following link: ",e.jsx(n.a,{href:"https://github.com/mlc-ai/web-llm",children:"WebLLM"})]})}),`
`,e.jsx(n.p,{children:"There are several local LLM models available for use in the application. These models can be run locally on your machine, providing a fast and efficient way to generate text output without relying on external servers."}),`
`,e.jsx(n.h3,{children:"1. Qwen LLM"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"./docs/qwen-2.5.png",children:e.jsx(n.img,{src:"./docs/qwen-2.5.png",alt:"Qwen 2.5"})})}),`
`,e.jsx(n.p,{children:"Qwen, which refers to the large language model family built by Alibaba Cloud."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Dense, easy-to-use, decoder-only language models, available in 0.5B, 1.5B, 3B, 7B, 14B, 32B, and 72B sizes, and base and instruct variants."}),`
`,e.jsx(n.li,{children:"Pretrained on our latest large-scale dataset, encompassing up to 18T tokens."}),`
`,e.jsx(n.li,{children:"Significant improvements in instruction following, generating long texts (over 8K tokens), understanding structured data (e.g, tables), and generating structured outputs especially JSON."}),`
`,e.jsx(n.li,{children:"More resilient to the diversity of system prompts, enhancing role-play implementation and condition-setting for chatbots."}),`
`,e.jsx(n.li,{children:"Context length support up to 128K tokens and can generate up to 8K tokens."}),`
`,e.jsx(n.li,{children:"Multilingual support for over 29 languages, including Chinese, English, French, Spanish, Portuguese, German, Italian, Russian, Japanese, Korean, Vietnamese, Thai, Arabic, and more."}),`
`]}),`
`,e.jsx(n.p,{children:"Latest release features the LLMs Qwen2.5, along with specialized models for coding, Qwen2.5-Coder, and mathematics, Qwen2.5-Math. All open-weight models are dense, decoder-only language models, available in various sizes, including:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Qwen2.5: 0.5B, 1.5B, 3B, 7B, 14B, 32B, and 72B"}),`
`,e.jsx(n.li,{children:"Qwen2.5-Coder: 1.5B, 7B, and 32B on the way"}),`
`,e.jsx(n.li,{children:"Qwen2.5-Math: 1.5B, 7B, and 72B."}),`
`]}),`
`,e.jsx(n.h3,{children:"2. Phi LLM"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"./docs/phi-3.jpg",children:e.jsx(n.img,{src:"./docs/phi-3.jpg",alt:"Phi 2.5"})})}),`
`,e.jsx(n.p,{children:"A family of powerful, small language models (SLMs) with groundbreaking performance at low cost and low latency"}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Primary Use Cases"}),`
The model is intended for commercial and research use in multiple languages. The model provides uses for general purpose AI systems and applications which require:`]}),`
`,e.jsx(n.p,{children:`Memory/compute constrained environments
Latency bound scenarios
Strong reasoning (especially code, math and logic)
Our model is designed to accelerate research on language and multimodal models, for use as a building block for generative AI powered features.`}),`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Use Case Considerations"}),`
Our models are not specifically designed or evaluated for all downstream purposes. Developers should consider common limitations of language models as they select use cases, and evaluate and mitigate for accuracy, safety, and fariness before using within a specific downstream use case, particularly for high risk scenarios. Developers should be aware of and adhere to applicable laws or regulations (including privacy, trade compliance laws, etc.) that are relevant to their use case.`]}),`
`,e.jsx(n.h3,{children:"3. LLama 3.2"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"./docs/llama-3.2.jpg",children:e.jsx(n.img,{src:"./docs/llama-3.2.jpg",alt:"LLama 3.2"})})}),`
`,e.jsx(n.p,{children:"The lightweight 1B and 3B models are highly capable with multilingual text generation and tool calling abilities. These models empower developers to build personalized, on-device agentic applications with strong privacy where data never leaves the device. For example, such an application could help summarize the last 10 messages received, extract action items, and leverage tool calling to directly send calendar invites for follow-up meetings."}),`
`,e.jsx(n.p,{children:"Running these models locally comes with two major advantages. First, prompts and responses can feel instantaneous, since processing is done locally. Second, running models locally maintains privacy by not sending data such as messages and calendar information to the cloud, making the overall application more private. Since processing is handled locally, the application can clearly control which queries stay on the device and which may need to be processed by a larger model in the cloud."}),`
`,e.jsx(n.p,{children:"Our evaluation suggests that the Llama 3.2 vision models are competitive with leading foundation models, Claude 3 Haiku and GPT4o-mini on image recognition and a range of visual understanding tasks. The 3B model outperforms the Gemma 2 2.6B and Phi 3.5-mini models on tasks such as following instructions, summarization, prompt rewriting, and tool-use, while the 1B is competitive with Gemma."}),`
`,e.jsx(n.p,{children:"We evaluated performance on over 150 benchmark datasets that span a wide range of languages. For the vision LLMs, we evaluated performance on benchmarks for image understanding and visual reasoning."}),`
`,e.jsx(n.h3,{children:"4. Hermes LLM"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"./docs/mistra-ai.svg",children:e.jsx(n.img,{src:"./docs/mistra-ai.svg",alt:"LLama 3.2"})})}),`
`,e.jsx(n.p,{children:"Hermes 2 Pro on Mistral 7B is the new flagship 7B Hermes!"}),`
`,e.jsx(n.p,{children:"Hermes 2 Pro is an upgraded, retrained version of Nous Hermes 2, consisting of an updated and cleaned version of the OpenHermes 2.5 Dataset, as well as a newly introduced Function Calling and JSON Mode dataset developed in-house."}),`
`,e.jsx(n.p,{children:"This new version of Hermes maintains its excellent general task and conversation capabilities - but also excels at Function Calling, JSON Structured Outputs, and has improved on several other metrics as well, scoring a 90% on our function calling evaluation built in partnership with Fireworks.AI, and an 84% on our structured JSON Output evaluation."}),`
`,e.jsx(n.p,{children:"Hermes Pro takes advantage of a special system prompt and multi-turn function calling structure with a new chatml role in order to make function calling reliable and easy to parse. Learn more about prompting below."}),`
`,e.jsx(n.h3,{children:"5. Gemma LLM"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"./docs/gemma-logo-small.png",children:e.jsx(n.img,{src:"./docs/gemma-logo-small.png",alt:"Gemma 2.5"})})}),`
`,e.jsx(n.p,{children:"Gemma is a family of 4 new LLM models by Google based on Gemini. It comes in two sizes: 2B and 7B parameters, each with base (pretrained) and instruction-tuned versions. All the variants can be run on various types of consumer hardware, even without quantization, and have a context length of 8K tokens:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"gemma-7b: Base 7B model."}),`
`,e.jsx(n.li,{children:"gemma-7b-it: Instruction fine-tuned version of the base 7B model."}),`
`,e.jsx(n.li,{children:"gemma-2b: Base 2B model."}),`
`,e.jsx(n.li,{children:"gemma-2b-it: Instruction fine-tuned version of the base 2B model."}),`
`]}),`
`,e.jsx(n.h3,{children:"6. Stable LM"}),`
`,e.jsx(n.p,{children:e.jsx(n.a,{href:"./docs/stable-lm.webp",children:e.jsx(n.img,{src:"./docs/stable-lm.webp",alt:"StableLM"})})}),`
`,e.jsx(n.p,{children:"Experience cutting edge open access language models."}),`
`,e.jsx(n.p,{children:"Boost your coding prowess with the efficiency of Stable Code, and venture beyond the horizon with our expansive selection of multilingual models, including the cutting-edge Stable LM Zephyr."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"More models, enjoy your exploration!"})}),`
`,e.jsx(n.h2,{children:"II. OpenAI"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Comming Soon"})}),`
`,e.jsx(n.h2,{children:"Additional Resources"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"./#/document/embedding",title:"<_self>",children:"Embedding"})}),`
`,e.jsx(n.li,{children:e.jsx(n.a,{href:"./#/document/get-started",title:"<_self>",children:"Get started Example"})}),`
`]}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{}),`
`,e.jsx("br",{})]})}function i(a={}){const{wrapper:n}=a.components||{};return n?e.jsx(n,{...a,children:e.jsx(s,{...a})}):s(a)}export{i as default};
