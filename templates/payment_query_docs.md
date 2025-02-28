  Date range queries 

[

![Worldpay](https://developer.worldpay.com/products/access/payment-queries/query-by-date-range/assets/worldpay-logo-light.196ed5ebdbeb6076aa1857417a88717f7af58fe3240dcacfabad763bd62d269a.33f780a6.svg)![Worldpay](https://developer.worldpay.com/products/access/payment-queries/query-by-date-range/assets/worldpay-logo-dark.7b3e6f66ebcf82c8f1ae4f97cd16009773f7dcf93171531ae8b22338a7214a5c.33f780a6.svg)



](/)

[Docs](/)

[APIs](/apis)

[Release Notes](/products/access/releases)

[Service Status](https://status.access.worldpay.com/)

[Articles](/products/access/articles)

[All other Worldpay integrations](https://docs.worldpay.com/)

Search/

[

View API catalog

](/apis)

Version:

v1

-   v1
    

[-   Docs Home
    ](/)

-   API Reference
    

[-   Payment Queries
    ](/products/access/payment-queries/openapi)

[-   Query payments
    
    get
    ](/products/access/payment-queries/openapi/other/querybydaterange)

[-   Retrieve a payment
    
    get
    ](/products/access/payment-queries/openapi/other/retrievebypaymentid)

[-   Query historical payments
    
    get
    ](/products/access/payment-queries/openapi/other/queryarchivedpayments)

[-   Versioning and Change log
    ](/products/access/payment-queries/changelog)

-   Guides
    

[-   Get Started
    ](/products/access/payment-queries)

[-   Query within a date range
    ](/products/access/payment-queries/query-by-date-range)

[-   Query by transaction reference
    ](/products/access/payment-queries/query-by-trans-ref)

[-   Retrieve a payment
    ](/products/access/payment-queries/retrieve-by-payment-id)

[-   Query historical payments
    ](/products/access/payment-queries/query-archive)

-   Reference
    

[-   API Principles
    ](/products/access/reference/api-principles)

-   Security
    

[-   Supported Payment Methods
    ](/products/access/reference/supported-payment-methods)

[-   Currency/Country Codes
    ](/products/access/reference/supported-countries-currencies)

[-   Worldpay Error Responses
    ](/products/access/reference/worldpay-error-responses)

-   Refusal Response Codes
    

[-   Go live
    ](/products/access/reference/go-live)

[APIs](/apis)

/

[Payment Queries](/products/access/payment-queries/openapi)

/

Query within a date range

**Last Updated**: 18 November 2024 | [**Change Log**](/products/access/payment-queries/changelog/)

## [](#date-range-queries)Date range queries

Query card payments within a specified date time range.

Note

The API returns data for payments processed after 25 June 2024. For payments processed before then, you can [query for historical payments](/products/access/payment-queries/query-archive).

### [](#date-range-request)Date range request

Provide a `startDate` and `endDate` to query all payments within a date range. The `startDate` cannot be older than one year.  
  

`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate={startDate}&endDate={endDate}&pageSize={pageSize}`

#### [](#example)Example:

`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate=2023-02-12T21:30:20Z&endDate=2023-03-08T21:30:20Z&pageSize=20`

### [](#filter-by-currency)Filter by currency

Query for payments within a specified date time range filtered by the requested currency.  
  
`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate={startDate}&endDate={endDate}&pageSize={pageSize}&currency={currency}`

#### [](#example-1)Example:

`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate=2024-04-06T21:30:20Z&endDate=2024-04-30T21:30:20Z&pageSize=20&currency=GBP`

### [](#filter-by-minamount-maxamount)Filter by minAmount, maxAmount

Query payments within a specified date time range filtered by the `minAmount` and `maxAmount` for a specific currency.

-   `minAmount` - only payments with an amount above `minAmount` are included
-   `maxAmount` - only payments with an amount below `maxAmount` are included

The amount uses an exponent rather than decimal delimiters.

If supplied:

-   must be an integer greater than or equal to zero
-   you must supply the currency parameter

  

`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate={startDate}&endDate={endDate}&pageSize={pageSize}&minAmount={minAmount}&maxAmount={maxAmount}&currency={currency}`

#### [](#example-2)Example:

`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate=2023-02-12T21:30:20Z&endDate=2023-03-08T21:30:20Z&pageSize=20&minAmount=250&maxAmount=300&&currency=GBP`

### [](#filter-by-last-four-digits)Filter by last four digits

Query payments within a specified date time range filtered by the `last4Digits` of the card number.  
  
`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate={startDate}&endDate={endDate}&pageSize={pageSize}&last4Digits={last4Digits}`

#### [](#example-3)Example:

`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate=2023-02-12T21:30:20Z&endDate=2023-03-08T21:30:20Z&pageSize=20&last4Digits=1111`

### [](#filter-by-payment-event)Filter by payment event

Query payments within a specified date time range filtered by one or more `paymentEvents`.  
  
`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate={startDate}&endDate={endDate}&pageSize={pageSize}&receivedEvents={receivedEvents}`

#### [](#example-4)Example

`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate=2023-02-12T21:30:20Z&endDate=2023-03-08T21:30:20Z&pageSize=20&receivedEvents=authorizationRequested,refundRequested`

### [](#filter-by-entity-references)Filter by entity references

Query payments within a specified date time range filtered by one or more `entityReferences` (also known as `entity`).  
  
`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate={startDate}&endDate={endDate}&pageSize={pageSize}&entityReferences={entityReferences}`

#### [](#example-5)Example

`GET` `https://try.access.worldpay.com/paymentQueries/payments?startDate=2023-02-12T21:30:20Z&endDate=2023-03-08T21:30:20Z&pageSize=20&entityReferences=ref1,ref2`

### [](#parameter-descriptions)Parameter descriptions

Parameter

Required

Description

`startDate`

✅

An ISO 8601 date-time supplied as a string. Filters for payments that occurred after the specified date-time. Must be supplied alongside `endDate`.

`endDate`

✅

An ISO 8601 date-time supplied as a string. Filters for payments that occurred below the specified date-time. Must be supplied alongside `startDate`.

`pageSize`

❌

The maximum number of payments to be returned in the response. If supplied, must be a positive integer greater than 0 and less than or equal to 300.  
If not supplied, default value is 5.

`currency`

❌

The three digit [currency code](/products/access/reference/supported-countries-currencies#iso-currency-codes).

`minAmount`

❌

This is a whole number with an exponent, e.g. if exponent is two, 250 is 2.50. You can find the relevant exponent in our [currency table](/products/access/reference/supported-countries-currencies#iso-currency-codes).  
If supplied, must be an integer greater than or equal to 0.

`maxAmount`

❌

This is a whole number with an exponent, e.g. if exponent is two, 250 is 2.50. You can find the relevant exponent in our [currency table](/products/access/reference/supported-countries-currencies#iso-currency-codes).  
If supplied, must be an integer greater than or equal to 0.

`last4Digits`

❌

The last 4 digits of the card number. If supplied, must be a string with 4 digits.

`entityReferences`

❌

Merchant entity name. The request can be for a specific entity reference or can be grouped together as comma separated values.

Note

You might have supplied this as `entity` in your original payment request.

`receivedEvents`

❌

Name of the event. The request can be for a specific event name or can be grouped together as comma separated values. Default value is `All` which includes all events.Possible event values

-   `authorizationRequested`
-   `authorizationSucceeded`
-   `authorizationRefused`
-   `authorizationFailed`
-   `authorizationTimedOut`
-   `saleRequested`
-   `saleSucceeded`
-   `saleRefused`
-   `saleFailed`
-   `saleTimedOut`
-   `cancellationRequested`
-   `cancellationRequestSubmitted`
-   `cancellationRequestSubmissionFailed`
-   `cancellationRequestSubmissionTimedOut`
-   `settlementRequested`
-   `settlementRequestSubmitted`
-   `settlementRequestSubmissionFailed`
-   `settlementRequestSubmissionTimedOut`
-   `refundRequested`
-   `refundRequestSubmitted`
-   `refundRequestSubmissionFailed`
-   `refundRequestSubmissionTimedOut`
-   `reversalRequested`
-   `reversalRequestSubmitted`

### [](#response)Response

The response contains summary information about the payment associated with the request parameters. For detailed information about a payment you should run a [query using the `paymentId`](/products/access/payment-queries/retrieve-by-payment-id).

### [](#response-schema)Response schema

\_links*object*required

links to the pages.

\-

\_links.​self*object*required

Self link to the page.

\-

\_links.​self.​href*string*

First page as per the pageSize.

\_links.​next*object*

Next page link if the response contains more pages.

+Show property

\_embedded*object*required

\-

\_embedded.​payments*Array of objects*

Array of payments within the date range.

+Show 8 array properties

### [](#response-examples)Response examples

-   dateRange query without pageSize
-   dateRange query with pageSize
-   dateRange query with currency filter
-   error

{
    "\_links": {
        "self": {
            "href": "/paymentQueries/payments?startDate=2024-04-28T21:30:20Z&endDate=2024-04-30T21:30:20Z"
        },
        "next": {
            "href": "/paymentQueries/payments?startDate=2024-04-28T21:30:20Z&endDate=2024-04-30T09:28:08.298Z&paymentId=cbe79beb-4555-4847-9789-c854cbc29f7e"
        }
    },
    "\_embedded": {
        "payments": \[
            {
                "timestamp": "2024-04-30T16:47:38.531Z",
                "transactionReference": "b00959d7-6bbf-49da-9d5e-a25fdd812447",
                "transactionType": "cardOnFile",
                "authorizationType": "authorization",
                "entity": "default",
                "paymentInstrument": {
                    "type": "card/plain+masked",
                    "card": {
                        "number": {
                            "last4Digits": "1000"
                        },
                        "brand": "visa",
                        "fundingType": "debit"
                    }
                },
                "value": {
                    "currency": "GBP",
                    "amount": 42
                },
                "\_links": {
                    "self": {
                        "href": "/paymentQueries/payments/db6bb0dc-8930-4d65-a292-551a6bfab3c0"
                    }
                }
            },
            {
                "timestamp": "2024-04-30T16:23:55.677Z",
                "transactionReference": "135ab8fe-cdad-4362-ae48-9649b60493b0",
                "transactionType": "cardOnFile",
                "authorizationType": "authorization",
                "entity": "default",
                "paymentInstrument": {
                    "type": "card/plain"
                },
                "value": {
                    "currency": "GBP",
                    "amount": 42
                },
                "\_links": {
                    "self": {
                        "href": "/paymentQueries/payments/9ac6c4b0-0722-4c69-9ac5-4eb37939af48"
                    }
                }
            },
            {
                "timestamp": "2024-04-30T16:11:05.230Z",
                "transactionReference": "52344b23-9641-402c-896d-78d7a586effd",
                "transactionType": "cardOnFile",
                "authorizationType": "authorization",
                "entity": "default",
                "paymentInstrument": {
                    "type": "card/plain"
                },
                "value": {
                    "currency": "GBP",
                    "amount": 42
                },
                "\_links": {
                    "self": {
                        "href": "/paymentQueries/payments/9fb4b094-9f89-4e06-b92e-ff6b9336f385"
                    }
                }
            },
            {
                "timestamp": "2024-04-30T16:08:31.625Z",
                "transactionReference": "5a696f5f-38f6-4a3c-8d2d-bd043b401676",
                "transactionType": "cardOnFile",
                "authorizationType": "authorization",
                "entity": "default",
                "paymentInstrument": {
                    "type": "card/plain"
                },
                "value": {
                    "currency": "GBP",
                    "amount": 42
                },
                "\_links": {
                    "self": {
                        "href": "/paymentQueries/payments/29e9b685-2c59-4484-9ac7-a45d3760c593"
                    }
                }
            },
            {
                "timestamp": "2024-04-30T09:28:08.298Z",
                "transactionReference": "1ca9d3e1-01f0-4ced-85eb-9028026f4a44",
                "transactionType": "oneTime",
                "authorizationType": "authorization",
                "entity": "default",
                "paymentInstrument": {
                    "type": "card/plain+masked",
                    "card": {
                        "number": {
                            "last4Digits": "4444"
                        },
                        "brand": "mastercard",
                        "fundingType": "credit"
                    }
                },
                "value": {
                    "currency": "GBP",
                    "amount": 650
                },
                "\_links": {
                    "self": {
                        "href": "/paymentQueries/payments/cbe79beb-4555-4847-9789-c854cbc29f7e"
                    }
                }
            }
        \]
    }
}

#### Do you like our page?

On this page

[Date range queries](#date-range-queries)[Date range request](#date-range-request)[Filter by currency](#filter-by-currency)[Filter by minAmount, maxAmount](#filter-by-minamount-maxamount)[Filter by last four digits](#filter-by-last-four-digits)[Filter by payment event](#filter-by-payment-event)[Filter by entity references](#filter-by-entity-references)[Parameter descriptions](#parameter-descriptions)[Response](#response)[Response schema](#response-schema)[Response examples](#response-examples)

![](https://developer.worldpay.com/products/access/payment-queries/query-by-date-range/images/privacy-cookies.svg)Your Privacy Choices

©2025 Worldpay, LLC and/or its affiliates. All rights reserved.

[Worldpay](https://www.worldpay.com)

[Terms of use](https://www.worldpay.com/terms-of-use)

[Privacy](https://www.worldpay.com/privacy)

[Cookies](https://www.worldpay.com/cookies)

[Contact us](https://www.worldpay.com/en-GB/merchant-support#still-need-help)

  Query historical payments 

[

![Worldpay](https://developer.worldpay.com/products/access/payment-queries/openapi/other/queryarchivedpayments/assets/worldpay-logo-light.196ed5ebdbeb6076aa1857417a88717f7af58fe3240dcacfabad763bd62d269a.33f780a6.svg)![Worldpay](https://developer.worldpay.com/products/access/payment-queries/openapi/other/queryarchivedpayments/assets/worldpay-logo-dark.7b3e6f66ebcf82c8f1ae4f97cd16009773f7dcf93171531ae8b22338a7214a5c.33f780a6.svg)



](/)

[Docs](/)

[APIs](/apis)

[Release Notes](/products/access/releases)

[Service Status](https://status.access.worldpay.com/)

[Articles](/products/access/articles)

[All other Worldpay integrations](https://docs.worldpay.com/)

Search/

[

View API catalog

](/apis)

Version:

v1

-   v1
    

[-   Docs Home
    ](/)

-   API Reference
    

[-   Payment Queries
    ](/products/access/payment-queries/openapi)

[-   Query payments
    
    get
    ](/products/access/payment-queries/openapi/other/querybydaterange)

[-   Retrieve a payment
    
    get
    ](/products/access/payment-queries/openapi/other/retrievebypaymentid)

[-   Query historical payments
    
    get
    ](/products/access/payment-queries/openapi/other/queryarchivedpayments)

[-   Versioning and Change log
    ](/products/access/payment-queries/changelog)

-   Guides
    

[-   Get Started
    ](/products/access/payment-queries)

[-   Query within a date range
    ](/products/access/payment-queries/query-by-date-range)

[-   Query by transaction reference
    ](/products/access/payment-queries/query-by-trans-ref)

[-   Retrieve a payment
    ](/products/access/payment-queries/retrieve-by-payment-id)

[-   Query historical payments
    ](/products/access/payment-queries/query-archive)

-   Reference
    

[-   API Principles
    ](/products/access/reference/api-principles)

-   Security
    

[-   Supported Payment Methods
    ](/products/access/reference/supported-payment-methods)

[-   Currency/Country Codes
    ](/products/access/reference/supported-countries-currencies)

[-   Worldpay Error Responses
    ](/products/access/reference/worldpay-error-responses)

-   Refusal Response Codes
    

[-   Go live
    ](/products/access/reference/go-live)

[APIs](/apis)

/

[Payment Queries](/products/access/payment-queries/openapi)

/

Query historical payments

# Payment Queries (1)

Query your payments data based on a variety of parameters

**Authentication**

Set your headers:

  Authorization: {your\_credentials}
  Accept: application/vnd.worldpay.payment-queries-v1.hal+json

Replace `{your_credentials}` with your base64-encoded Basic Auth username and password.

  
  
**DNS Whitelisting**

Whitelist the following URLs:

-   `https://try.access.worldpay.com/`
-   `https://access.worldpay.com/`

Please ensure you use DNS whitelisting, not explicit IP whitelisting.

Download OpenAPI description

[openapi.json](/_spec/products/access/payment-queries/@v1/openapi.json?download)[](/_spec/products/access/payment-queries/@v1/openapi.json?download)

[openapi.yaml](/_spec/products/access/payment-queries/@v1/openapi.yaml?download)[](/_spec/products/access/payment-queries/@v1/openapi.yaml?download)

Languages

Servers

testing (try)

https://try.access.worldpay.com/

live

https://access.worldpay.com/

## [](/products/access/payment-queries/openapi/other/querybydaterange)Query payments

#### [](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/request)Request

Query payments within a specified date time range.

These payments can be filtered by currency, minAmount, maxAmount, last4Digits & receivedEvents.

The API returns data for payments processed after 25 June 2024. For payments processed before then use our [query for historical payments](/products/access/payment-queries/query-archive).

Security: BasicAuth

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/request/query)Query

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=query&path=startdate)startDate*string*required

An ISO 8601 date-time supplied as a string. Filters for payments that occurred after the specified date-time. Must be supplied alongside endDate.

Example: startDate=2024-04-28T21:30:20Z

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=query&path=enddate)endDate*string*required

An ISO 8601 date-time supplied as a string. Filters for payments that occurred below the specified date-time. Must be supplied alongside startDate.

Example: endDate=2024-05-31T21:30:20Z

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=query&path=pagesize)pageSize*string*

The maximum number of payments to be returned in the response (max 300).

Example: pageSize=10

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=query&path=currency)currency*string*

The three digit currency code.

Example: currency=GBP

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=query&path=minamount)minAmount*integer*

This is a whole number including the currency exponent (e.g. GBP has an exponent of 2, so for £2.50 supply:`250`).

Example: minAmount=0

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=query&path=maxamount)maxAmount*integer*

This is a whole number including the currency exponent (e.g. GBP has an exponent of 2, so for £2.50 supply:`250`).

Example: maxAmount=100

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=query&path=last4digits)last4Digits*string*

The last four digits of the card number.

Example: last4Digits=1111

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=query&path=entityreferences)entityReferences*string*

Merchant entity names.

Example: entityReferences=entityReference1,entityReference2

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=query&path=receivedevents)receivedEvents*string*

Name of the event.

Example: receivedEvents=authorizationRequested, authorizationSucceeded

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=query&path=transactionreference)transactionReference*string*

A unique reference generated by you, used to identify a payment throughout its lifecycle. This shouldn't be used in conjunction with the above fields. Use it as a single parameter to query data.

Example: transactionReference=Memory265-13/08/1876

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/request/header)Headers

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=request&in=header&path=accept)Accept*string*required

Example: application/vnd.worldpay.payment-queries-v1.hal+json

get

/paymentQueries/payments

-   testing (try) https://try.access.worldpay.com/paymentQueries/payments
    
-   live https://access.worldpay.com/paymentQueries/payments
    

Payload

-   Payload
-   curl
-   Python
-   Java
-   Node.js
-   Go
-   PHP
-   Ruby
-   C#

No request payload

Try it

#### [](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/response&c=200)Responses

1.  200

Expand all

Summary information of list of payments within a specified date range.

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/response&c=200/body)Bodyapplication/vnd.worldpay.payment-queries-v1.hal+json

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=response&c=200&path=_links)\_links*object*required

links to the pages.

\-

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=response&c=200&path=_links/self)self*object*required

