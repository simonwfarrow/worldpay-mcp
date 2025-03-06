import { z } from "zod";
import { server } from "./tools.js";

/**
 * This file contains prompts for the Worldpay MCP server.
 * These prompts guide users in building server-side implementations
 * of the Worldpay Payments API.
 */


//workflow prompt  
server.prompt(
  "worldpay-payments-api",
  {
    programmingLanguage: z.string().describe("Programming language and framework to use (e.g., 'node-express', 'java-spring')"),
  },
  ({ programmingLanguage }) => ({
    messages: [
        { 
            role: "user", 
            content: { 
                type: "text", 
                text: `Create a server side implementation of the Worldpay Payments API using the following programming language: ${programmingLanguage}.
Use the Worldpay MCP server tool guidedServerGeneration. This tool requires input parameters to guide you on which featuress of the API to implement, 
do not default these value but ask the user for their preferences. 
                `
            } 
        }
    ]
  })
);


// Export the server configuration to be used in server-sse.ts
export { server }; 