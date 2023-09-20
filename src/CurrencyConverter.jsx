import  { useState } from 'react';


const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('THB');
  const [convertedAmount, setConvertedAmount] = useState('');

  const currencies = ['USD', 'THB', 'CNY', 'JPY', 'KRW'];

  const convertCurrency = async () => {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const convertedValue = amount * rate;
    setConvertedAmount(convertedValue.toFixed(2));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <showRate />
      <div className="mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
        />
      </div>
      <div className="mb-4">
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={convertCurrency}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Convert
      </button>
      {convertedAmount && (
        <p className="mt-4 text-lg">Converted Amount: {convertedAmount}</p>
      )}
    </div>
  );
};

export default CurrencyConverter;