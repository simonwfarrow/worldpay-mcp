import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./tools.js";
import { setupResources } from "./resources.js";

// Set up all capabilities
setupResources(server);

// Connect using StdioServerTransport
const transport = new StdioServerTransport();
await server.connect(transport); 