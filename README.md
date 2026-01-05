# Agent Boilerplate

A scalable boilerplate for building AI agents using **LangChain** and **Bun**. This project features a structured architecture, dynamic model configuration, and basic tool implementation.

## Features

- **LangChain Integration**: Built-in support for LangChain agents and tools.
- **Dynamic Configuration**: Switch between OpenAI and other providers (via `LLM_BASE_URL`) using environment variables.
- **Structured Architecture**: Organized `src/` directory with dedicated folders for agents, tools, repositories, and services.
- **TypeScript & Bun**: Fast runtime with native TypeScript support.
- **Dependabot**: Automated dependency updates configured.

## Prerequisites

- [Bun](https://bun.sh/) (v1.0.0 or later)

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd agent-boilerplate
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

## Configuration

1. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set your API key and model preferences:
   ```ini
   LLM_API_KEY=sk-...
   LLM_BASE_URL=https://api.openai.com/v1  # Optional: Defaults to OpenAI
   LLM_MODEL=gpt-4o                        # Optional: Defaults to gpt-4o
   ```

## Usage

Run the agent:

```bash
bun start
```

This will execute the `BootstrapAgent`, which demonstrates a simple interaction flow using a System Info tool.

## Project Structure

```
src/
├── agents/             # Agent logic (e.g., BootstrapAgent)
├── repositories/       # Data persistence layer
├── tools/              # LangChain tools (e.g., SystemInfoTool)
├── services/           # External API wrappers
├── types/              # Global TypeScript interfaces
├── utils/              # Helper functions
└── index.ts            # Main entry point
```

## Contributing

1. Fork the repo.
2. Create feature branch.
3. Submit Pull Request.
