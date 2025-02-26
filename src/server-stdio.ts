import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fetch from 'node-fetch';

// Add this type definition near the top of the file
type WorldpayResponse = {
  outcome: string;
  transactionReference: string;
};

// Add this type definition near the top with the other types
type Payment = {
  timestamp: string;
  transactionReference: string;
  transactionType: string;
  authorizationType: string;
  entity: string;
  value: {
    currency: string;
    amount: number;
  };
};

// Add with other type definitions
type QueryResponse = {
  _embedded: {
    payments: Payment[];
  };
};

// Create an MCP server
const server = new McpServer({
  name: "Worldpay",
  version: "1.0.0"
});

// Payment tool schema
const paymentSchema = {
  cardHolderName: z.string(),
  cardNumber: z.string(),
  expiryMonth: z.number().min(1).max(12),
  expiryYear: z.number(),
  cvc: z.string(),
  amount: z.number(),
  currency: z.string().default("GBP"),
  // Basic billing address fields
  address1: z.string(),
  city: z.string(),
  postalCode: z.string(),
  countryCode: z.string()
};

// Add payment tool
server.tool("makePayment",
  paymentSchema,
  async (params) => {
    try {
      const paymentRequest = {
        transactionReference: `TR-${Date.now()}`,
        merchant: {
          entity: "default"
        },
        instruction: {
          method: "card",
          paymentInstrument: {
            type: "plain",
            cardHolderName: params.cardHolderName,
            cardNumber: params.cardNumber,
            expiryDate: {
              month: params.expiryMonth,
              year: params.expiryYear
            },
            billingAddress: {
              address1: params.address1,
              city: params.city,
              postalCode: params.postalCode,
              countryCode: params.countryCode
            },
            cvc: params.cvc
          },
          narrative: {
            line1: "MCP Payment"
          },
          value: {
            currency: params.currency,
            amount: params.amount
          }
        }
      };

      // Make request to Worldpay API
      const response = await fetch('https://try.access.worldpay.com/api/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${Buffer.from(`${process.env.WORLDPAY_USERNAME}:${process.env.WORLDPAY_PASSWORD}`).toString('base64')}`,
          'WP-Api-Version': '2024-06-01'
        },
        body: JSON.stringify(paymentRequest)
      });

      console.log(response);
      const result = await response.json() as WorldpayResponse;

      // Return formatted response
      return {
        content: [{
          type: "text",
          text: `Payment ${result.outcome}: Transaction Reference ${result.transactionReference}`
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text", 
          text: `Payment failed: ${(error as Error).message}`
        }]
      };
    }
  }
);

// Add the query tool after the makePayment tool
server.tool("queryPayments",
  {
    startDate: z.string(),
    endDate: z.string(),
    pageSize: z.number().optional().default(20),
    currency: z.string().optional(),
  },
  async (params) => {
    try {
      const queryParams = new URLSearchParams({
        startDate: params.startDate,
        endDate: params.endDate,
        pageSize: params.pageSize.toString(),
        ...(params.currency && { currency: params.currency })
      });

      const response = await fetch(
        `https://try.access.worldpay.com/paymentQueries/payments?${queryParams}`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/vnd.worldpay.payment-queries-v1.hal+json',
            'Authorization': `Basic ${Buffer.from(`${process.env.WORLDPAY_USERNAME}:${process.env.WORLDPAY_PASSWORD}`).toString('base64')}`
          }
        }
      );

      const result = await response.json() as QueryResponse;
      const payments = result._embedded?.payments || [];

      // Create table header
      const table = [
        "| Date | Reference | Type | Auth Type | Currency | Amount |",
        "|------|-----------|------|-----------|----------|---------|"
      ];

      // Add each payment as a row
      payments.forEach((payment: Payment) => {
        const date = new Date(payment.timestamp).toLocaleDateString();
        table.push(
          `| ${date} | ${payment.transactionReference} | ${payment.transactionType} | ${payment.authorizationType} | ${payment.value.currency} | ${payment.value.amount} |`
        );
      });

      return {
        content: [{
          type: "text",
          text: table.join('\n')
        }]
      };
    } catch (error) {
      return {
        content: [{
          type: "text",
          text: `Query failed: ${(error as Error).message}`
        }]
      };
    }
  }
);

// Connect using StdioServerTransport
const transport = new StdioServerTransport();
await server.connect(transport); 