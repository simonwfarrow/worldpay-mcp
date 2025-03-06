  Guest Card Payment | Payments API 

[

![Worldpay](https://developer.worldpay.com/products/access/payments/card-payment/assets/worldpay-logo-light.196ed5ebdbeb6076aa1857417a88717f7af58fe3240dcacfabad763bd62d269a.33f780a6.svg)![Worldpay](https://developer.worldpay.com/products/access/payments/card-payment/assets/worldpay-logo-dark.7b3e6f66ebcf82c8f1ae4f97cd16009773f7dcf93171531ae8b22338a7214a5c.33f780a6.svg)



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

2024-06-01 (Latest)

-   2024-06-01 (Latest)
    

[-   Docs Home
    ](/)

-   API Reference
    

[-   Payments API
    ](/products/access/payments/openapi)

[-   Submit a payment request
    
    post
    ](/products/access/payments/openapi/other/payment)

[-   3DS Actions
    ](/products/access/payments/openapi/3ds-actions)

[-   Payments Lifecycle
    ](/products/access/payments/openapi/payments-lifecycle)

[-   Versioning and Change log
    ](/products/access/payments/changelog)

-   Guides
    

[-   Get Started
    ](/products/access/payments)

[-   Sequence Diagrams
    ](/products/access/payments/sequence-diagrams)

[-   Postman Collection
    ](/products/access/payments/collections)

-   Use Cases
    

[-   Guest card payment
    ](/products/access/payments/card-payment)

[-   Card payment and store a card
    ](/products/access/payments/store-a-card)

[-   Use a stored card
    ](/products/access/payments/use-a-stored-card)

[-   Setup a recurring payment
    ](/products/access/payments/recurring-first)

[-   Subsequent recurring payment
    ](/products/access/payments/recurring-subsequent)

[-   Store a card only
    ](/products/access/payments/store-card-only)

[-   Pay using Google Pay
    ](/products/access/payments/google-pay)

[-   Pay using Apple Pay
    ](/products/access/payments/apple-pay)

-   Additional Features
    

[-   Testing
    ](/products/access/payments/testing)

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

[Payments API](/products/access/payments/openapi)

/

Use Cases

/

Guest card payment

**Last Updated**: 18 February 2025 | [**Change Log**](/products/access/payments/changelog/)

# [](#guest-card-payment)Guest card payment

Apply card details directly in our Payments API, or use our PCI-compliant Checkout SDK to take a one-time card payment.

If [PSD2/SCA or other regional mandates apply](/products/access/3ds-sca-exemptions#when-sca-applies) you should follow the steps for [enabling 3DS](/products/access/payments/enable-features/3ds-authentication)

  

-   API only
-   Checkout SDK

Collect the card details and send an API request with these details to the [`payments`](/products/access/payments/openapi/) resource.

## [](#example-request)Example request

-   Basic
-   Includes 3DS
-   Includes FraudSight

Response

1.  201
2.  202
3.  400
4.  401
5.  404
6.  406
7.  415
8.  500

application/json

authorized3dsDeviceDataRequiredfraudHighRiskrefusedauthorized

Example of an authorized response. Use the action `settlePayment` to complete the transaction

-   3DS is not enabled
-   includes fraud and token objects

{
  "outcome": "authorized",
  "transactionReference": "Memory265-13/08/1876",
  "issuer": {
    "authorizationCode": "675725"
  },
  "riskFactors": \[
    {
      "risk": "notChecked",
      "type": "cvc"
    },
    {
      "risk": "notChecked",
      "detail": "address",
      "type": "avs"
    },
    {
      "risk": "notChecked",
      "detail": "postcode",
      "type": "avs"
    }
  \],
  "fraud": {
    "outcome": "lowRisk",
    "score": 44.6
  },
  "token": {
    "href": "https://try.access.worldpay.com/tokens/eyJrIjoxLCJkIjoiRVl3SDBtNnpEVmVTR3UzRUV3VEJEVDExTkxuVDVydXNiREdLR01hUXUwVT0ifQ",
    "tokenId": "9968110159504301628",
    "tokenExpiryDateTime": "2024-04-11T15:59:23Z",
    "cardNumber": "4000\*\*\*\*\*\*\*\*1000",
    "cardHolderName": "test",
    "cardExpiry": {
      "year": 2035,
      "month": 5
    },
    "bin": "400000",
    "fundingType": "debit",
    "countryCode": "GB",
    "schemeReference": "060720116005060",
    "conflicts": {
      "conflictsExpiryDateTime": "2024-07-04T06:40:32.310316518Z",
      "paymentInstrument": {
        "cardHolderName": "John Snow"
      }
    }
  },
  "paymentInstrument": {
    "type": "card/plain+masked",
    "cardBin": "400000",
    "lastFour": "1000",
    "countryCode": "GB",
    "expiryDate": {
      "year": 2035,
      "month": 5
    },
    "cardBrand": "mastercard",
    "fundingType": "debit",
    "category": "consumer",
    "issuerName": "BANK LIMITED",
    "paymentAccountReference": "3001DBT34Q41D6J7PFC5W0UACOT4C"
  },
  "\_links": {
    "self": {
      "href": "https://try.access.worldpay.com/api/payments/eyJrIjoiazNhYjYzMiIsImxpbmtWZXJzaW9uIjoiNS4wLjAifQ%3D%3D.sN%3Ag8wd64bwkbrp0md%2BbPxcanBnk2zLdsIqSa1pR99GeDrCwEtsymFb5gQw9WlrStDTK3eIWPy93y%3A7njc4649JSrU7%2BvFDl1J36%2BcwOkX0lW4Z%2BfnZKMutoUGX3m1%3AmZ%2BxHZ9nDpadu%2BBh7pRyJwnWeiSFTlqKvbrBxNm3HV0xann55pFjZ7qi4DNGZtx9zW6eOLVNOsPL6ecsn3Dp377s7pWRQKSZJKSFIJvAisP8cBzFPzqireuqfCu5ojcm60gRSsqS3glurO24RJkg5SrpRjgY6g7ca8uoA7tKDk9OVOIwORF5sGPHSSGMa2bEl2lMUkAANoWclQHiGzxWQQ%3AAwSoo6RsrBugbhEp0K8HxZkfVrqy4oVlW8FdQ7kIuZOH78i6pPLzArc%2BOtMdnU%3ArZ%3AVhRHFzbbwymcuTiRbNw%3D"
    }
  },
  "\_actions": {
    "cancelPayment": {
      "href": "https://try.access.worldpay.com/api/payments/eyJrIjoiazNhYjYzMiIsImxpbmtWZXJzaW9uIjoiNS4wLjAifQ%3D%3D.sN%3Ag8wd64bwkbrp0md%2BbPxcanBnk2zLdsIqSa1pR99GeDrCwEtsymFb5gQw9WlrStDTK3eIWPy93y%3A7njc4649JSrU7%2BvFDl1J36%2BcwOkX0lW4Z%2BfnZKMutoUGX3m1%3AmZ%2BxHZ9nDpadu%2BBh7pRyJwnWeiSFTlqKvbrBxNm3HV0xann55pFjZ7qi4DNGZtx9zW6eOLVNOsPL6ecsn3Dp377s7pWRQKSZJKSFIJvAisP8cBzFPzqireuqfCu5ojcm60gRSsqS3glurO24RJkg5SrpRjgY6g7ca8uoA7tKDk9OVOIwORF5sGPHSSGMa2bEl2lMUkAANoWclQHiGzxWQQ%3AAwSoo6RsrBugbhEp0K8HxZkfVrqy4oVlW8FdQ7kIuZOH78i6pPLzArc%2BOtMdnU%3ArZ%3AVhRHFzbbwymcuTiRbNw%3D/cancellations",
      "method": "POST"
    },
    "settlePayment": {
      "href": "https://try.access.worldpay.com/api/payments/eyJrIjoiazNhYjYzMiIsImxpbmtWZXJzaW9uIjoiNS4wLjAifQ%3D%3D.sN%3Ag8wd64bwkbrp0md%2BbPxcanBnk2zLdsIqSa1pR99GeDrCwEtsymFb5gQw9WlrStDTK3eIWPy93y%3A7njc4649JSrU7%2BvFDl1J36%2BcwOkX0lW4Z%2BfnZKMutoUGX3m1%3AmZ%2BxHZ9nDpadu%2BBh7pRyJwnWeiSFTlqKvbrBxNm3HV0xann55pFjZ7qi4DNGZtx9zW6eOLVNOsPL6ecsn3Dp377s7pWRQKSZJKSFIJvAisP8cBzFPzqireuqfCu5ojcm60gRSsqS3glurO24RJkg5SrpRjgY6g7ca8uoA7tKDk9OVOIwORF5sGPHSSGMa2bEl2lMUkAANoWclQHiGzxWQQ%3AAwSoo6RsrBugbhEp0K8HxZkfVrqy4oVlW8FdQ7kIuZOH78i6pPLzArc%2BOtMdnU%3ArZ%3AVhRHFzbbwymcuTiRbNw%3D/settlements",
      "method": "POST"
    },
    "partiallySettlePayment": {
      "href": "https://try.access.worldpay.com/api/payments/eyJrIjoiazNhYjYzMiIsImxpbmtWZXJzaW9uIjoiNS4wLjAifQ%3D%3D.sN%3Ag8wd64bwkbrp0md%2BbPxcanBnk2zLdsIqSa1pR99GeDrCwEtsymFb5gQw9WlrStDTK3eIWPy93y%3A7njc4649JSrU7%2BvFDl1J36%2BcwOkX0lW4Z%2BfnZKMutoUGX3m1%3AmZ%2BxHZ9nDpadu%2BBh7pRyJwnWeiSFTlqKvbrBxNm3HV0xann55pFjZ7qi4DNGZtx9zW6eOLVNOsPL6ecsn3Dp377s7pWRQKSZJKSFIJvAisP8cBzFPzqireuqfCu5ojcm60gRSsqS3glurO24RJkg5SrpRjgY6g7ca8uoA7tKDk9OVOIwORF5sGPHSSGMa2bEl2lMUkAANoWclQHiGzxWQQ%3AAwSoo6RsrBugbhEp0K8HxZkfVrqy4oVlW8FdQ7kIuZOH78i6pPLzArc%2BOtMdnU%3ArZ%3AVhRHFzbbwymcuTiRbNw%3D/partialSettlements",
      "method": "POST"
    }
  }
}

[](/products/access/payments/openapi/other/payment#other/payment/request)

### [View the full API Request schema](/products/access/payments/openapi/other/payment#other/payment/request)

## [](#enable-additional-features)Enable additional features

Feature

Description

Details

**Fraud Assessment**

Prevent fraudulent transactions.

[How to enable](/products/access/payments/enable-features/fraud-assessment)

**3DS Authentication**

Shift Liability to the issuer / for EEA countries this is required as part of SCA compliance.

[How to enable](/products/access/payments/enable-features/3ds-authentication)

**SCA Exemptions**

Meet SCA compliance and reduce 3DS friction

[How to enable](/products/access/payments/enable-features/sca-exemptions)

**Auto Settlement**

Request that payment authorizations are automatically sent for settlement (sometimes referred to as "capture").

[How to enable](/products/access/payments/enable-features/auto-settlement)

**Financial Services  
(MCC 6012 / 6051)**

If you provide financial services, debt repayment, or consumer bill payments, you should supply additional details in the authorization request for compliance reasons.

[How to enable](/products/access/payments/enable-features/financial-services-mcc6012-mcc6051)

## [](#response)Response

### [](#flow-differences)Flow differences

API responses differ based on the features you have enabled:

-   If [3DS is enabled](/products/access/payments/enable-features/3ds-authentication) you will receive a [3dsDeviceDataRequired](/products/access/payments/openapi/other/payment#other/payment/response&c=201) outcome and additionally, if prompted by the card issuer, a [3dsChallenged](/products/access/payments/openapi/3ds-actions/supply3dsdevicedata#3ds-actions/supply3dsdevicedata/response&c=201) response.
    
-   If [FraudSight is enabled](/products/access/payments/enable-features/fraud-assessment), you can receive a [fraudHighRisk](/products/access/payments/openapi/other/payment#other/payment/response&c=201) response, stopping the transaction.
    
-   If `settlement.auto` is set to `true`, the outcome will be `sentForSettlement`. If set to `false` it will be `authorized` with an addtional settlement action required.
    
    -   If any of the [AVS/CVC response](/products/access/payments/openapi/other/payment#other/payment/t=response&c=201&path=&d=0/riskfactors) riskFactors are marked as `notMatched` the payment will be `sentForCancellation` automatically.

See [sequence diagrams](/products/access/payments/sequence-diagrams) to get a clear overview.

### [](#payment-response)Payment response

The payment response contains the following details:

-   [riskFactors](/products/access/payments/openapi/other/payment#other/payment/t=response&c=201&path=&d=0/riskfactors) (avs/cvc) - if billing address & cvc are provided, these details are checked against the customer's issuing bank
-   [refusal code](/products/access/reference/refusal-response) and description which gives additional context on the refusal
-   [3DS authentication details](/products/access/payments/enable-features/3ds-authentication/web#outcome-details) - details on the 3DS authentication outcome (e.g. challenged)
-   [fraud assessment details](/products/access/payments/enable-features/fraud-assessment#outcome-details) - details on the fraud assessment outcome (e.g. lowRisk, review)
-   Worldpay token creation - details of the card tokenized and the `token href` itself
-   paymentInstrument - details of the paymentInstrument used

  

[](/products/access/payments/openapi/other/payment#other/payment/response&c=201)

### [View the full API Response schema](/products/access/payments/openapi/other/payment#other/payment/response&c=201)

#### Do you like our page?

![](https://developer.worldpay.com/products/access/payments/card-payment/images/privacy-cookies.svg)Your Privacy Choices

©2025 Worldpay, LLC and/or its affiliates. All rights reserved.

[Worldpay](https://www.worldpay.com)

[Terms of use](https://www.worldpay.com/terms-of-use)

[Privacy](https://www.worldpay.com/privacy)

[Cookies](https://www.worldpay.com/cookies)

[Contact us](https://www.worldpay.com/en-GB/merchant-support#still-need-help)