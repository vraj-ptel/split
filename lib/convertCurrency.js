const exchangeRates = {
  USD: 1,       // United States Dollar
  INR: 83.55,   // Indian Rupee
  EUR: 0.92,    // Euro
  GBP: 0.79,    // British Pound
  JPY: 157.72,  // Japanese Yen
  CNY: 7.25     // Chinese Yuan
};
const echange={
  INR:{
    USD:0.012,
    EUR:0.011,
    GBP:0.0095,
    JPY:1.89,
    CNY:0.087,
  },
  USD:{
    INR:83.55,
    EUR:0.92,
    GBP:0.79,
    JPY:157.72,
    CNY:7.25,
  },
  EUR:{
    INR:89.89,
    USD:1.09,
    GBP:0.86,
    JPY:171.35,
    CNY:7.88,
  },
  GBP:{
    INR:104.44,
    USD:1.27,
    EUR:1.16,
    JPY:199.67,
    CNY:9.18,
  },
  JPY:{
    INR:0.53,
    USD:0.0063,
    EUR:0.0058,
    GBP:0.0050,
    CNY:0.046,
  },
  CNY:{
    INR:11.49,
    USD:0.14,
    EUR:0.13,
    GBP:0.11,
    JPY:21.74,
  },

}

export const convertCurrency = (amount, fromCurrency, toCurrency, rates=exchangeRates) => {
  console.log('converting',amount,fromCurrency,toCurrency,rates);
  // Ensure the amount is a valid number greater than zero.
  if (isNaN(amount) || amount <= 0) {
    return '0.00';
  }

  // Check if the provided currencies exist in the rates object.
  if (!rates[fromCurrency] || !rates[toCurrency]) {
    console.error('Invalid currency provided to convertCurrency function.');
    return '0.00';
  }

  // Convert the 'from' currency to the base currency (USD in this case).
  const amountInBaseCurrency = amount / rates[fromCurrency];

  // Convert from the base currency to the 'to' currency.
  const result = amountInBaseCurrency * rates[toCurrency];

  // Return the result rounded to two decimal places.
  return result.toFixed(2);
};