Self link to the page.

+Show property

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=response&c=200&path=_links/next)next*object*

Next page link if the response contains more pages.

+Show property

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=response&c=200&path=_embedded)\_embedded*object*required

\-

[](/products/access/payment-queries/openapi/other/querybydaterange#other/querybydaterange/t=response&c=200&path=_embedded/payments)payments*Array of objects*

Array of payments within the date range.

+Show 8 array properties

Response

1.  200

application/vnd.worldpay.payment-queries-v1.hal+json

Query payments within a specified date time rangeQuery payments within a specified date time range filtered by currencyQuery payments within a specified date time range filtered by currency, amountQuery payments within a specified date time range filtered by last4DigitsQuery payments within a specified date time range filtered by receivedEventsQuery payments within a specified date time range filtered by entityReferencesRetrieve a payment by paymentIdQuery payments by transactionReferenceQuery historical payments with a transactionReference & entityReferenceQuery payments within a specified date time range

Query payments within a specified date time range

{
  "\_links": {
    "self": {
      "href": "/paymentQueries/payments?startDate=2024-04-28T21:30:20Z&endDate=2024-05-31T21:30:20Z&pageSize=5"
    },
    "next": {
      "href": "/paymentQueries/payments?startDate=2024-04-28T21:30:20Z&endDate=2024-05-30T09:49:31.410Z&paymentId=44809b32-6b71-4bd0-9b8c-ac29beb65059&pageSize=5"
    }
  },
  "\_embedded": {
    "payments": \[
      {
        "timestamp": "2024-05-30T19:44:19.836Z",
        "transactionReference": "Memory265-13/08/1876",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain+masked",
          "card": { … }
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:50:17.051Z",
        "transactionReference": "Memory265-13/08/1876",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/network"
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:49:49.843Z",
        "transactionReference": "7a5d0292-251f-48ed-a5c0-13c4c78d4487",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain+masked",
          "card": { … }
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:49:45.962Z",
        "transactionReference": "89197aeb-c94a-456e-8014-1272fbcb64eb",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain"
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:49:31.410Z",
        "transactionReference": "db0eea07-cd96-417f-8f78-90cc3908c81b",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain+masked",
          "card": { … }
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      }
    \]
  }
}

#### Do you like our page?

## [](/products/access/payment-queries/openapi/other/retrievebypaymentid)Retrieve a payment

#### [](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/request)Request

Retrieve a payment by payment ID.

The API returns detailed data for payments processed after 25 June 2024. For payments processed before then use our [query for historical payments](/products/access/payment-queries/query-archive).

Security: BasicAuth

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/request/path)Path

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=request&in=path&path=paymentid)paymentId*string*required

