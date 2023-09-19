import  { useState } from 'react';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState('');

  const convertCurrency = () => {
    // Fetch exchange rate from an API, e.g., using axios or fetch
    // Calculate the converted amount based on the exchange rate
    // Set the converted amount in the state
    setConvertedAmount(amount)
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>

      <div className="flex mb-4">
        <input
          type="number"
          className="w-40 sm:w-48 p-2 mr-2 border border-gray-300 rounded"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          className="w-24 p-2 border border-gray-300 rounded"
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          {/* Add more currency options here */}
        </select>

        <select
          className="w-24 p-2 border border-gray-300 rounded"
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          {/* Add more currency options here */}
        </select>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        onClick={convertCurrency}
      >
        Convert
      </button>

      {convertedAmount && (
        <div className="mt-4">
          <span className="font-bold">{amount} {fromCurrency}</span> is equal to{' '}
          <span className="font-bold">{convertedAmount} {toCurrency}</span>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;