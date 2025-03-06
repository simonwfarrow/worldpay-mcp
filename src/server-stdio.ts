import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./tools.js";
import { setupResources } from "./resources.js";
// Import prompts to ensure they are registered
import "./prompts.js";

// Set up all capabilities
setupResources(server);

// Connect using StdioServerTransport
const transport = new StdioServerTransport();
await server.connect(transport); 