Unique paymentId generated for each payment

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/request/header)Headers

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=request&in=header&path=accept)Accept*string*required

Example: application/vnd.worldpay.payment-queries-v1.hal+json

get

/paymentQueries/payments/{paymentId}

-   testing (try) https://try.access.worldpay.com/paymentQueries/payments/{paymentId}
    
-   live https://access.worldpay.com/paymentQueries/payments/{paymentId}
    

Payload

-   Payload
-   curl
-   Python
-   Java
-   Node.js
-   Go
-   PHP
-   Ruby
-   C#

No request payload

Try it

#### [](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/response&c=200)Responses

1.  200

Expand all

Retrieve complete details of a payment including the event history & next action links.

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/response&c=200/body)Bodyapplication/vnd.worldpay.payment-queries-v1.hal+json

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=timestamp)timestamp*string*

Payment initial authorization time.

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=transactionreference)transactionReference*string*

A unique reference generated by you, used to identify a payment throughout its lifecycle.

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=narrative)narrative*object*

An object that contains identification and further details of the merchant.

\-

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=narrative/line1)line1*string*required

First line of text that appears on your customer's statement.

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=narrative/line2)line2*string*

Second line of text that appears on your customer's statement.

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=transactiontype)transactionType*string*

An object that contains transaction type.

