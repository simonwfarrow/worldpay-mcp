import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
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
  
  // Create an MCP server with all capabilities
  export const server = new McpServer({
    name: "Worldpay",
    version: "1.0.0"
  }, {
    capabilities: {
      prompts: {},
      resources: {},
      tools: {}
    }
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

  const checkoutFormSchema = {
    checkoutId: z.string(),
    framework: z.enum(["web", "react"]),
  }

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
          isError: true,
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
          isError: true,
          content: [{
            type: "text",
            text: `Query failed: ${(error as Error).message}`
          }]
        };
      }
    }
  );

  //ts-ignore

  // Generate checkout form tool
  server.tool("generateCheckoutForm",
    checkoutFormSchema,
    async (params) => {
      try {
        const component = params.framework === "web" 
          ? 
          `<section class="container">
              <section class="card">
                  <form class="checkout" id="card-form">
                      <div class="label">Card number <span class="type"></span></div>
                      <section id="card-pan" class="field"></section>
                      <section class="col-2">
                          <section class="col">
                              <div class="label">Expiry date</div>
                              <section id="card-expiry" class="field"></section>
                          </section>
                          <section class="col">
                              <div class="label">CVV</div>
                              <section id="card-cvv" class="field"></section>
                          </section>
                      </section>
                      <button class="submit" type="submit">Pay Now</button>
                  </form>
                  <button class="clear" id="clear">Clear</button>
              </section>
          </section>

          <script src="https://try.access.worldpay.com/access-checkout/v2/checkout.js"></script>` 

         : `import React, {useEffect, useLayoutEffect} from "react";
            import "./CheckoutIntegrationSample.css";

            function scriptAlreadyLoaded(src) {
              return document.querySelector(\`script[src="\${src}"]\`);
            }

            function loadCheckoutScript(src) {
              return new Promise((resolve, reject) => {
                if (scriptAlreadyLoaded(src)) {
                  resolve();
                  return;
                }

                let checkoutScript = document.createElement("script");
                checkoutScript.src = src;
                checkoutScript.onload = resolve;
                checkoutScript.onerror = reject;
                document.head.appendChild(checkoutScript);
              });
            }

            function addWorldpayCheckoutToPage() {
              return new Promise((resolve, reject) => {
                (function () {
                  window.Worldpay.checkout.init(
                    {
                      id: "your-checkout-id",
                      form: "#container",
                      fields: {
                        pan: {
                          selector: "#card-pan",
                        },
                        expiry: {
                          selector: "#card-expiry",
                        },
                        cvv: {
                          selector: "#card-cvv",
                        },
                      },
                      styles: {
                        "input.is-valid": {
                          "color": "green",
                        },
                        "input.is-invalid": {
                          "color": "red",
                        },
                        "input.is-onfocus": {
                          "color": "black",
                        },
                      },
                      enablePanFormatting: true,
                    },
                    function (error, checkout) {
                      if (error) {
                        reject(error);
                      } else {
                        resolve(checkout);
                      }
                    },
                  );
                })();
              });
            }

            function CheckoutIntegrationSample() {
              const checkoutScriptUrl = "https://try.access.worldpay.com/access-checkout/v2/checkout.js";
              let checkout;

              function generateSession () {
                checkout.generateSessionState(
                  function (error, session) {
                    if (error) {
                      console.warn(\`Failed to generate session: \${error}\`);
                      return;
                    }

                    const infoDiv = document.querySelector(".info");
                    infoDiv.innerHTML += \`<div>Session retrieved is \${session}</div>\`;
                  });
              }

              function clearForm () {
                checkout.clearForm(() => {
                  document.querySelector(".info").innerHTML = "";
                });
              }

              useEffect(() => {
                loadCheckoutScript(checkoutScriptUrl)
                  .then(() => {
                    addWorldpayCheckoutToPage()
                      .then((checkoutInstance) => {
                        checkout = checkoutInstance;
                      })
                      .catch(console.warn);
                  })
                  .catch(console.warn);
              }, []);

              useLayoutEffect(() => {
                // Make sure to call the remove method (once) in order to deallocate the SDK from memory
                return () => checkout.remove();
              },
                []);

              return (
                <section className="container" id="container">
                  <section className="card">
                    <section id="card-pan" className="field" />
                    <section className="columns">
                    <section>
                    <section id="card-expiry" className="field" />
                    </section>
                    <section>
                    <section id="card-cvv" className="field" />
                    </section>
                    </section>
                    <section className="buttons">
                      <button className="submit" type="button" onClick={generateSession}>
                        Generate Session
                      </button>
                      <button className="clear" type="button" onClick={clearForm}>
                        Clear
                      </button>
                    </section>
                  </section>
                  <div id="info" className="info" />
                </section>
              );
            }

            export default CheckoutIntegrationSample;`
        
        const styling = params.framework === "web" ? `body {
  font: 11px/22px sans-serif;
  text-transform: uppercase;
  background-color: #f7f7f7;
  color: black;
}

.container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  position: relative;
  background: white;
  padding: 40px 30px;
  top: -30px;
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 3px 3px 60px 0px rgba(0, 0, 0, 0.1);
}
.card .checkout .col-2 {
  display: flex;
}
.card .checkout .col-2 .col:first-child {
  margin-right: 15px;
}
.card .checkout .col-2 .col:last-child {
  margin-left: 15px;
}
.card .checkout .label .type {
  color: green;
}
.card .checkout.visa .label .type:before {
  content: "(visa)";
}
.card .checkout.mastercard .label .type:before {
  content: "(master card)";
}
.card .checkout.amex .label .type:before {
  content: "(american express)";
}
.card .checkout .field {
  height: 40px;
  border-bottom: 1px solid lightgray;
}
.card .checkout .field#card-pan {
  margin-bottom: 30px;
}
.card .checkout .field.is-onfocus {
  border-color: black;
}
.card .checkout .field.is-empty {
  border-color: orange;
}
.card .checkout .field.is-invalid {
  border-color: red;
}
.card .checkout .field.is-valid {
  border-color: green;
}
.card .checkout .submit {
  background: red;
  position: absolute;
  cursor: pointer;
  left: 50%;
  bottom: -60px;
  width: 200px;
  margin-left: -100px;
  color: white;
  outline: 0;
  font-size: 14px;
  border: 0;
  border-radius: 30px;
  text-transform: uppercase;
  font-weight: bold;
  padding: 15px 0;
  transition: background 0.3s ease;
}
.card .checkout.is-valid .submit {
  background: green;
}

.clear {
  background: grey;
  position: absolute;
  cursor: pointer;
  left: 50%;
  bottom: -120px;
  width: 200px;
  margin-left: -100px;
  color: white;
  outline: 0;
  font-size: 14px;
  border: 0;
  border-radius: 30px;
  text-transform: uppercase;
  font-weight: bold;
  padding: 15px 0;
  transition: background 0.3s ease;
}` : `.container {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.card {
  background: white;
  padding: 20px 30px;
  top: -30px;
  width: 100%;
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 3px 3px 60px 0px rgba(0, 0, 0, 0.1);
}

.columns {
  display: flex;
}

.columns > * {
  margin-right: 15px;
}

.field {
  height: 40px;
  border-bottom: 1px solid lightgray;
}

.field.is-onfocus {
  border-color: black;
}

.field.is-empty {
  border-color: orange;
}

.field.is-invalid {
  border-color: red;
}

.field.is-valid {
  border-color: green;
}

#card-pan {
  margin-bottom: 30px;
}

.submit {
  background: green;
  cursor: pointer;
  width: 200px;
  margin-top:30px;
  color: white;
  outline: 0;
  font-size: 14px;
  border: 0;
  border-radius: 30px;
  text-transform: uppercase;
  font-weight: bold;
  padding: 15px 0;
  transition: background 0.3s ease;
  margin-right:20px;
}

.clear {
  background: green;
  cursor: pointer;
  width: 100px;
  margin-top:30px;
  color: white;
  outline: 0;
  font-size: 14px;
  border: 0;
  border-radius: 30px;
  text-transform: uppercase;
  font-weight: bold;
  padding: 15px 0;
  transition: background 0.3s ease;
}

.buttons {
  display: flex;
}

.info {
  width: 600px;
  word-wrap:break-word;
  margin-top: 20px;
  color: green;
}`

        const js = params.framework === "web" ? `(function () {
  var form = document.getElementById("card-form");
  var clear = document.getElementById("clear");
  Worldpay.checkout.init(
    {
      id: "your-checkout-id",
      form: "#card-form",
      fields: {
        pan: {
          selector: "#card-pan",
          placeholder: "4444 3333 2222 1111"
        },
        expiry: {
          selector: "#card-expiry",
          placeholder: "MM/YY"
        },
        cvv: {
          selector: "#card-cvv",
          placeholder: "123"
        }
      },
      styles: {
        "input": {
          "color": "black",
          "font-weight": "bold",
          "font-size": "20px",
          "letter-spacing": "3px"
        },
        "input#pan": {
          "font-size": "24px"
        },
        "input.is-valid": {
          "color": "green"
        },
        "input.is-invalid": {
          "color": "red"
        },
        "input.is-onfocus": {
          "color": "black"
        }
      },
      accessibility: {
        ariaLabel: {
          pan: "my custom aria label for pan input",
          expiry: "my custom aria label for expiry input",
          cvv: "my custom aria label for cvv input"
        },
        lang: {
          locale: "en-GB"
        },
        title: {
          enabled: true,
          pan: "my custom title for pan",
          expiry: "my custom title for expiry date",
          cvv: "my custom title for security code"
        }
      },
      acceptedCardBrands: ["amex", "diners", "discover", "jcb", "maestro", "mastercard", "visa"],
      enablePanFormatting: true
    },
    function (error, checkout) {
      if (error) {
        console.error(error);
        return;
      }

      form.addEventListener("submit", function (event) {
        event.preventDefault();

        checkout.generateSessionState(function (error, sessionState) {
          if (error) {
            console.error(error);
            return;
          }

          // session state for card details
          alert(sessionState);
        });
      });

      clear.addEventListener("click", function(event) {
        event.preventDefault();
        checkout.clearForm(function() {
          // trigger desired behaviour on cleared form
          console.log('Form successfully cleared');
        });
      });
    }
  );
})();`: ""
        // Return formatted response with both HTML and JavaScript
        return {
          content: [
            {
              type: "text",
              text: "Add this to a new checkout component:",
              mimeType: "text/plain"
            },
            {
              type: "text",
              text: component,
              mimeType: "text/html"
            },
            {
              type: "text",
              text: "\nAdd to the a CSS file and reference in the checkout component:",
              mimeType: "text/plain"
            },
            {
              type: "text",
              text: styling,
              mimeType: "text/css"
            },
            {
              type: "text",
              text: "\nAdd this to a new javsacript file and reference in the checkout component:",
              mimeType: "text/plain"
            },
            {
              type: "text",
              text: js,
              mimeType: "text/js"
            }
          ]
        };
      } catch (error) {
        return {
          content: [{
            isError: true,
            type: "text", 
            text: `Checkout creation failed: ${(error as Error).message}`
          }]
        };
      }
    }
  );