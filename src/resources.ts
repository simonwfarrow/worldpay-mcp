import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import fs from 'fs/promises';
import path from 'path';
import { blob } from "stream/consumers";

export function setupResources(server: McpServer) {
    

    
    server.resource(
        "worldpay-sdk-style",
        "worldpay-images://sdk-style",
        async (uri: URL) => {
            try {
               
                const filePath = '/Users/Simon/Projects/llms/mcps/worldpay-mcp/.cache/card_form.png';
                    
                // Read and base64 encode the image file
                const content = await fs.readFile(filePath).then(buffer => buffer.toString('base64'));

                return {
                    contents: [{
                        uri: uri.href,
                        blob: content,
                        mimeType: 'image/png;base64'
                    }]
                };
            } catch (error) {
                if (error instanceof Error) {
                    return {
                        contents: [{
                            uri: uri.href,
                            text: `Error reading Worldpay payments api integration documentation: ${error.message}`,
                            mimeType: 'text/plain'
                        }],
                        isError: true
                    };
                }
                throw error;
            }
        }
    );
} 


       