Enum"oneTime""cardOnFile""recurring"

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=authorizationtype)authorizationType*string*

An object that contains authorization type.

Enum"authorization""sale"

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=entity)entity*string*

Merchant entity name.

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=paymentinstrument)paymentInstrument*object*

An object that contains information about the payment type.

\-

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=paymentinstrument/type)type*string*

An object that contains information about the payment type.

Enum"card/plain""card/network""card/networkToken""card/networkToken+applepay""card/networkToken+googlepay""card/plain+masked"

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=paymentinstrument/card)card*object*

An object that contains information about the card used.

+Show 3 properties

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=value)value*object*

An object that contains payment amount and currency.

\-

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=value/amount)amount*integer*required

This is a whole number including the currency exponent (e.g. GBP has an exponent of 2, so for £2.50 supply:`250`)

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=value/currency)currency*string*required

The 3 digit currency code.

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=events)events*Array of objects*

An array that contains the history of events of a payment.

\-

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=events/eventname)eventName*string*

Name of the event.

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=events/timestamp)timestamp*string*

The time when the event is created.

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=events/outcome)outcome*string*

Outcome of the event.

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=_links)\_links*object*

Self link and next action links.

\-

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=_links/self)self*object*required

Self link to the page.

+Show property

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=_links/payments:cancel)payments:cancel*object*

