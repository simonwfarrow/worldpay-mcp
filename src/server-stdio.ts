import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { server } from "./tools.js";

// Connect using StdioServerTransport
const transport = new StdioServerTransport();
await server.connect(transport); 