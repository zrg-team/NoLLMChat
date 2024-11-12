# NoLLM Chat

The project aims to transform AI interaction by developing a platform that improves on typical LLM experiences. It seeks to make exploring AI technologies easy directly in web browsers, offering a flexible and visual interface. The goal is for users to engage with language models in a way that enhances creativity and experience, moving beyond simple chat interactions.

## Intro

![Intro Image](./public/intro.jpeg)

![Demo](./public/demo.gif)

## Vision

* **Enhanced AI Interaction**: Move beyond traditional LLM chat with a platform offering a more flexible and visual interface. Users can directly edit and guide AI to improve response quality, enabling richer interaction experiences.

* **Automated Personal Workflows**: Empowers users to create custom AI workflows tailored to their needs, enhancing productivity and personalization.

* **Comprehensive AI Learning**: Utilize node-based tools that facilitate interaction with and learning about AI technologies. The platform supports LLMs, prompt engineering, function calls, and vector databases, allowing users to experiment and see the impact of different AI components.

* **Free and Browser-Based**: Operates locally and free of charge, with the option to extend capabilities using services like OpenAI. This ensures accessibility and ease of use directly from the browser.

## Technology Stack

- **Vite**: Fast and modern build tool for web projects.
- **React**: A popular JavaScript library for building user interfaces.
- **Voy Vector Database**: A WASM vector similarity search engine written in Rust
- **WebLLM**: Run large language models in the browser without server dependencies.
- **Langchain**: LangChain is a framework for developing applications powered by large language models (LLMs)

## Project Structure

```
src/
│
├── assets/         # Static assets like images and fonts
├── components/     # Reusable React components
├── constants/      # Constant values and configuration settings
├── contexts/       # React context providers for global state management
├── css/            # Styling files (CSS or preprocessor files)
├── hooks/          # Custom React hooks
├── i18n/           # Internationalization setup and resources
├── lib/            # Utility libraries and third-party integrations
├── pages/          # Page components for different routes
├── services/       # API calls and service functions
├── states/         # State management files (e.g., Zustand)
├── utils/          # Utility functions and helpers
│
├── App.tsx         # Main application component
├── main.tsx        # Entry point of the application
└── routes.tsx      # Route configurations
```

## Project Architecture

The architecture of the application is designed to efficiently handle different tasks by dividing them into separate threads. This ensures smooth operation and responsiveness of the UI while managing complex processes in the background.

* Main Thread: Handles the UI application logic, ensuring a responsive user interface.
* Database Worker Thread: Manages database operations using TypeORM and Sqlite WASM. This thread is responsible for data storage and retrieval without blocking the main UI thread.
* LLM Thread: Dedicated to handling large language model processes using WebLLM and Langchain. This thread manages AI computations and interactions.
* Embedding Thread: Focuses on handling the vector database and embedding models. It processes and manages embeddings for efficient data retrieval and manipulation.

```mermaid
graph LR
    A[Main Thread] <--> C[Database Worker Thread]
    C -->|Uses| I((TypeORM))
    I -->|Interacts with| D((SQLite WASM))
    A <--> E[LLM Thread]
    E -->|Interacts with| J((Langchain))
    J -->|Wraps| F((WebLLM))
    A <--> G[Embedding Thread]
    G -->|Interacts with| K((Langchain))
    K -->|Wraps| L((Embedding Model))
    G -->|Uses| H((Vector Database))
    L <--> H
    
    A -->|Interacts with| B((UI Application Logic))
```


## Getting Started

To get started with the Project, follow these steps:

1. **Clone the Repository**: 
   ```bash
   git clone git@github.com:zrg-team/NoLLMChat.git
   ```
2. **Install Dependencies**:
   ```bash
   cd NoLLMChat
   npm install
   ```
3. **Run the Development Server**:
   ```bash
   npm run dev
   ```
4. **Open in Browser**: Visit `http://localhost:3000` to start interacting with the AI assistant.

## Contributing

We welcome contributions from the community! Whether it's bug fixes, new features, or documentation improvements, your help is appreciated. Please check our [contribution guidelines](https://github.com/zrg-team/NoLLMChat/blob/main/CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/yourusername/ai-web-assistant/blob/main/LICENSE) file for more details.

## Contact

For questions, feedback, or suggestions, feel free to open an issue on GitHub or contact us at [zerglingno2@outlook.com](mailto:zerglingno2@outlook.com).