Next action links.

+Show property

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=_links/payments:events)payments:events*object*

Next action links.

+Show property

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=_links/payments:settle)payments:settle*object*

Next action links.

+Show property

[](/products/access/payment-queries/openapi/other/retrievebypaymentid#other/retrievebypaymentid/t=response&c=200&path=_links/payments:partialsettle)payments:partialSettle*object*

Next action links.

+Show property

Response

1.  200

application/vnd.worldpay.payment-queries-v1.hal+json

Query payments within a specified date time rangeQuery payments within a specified date time range filtered by currencyQuery payments within a specified date time range filtered by currency, amountQuery payments within a specified date time range filtered by last4DigitsQuery payments within a specified date time range filtered by receivedEventsQuery payments within a specified date time range filtered by entityReferencesRetrieve a payment by paymentIdQuery payments by transactionReferenceQuery historical payments with a transactionReference & entityReferenceQuery payments within a specified date time range

Query payments within a specified date time range

{
  "\_links": {
    "self": {
      "href": "/paymentQueries/payments?startDate=2024-04-28T21:30:20Z&endDate=2024-05-31T21:30:20Z&pageSize=5"
    },
    "next": {
      "href": "/paymentQueries/payments?startDate=2024-04-28T21:30:20Z&endDate=2024-05-30T09:49:31.410Z&paymentId=44809b32-6b71-4bd0-9b8c-ac29beb65059&pageSize=5"
    }
  },
  "\_embedded": {
    "payments": \[
      {
        "timestamp": "2024-05-30T19:44:19.836Z",
        "transactionReference": "Memory265-13/08/1876",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain+masked",
          "card": { … }
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:50:17.051Z",
        "transactionReference": "Memory265-13/08/1876",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/network"
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:49:49.843Z",
        "transactionReference": "7a5d0292-251f-48ed-a5c0-13c4c78d4487",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain+masked",
          "card": { … }
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:49:45.962Z",
        "transactionReference": "89197aeb-c94a-456e-8014-1272fbcb64eb",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain"
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:49:31.410Z",
        "transactionReference": "db0eea07-cd96-417f-8f78-90cc3908c81b",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain+masked",
          "card": { … }
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      }
    \]
  }
}

#### Do you like our page?

## [](/products/access/payment-queries/openapi/other/queryarchivedpayments)Query historical payments

#### [](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/request)Request

Query payments processed before 25 June 2024.

Provide a `transactionReference` and `entityReference` for a payment to find the payment matching that information in the archive.

Security: BasicAuth

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/request/query)Query

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/t=request&in=query&path=transactionreference)transactionReference*string*required

