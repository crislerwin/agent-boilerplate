import { runAgent } from "./agents/BootstrapAgent.ts";

console.log("Starting Agent Boilerplate...");

// Check for API Key
if (!process.env.OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY is not set in the environment.");
  console.error(
    "Please set it (e.g. 'export OPENAI_API_KEY=sk-...') and try again."
  );
  process.exit(1);
}

// Example interaction
await runAgent(
  "Can you tell me details about the current system execution environment?"
);
