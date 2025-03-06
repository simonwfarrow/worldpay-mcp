import fetch from 'node-fetch';

async function payment() {

  const resp = await fetch(
    `https://try.access.worldpay.com/api/payments`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'WP-Api-Version': '2024-06-01',
        Authorization: 'Basic ' + Buffer.from(`${WORLDPAY_USERNAME}:${WORLDPAY_PASSWORD}`).toString('base64')
      },
      body: JSON.stringify({
        transactionReference: '<REPLACE_WITH_YOUR_TRANSACTION_REFERENCE>',
        merchant: {entity: 'default'},
        instruction: {
          method: 'card',
          paymentInstrument: {
            type: 'checkout',
            cardHolderName: '<REPLACE_WITH_YOUR_CARD_HOLDER_NAME>',
            sessionHref: '<REPLACE_WITH_YOUR_SESSION_HREF>',
            billingAddress: {
              address1: '<REPLACE_WITH_YOUR_ADDRESS1>',
              address2: '<REPLACE_WITH_YOUR_ADDRESS2>',
              address3: '<REPLACE_WITH_YOUR_ADDRESS3>',
              postalCode: '<REPLACE_WITH_YOUR_POSTAL_CODE>',
              city: '<REPLACE_WITH_YOUR_CITY>',
              state: '<REPLACE_WITH_YOUR_STATE>',
              countryCode: '<REPLACE_WITH_YOUR_COUNTRY_CODE>'
            }
          },
          narrative: {line1: '<REPLACE_WITH_YOUR_NARRATIVE_LINE1>'},
          value: {
            currency: '<REPLACE_WITH_YOUR_CURRENCY>',
            amount: 0
          }
        }
      })
    }
  );

  const data = await resp.json();

}