A unique reference generated by you, used to identify a payment throughout its lifecycle.

Example: transactionReference=89197aeb-c94a-456e-8014-1272fbcb64eb

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/t=request&in=query&path=entityreference)entityReference*string*required

A merchant entity.

Example: entityReference=testEntity

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/request/header)Headers

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/t=request&in=header&path=accept)Accept*string*required

Example: application/vnd.worldpay.payment-queries-v1.hal+json

get

/paymentQueries/archivedPayments

-   testing (try) https://try.access.worldpay.com/paymentQueries/archivedPayments
    
-   live https://access.worldpay.com/paymentQueries/archivedPayments
    

Payload

-   Payload
-   curl
-   Python
-   Java
-   Node.js
-   Go
-   PHP
-   Ruby
-   C#

No request payload

Try it

#### [](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/response&c=200)Responses

1.  200

Expand all

Summary information of a payment.

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/response&c=200/body)Bodyapplication/vnd.worldpay.payment-queries-v1.hal+json

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/t=response&c=200&path=_links)\_links*object*required

Self link and next action links.The Next action links are dependent on the lastEvent, refer to 'query for historical payments Response' section for more details.

\-

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/t=response&c=200&path=_links/self)self*object*required

Self link to the page.

+Show property

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/t=response&c=200&path=_links/payments:cancel)payments:cancel*object*

