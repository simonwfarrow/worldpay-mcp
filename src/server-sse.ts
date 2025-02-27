import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import express from 'express';

import { server } from "./tools.js";
import { setupResources } from "./resources.js";


setupResources(server);

const app = express();
let transport: SSEServerTransport;

app.get("/sse", async (req, res) => {
  transport = new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

app.post("/messages", async (req, res) => {
  // Note: to support multiple simultaneous connections, these messages will
  // need to be routed to a specific matching transport. (This logic isn't
  // implemented here, for simplicity.)
  await transport.handlePostMessage(req, res);
});

app.listen(3001, () => {
    console.log("SSE server listening on port 3001");
});