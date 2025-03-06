  3DS Authentication | Payments API 

[

![Worldpay](https://developer.worldpay.com/products/access/payments/enable-features/3ds-authentication/assets/worldpay-logo-light.196ed5ebdbeb6076aa1857417a88717f7af58fe3240dcacfabad763bd62d269a.33f780a6.svg)![Worldpay](https://developer.worldpay.com/products/access/payments/enable-features/3ds-authentication/assets/worldpay-logo-dark.7b3e6f66ebcf82c8f1ae4f97cd16009773f7dcf93171531ae8b22338a7214a5c.33f780a6.svg)



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
    

-   Additional Features
    

[-   3DS Authentication
    ](/products/access/payments/enable-features/3ds-authentication)

[-   Web
    ](/products/access/payments/enable-features/3ds-authentication/web)

[-   Android and iOS
    ](/products/access/payments/enable-features/3ds-authentication/android-ios)

[-   React Native
    ](/products/access/payments/enable-features/3ds-authentication/react-native)

[-   SCA Exemptions
    ](/products/access/payments/enable-features/sca-exemptions)

[-   Fraud Assessment
    ](/products/access/payments/enable-features/fraud-assessment)

[-   Auto Settlement
    ](/products/access/payments/enable-features/auto-settlement)

[-   Payment Facilitator
    ](/products/access/payments/enable-features/payment-facilitator)

[-   Financial Services (including MCC6012 & MCC6051)
    ](/products/access/payments/enable-features/financial-services-mcc6012-mcc6051)

[-   Latin America Installments
    ](/products/access/payments/enable-features/latam-installments)

[-   MOTO (Mail Order/Telephone Order)
    ](/products/access/payments/enable-features/moto)

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

Additional Features

/

[3DS Authentication](/products/access/payments/enable-features/3ds-authentication)

# [](#3ds-authentication)3DS Authentication

## [](#how-to-enable)How to enable

Using the `instruction.threeDS` object and setting the `type` value to `integrated` will enable a 3DS authentication to run as part of the payment request.

-   3DS authentication is only available for `instruction.method` = `card` and will return a validation error response if used with others.

## [](#threeds-object-example)threeDS object example

To understand which values improve authentication rates see ["Additional values to used by the assessment"](#additional-values-used-by-the-assessment).

"instruction": {
  ....
  "threeDS": {
    "type": "integrated",
    "mode": "always",
    "challenge": {
      "returnUrl": "http://payment.example.com",
    },
    "deviceData": {
      "acceptHeader": "text/html",
      "userAgentHeader": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0)",
      "browserLanguage": "en-GB",
      "browserScreenHeight": 1200,
      "browserScreenWidth": 900,
      "browserJavaEnabled": true,
      "browserColorDepth": "32",
      "timeZone": "300",
      "browserJavascriptEnabled": true,
      "channel": "browser"
    }
  }
}

## [](#additional-requests--responses)Additional requests & responses

When 3DS is enabled there are up to two extra steps:

-   `Device Data Collection` - Issuer run device data collection, used as part of the issuers risk assessment.
-   `Challenge` - As an additional level of fraud prevention the issuer prompts for an identity check.

[

### Web integration

API integration with a browser based client side.







](/products/access/payments/enable-features/3ds-authentication/web)[

### iOS/Android integration (native)

API integration with a native client side SDK.







](/products/access/payments/enable-features/3ds-authentication/android-ios)[

### React Native

Using React Native with WebView







](/products/access/payments/enable-features/3ds-authentication/react-native)

## [](#threeds-object-schema)threeDS object schema

type*string*required

Value"integrated"

mode*string*required

Value"always"

challenge*object**(Challenge)*required

An object containing 3DS challenge preferences and configuration.

\-

challenge.​returnUrl*string*required

Once the customer completes the challenge page the issuer redirects/posts to the returnUrl in order for you to resume the session. It must be the full URL path.

challenge.​windowSize*string*

Specify the challenge window size (width x height) that the issuer should use. This is to better tailor the experience to the customers device. Default is 390x400.

Default "390x400"

Enum"250x400""390x400""600x400""500x600""fullPage"

challenge.​preference*string*

Set a preference for how the Issuer decides on a 3DS challenge. challengeMandated will be automatically set by Payments API for the first CIT payment in an MIT series or when storing cards (token creation).

Enum"noPreference""noChallengeRequested""challengeRequested""challengeMandated"

deviceData*object**(DeviceData)*required

An object containing device data for 3DS & Fraud assessment.

\-

deviceData.​acceptHeader*string**\[ 1 .. 2048 \] characters*required

Used by the issuer to check if the customer's browser is compatible with the issuer 3DS challenge display.

deviceData.​userAgentHeader*string**\[ 1 .. 2048 \] characters*required

Used by issuers as part of risk analysis and correctly displaying the challenge. Must conform to RFC 7321.

deviceData.​browserLanguage*string**\[ 1 .. 8 \] characters*

Your customer's browser language that can be used by the issuer in risk analysis. Must conform to the language tags defined by IETF. E.g. en-GB, fr-FR.

deviceData.​browserJavaEnabled*boolean*

Defines whether Java is enabled on your customers browser.

deviceData.​browserColorDepth*string*

The color depth of your customers browser

Enum"1""4""8""15""16""24""32""48"

deviceData.​browserScreenHeight*integer**(int32)*

Defines the pixel height of the customers browser.

deviceData.​browserScreenWidth*integer**(int32)*

Defines the pixel width of the customers browser.

deviceData.​timeZone*string*^\[+-\]?\\d{1,4}$

Time zone offset in minutes between UTC and your customer's browser local time.  
Example time zone offset values in minutes:  
If UTC -5 hours:  
`300`  
`+300`  
If UTC +5 hours:  
`-300`

deviceData.​browserJavascriptEnabled*boolean*

Defines whether Javascript is enabled on your customers browser.

deviceData.​channel*string*

Determines the channel that the transaction came through.

Enum"browser""native"

previousSuspiciousActivity*boolean*

Has the account been flagged for suspicious activity.

userType*string*

Enum"guestUser""registeredUser""federatedAccount""issuerCredentials""thirdPartyAuthentication""fidoAuthenticator"

accountHistory*object**(AccountHistory)*

Customer account history.

\-

accountHistory.​createdAt*string*

Date the customer account was created.

accountHistory.​modifiedAt*string*

Date the customer account was last modified.

accountHistory.​passwordModifiedAt*string*

Date the password for the customer account was last modified.

accountHistory.​paymentAccountEnrolledAt*string*

Date the payment account was added to the cardholder account.

reorder*boolean*

Repeat of a previous order.

preOrderDate*string*

Expected date that a pre-ordered purchase will be available.

transactionHistory*object**(TransactionHistory)*

Object containing details of the last transaction.

\-

transactionHistory.​attemptsLastDay*integer**(int32)*

Number of transactions (successful or abandoned) for this cardholder account within the last 24 hours.

transactionHistory.​attemptsLastYear*integer**(int32)*

Number of transactions (successful or abandoned) for this cardholder account within the last year.

transactionHistory.​completedLastSixMonths*integer**(int32)*

Number of purchases with this customer account during the previous six months.

transactionHistory.​addCardsLastDay*integer**(int32)*

Number of attempts to add a card in the last 24hrs.

transactionHistory.​shippingAddressFirstUsedAt*string*

When the shipping address used for the transaction was first used.

giftCardsPurchase*object**(PaymentsGiftCardsPurchase)*

If the order is being used to purchase a gift card.

\-

giftCardsPurchase.​totalValue*object**(Value)*

+Show 2 properties

giftCardsPurchase.​quantity*integer**(int32)*

The number of gift cards being purchased.

Warning

If 3DS authentication is not available/applicable (e.g. subsequent recurring (MIT), Apple Pay) a validation error message will be returned.

### [](#additional-values-used-by-the-assessment)Additional values used by the assessment

As well as core payment details such as the `cardNumber`, `billingAddress` and any key:values in the `instruction.threeDS` object, the following key:values are used as part of the 3DS authentication. By providing these, the issuer can make a more accurate assessment and will reduce `challenge` outcomes in favor of `frictionless`.

`instruction.customer`

firstName, lastName, email, phone, dateOfBirth, ipAddress

### [](#emvco-required-values)EMVco required values

If certain values are not provided, you risk increased `3dsChallenged` outcomes and even `3dsAuthenticationFailed`. Card issuers use the below values to help decide if a transaction is fraudulent. We **strongly** recommend you provide this data, so your authentication rates remain high.

-   `instruction.paymentInstrument.cardHoldeName`
-   `instruction.customer.ipAddress`
-   `instruction.customer.email` 1
-   `instruction.customer.firstName` 3
-   `instruction.customer.lastName` 3
-   `instruction.customer.phoneNumber` 1
-   `instruction.threeDS.browserLanguage` 2
-   `instruction.threeDS.deviceData.browserScreenWidth` 2
-   `instruction.threeDS.deviceData.browserScreenHeight` 2

1 Either `customer.email` or `customer.phoneNumber` are required.

2 Provide for web/browser integration only

3 Only required if `instruction.paymentInstrument.cardHoldeName` is not provided

#### [](#emvco-recommended-values)EMVco recommended values

-   `instruction.paymentInstrument.billingAddress.city`
-   `instruction.paymentInstrument.billingAddress.country`
-   `instruction.paymentInstrument.billingAddress.address1`
-   `instruction.paymentInstrument.billingAddress.postalCode`
-   `instruction.paymentInstrument.billingAddress.state`

#### [](#device-data-collection-failure)Device Data Collection failure

In the event the device data collection fails to run (browser/native), additionally provide the following in the [payments request](/products/access/payments/openapi) to maintain healthy authentication rates and reduce issuer challenges:

Providing the data below directly in the API request should not be viewed as an alternative to running the [device data collection form](/products/access/payments/enable-features/3ds-authentication/web#device-data-collection-form). It is a fallback only.

-   `instruction.customer.ipAddress` 1
-   `instruction.threeDS.deviceData.browserLanguage`
-   `instruction.threeDS.deviceData.browserScreenHeight`
-   `instruction.threeDS.deviceData.browserScreenWidth`
-   `instruction.threeDS.deviceData.browserJavaEnabled`
-   `instruction.threeDS.deviceData.browserColorDepth`
-   `instruction.threeDS.deviceData.timeZone`
-   `instruction.threeDS.deviceData.browserJavascriptEnabled`
-   `instruction.threeDS.deviceData.channel` 1

1 Only these values apply to (iOS/Android), the others are not applicable

**Next steps**

---

-   [SCA Exemptions](/products/access/payments/enable-features/sca-exemptions)  
    
-   [Testing (3DS tab)](/products/access/payments/testing) for scenario details and magic test values

#### Do you like our page?

On this page

[How to enable](#how-to-enable)[threeDS object example](#threeds-object-example)[Additional requests & responses](#additional-requests--responses)[threeDS object schema](#threeds-object-schema)[Additional values used by the assessment](#additional-values-used-by-the-assessment)[EMVco required values](#emvco-required-values)

![](https://developer.worldpay.com/products/access/payments/enable-features/3ds-authentication/images/privacy-cookies.svg)Your Privacy Choices

©2025 Worldpay, LLC and/or its affiliates. All rights reserved.

[Worldpay](https://www.worldpay.com)

[Terms of use](https://www.worldpay.com/terms-of-use)

[Privacy](https://www.worldpay.com/privacy)

[Cookies](https://www.worldpay.com/cookies)

[Contact us](https://www.worldpay.com/en-GB/merchant-support#still-need-help)