Next action links.

+Show property

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/t=response&c=200&path=_links/payments:settle)payments:settle*object*

Next action links.

+Show property

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/t=response&c=200&path=_links/payments:partialsettle)payments:partialSettle*object*

Next action links.

+Show property

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/t=response&c=200&path=_embedded)\_embedded*object*required

\-

[](/products/access/payment-queries/openapi/other/queryarchivedpayments#other/queryarchivedpayments/t=response&c=200&path=_embedded/payments)payments*Array of objects*

Array of payments.

+Show 3 array properties

Response

1.  200

application/vnd.worldpay.payment-queries-v1.hal+json

Query payments within a specified date time rangeQuery payments within a specified date time range filtered by currencyQuery payments within a specified date time range filtered by currency, amountQuery payments within a specified date time range filtered by last4DigitsQuery payments within a specified date time range filtered by receivedEventsQuery payments within a specified date time range filtered by entityReferencesRetrieve a payment by paymentIdQuery payments by transactionReferenceQuery historical payments with a transactionReference & entityReferenceQuery payments within a specified date time range

Query payments within a specified date time range

{
  "\_links": {
    "self": {
      "href": "/paymentQueries/payments?startDate=2024-04-28T21:30:20Z&endDate=2024-05-31T21:30:20Z&pageSize=5"
    },
    "next": {
      "href": "/paymentQueries/payments?startDate=2024-04-28T21:30:20Z&endDate=2024-05-30T09:49:31.410Z&paymentId=44809b32-6b71-4bd0-9b8c-ac29beb65059&pageSize=5"
    }
  },
  "\_embedded": {
    "payments": \[
      {
        "timestamp": "2024-05-30T19:44:19.836Z",
        "transactionReference": "Memory265-13/08/1876",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain+masked",
          "card": { … }
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:50:17.051Z",
        "transactionReference": "Memory265-13/08/1876",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/network"
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:49:49.843Z",
        "transactionReference": "7a5d0292-251f-48ed-a5c0-13c4c78d4487",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain+masked",
          "card": { … }
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:49:45.962Z",
        "transactionReference": "89197aeb-c94a-456e-8014-1272fbcb64eb",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain"
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      },
      {
        "timestamp": "2024-05-30T09:49:31.410Z",
        "transactionReference": "db0eea07-cd96-417f-8f78-90cc3908c81b",
        "transactionType": "oneTime",
        "authorizationType": "authorization",
        "entity": "AccessWP",
        "paymentInstrument": {
          "type": "card/plain+masked",
          "card": { … }
        },
        "value": {
          "currency": "GBP",
          "amount": 250
        },
        "\_links": {
          "self": { … }
        }
      }
    \]
  }
}

#### Do you like our page?

![](https://developer.worldpay.com/products/access/payment-queries/openapi/other/queryarchivedpayments/images/privacy-cookies.svg)Your Privacy Choices

©2025 Worldpay, LLC and/or its affiliates. All rights reserved.

[Worldpay](https://www.worldpay.com)

[Terms of use](https://www.worldpay.com/terms-of-use)

[Privacy](https://www.worldpay.com/privacy)

[Cookies](https://www.worldpay.com/cookies)

[Contact us](https://www.worldpay.com/en-GB/merchant-support#still-need-help)