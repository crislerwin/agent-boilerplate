import { ChatOpenAI } from "@langchain/openai";
import { type BaseMessage, HumanMessage } from "@langchain/core/messages";
import { SystemInfoTool } from "../tools/SystemInfoTool.ts";

// Define the state interface if using LangGraph, but for a "simple agent"
// with standard LangChain, we might just use an AgentExecutor or similar.
// However, modern LangChain recommends LangGraph.
// The user asked for "simple ai agent using langchain".
// To allow it to be simple but extensible, I'll essentially create a runnable
// that uses tool calling.

const model = new ChatOpenAI({
  model: "gpt-4o",
  temperature: 0,
});

const tools = [new SystemInfoTool()];
const modelWithTools = model.bindTools(tools);

export async function runAgent(userInput: string) {
  console.log(`User: ${userInput}`);

  const messages: BaseMessage[] = [new HumanMessage(userInput)];

  // First call to the model
  const aiMessage = await modelWithTools.invoke(messages);
  messages.push(aiMessage);

  // Check for tool calls
  if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0) {
    console.log("Agent decided to call tools:", aiMessage.tool_calls);

    for (const toolCall of aiMessage.tool_calls) {
      const selectedTool = tools.find((t) => t.name === toolCall.name);
      if (selectedTool) {
        console.log(`Executing ${toolCall.name}...`);
        const toolOutput = await selectedTool.invoke(toolCall.args);
        console.log(`Tool Output: ${toolOutput}`);

        // Add tool message back to history (Manual tool calling loop for simplicity)
        // In a real app we'd use LangGraph or AgentExecutor
        // but this shows the "logic" clearly for a boilerplate.
        // Actually, let's use a simpler "createToolCallingAgent" if sticking to basic LC,
        // or just manual tool loop for transparency.
        // Let's stick to this manual loop for a VERY simple demonstration
        // that creates a final response.

        // NOTE: We need to import ToolMessage to properly add it
        const { ToolMessage } = await import("@langchain/core/messages");
        messages.push(
          new ToolMessage({
            tool_call_id: toolCall.id!,
            content: toolOutput,
          })
        );
      }
    }

    // Final call to model to summarize
    const finalResponse = await modelWithTools.invoke(messages);
    console.log("Agent:", finalResponse.content);
    return finalResponse.content;
  } else {
    console.log("Agent:", aiMessage.content);
    return aiMessage.content;
  }
}
