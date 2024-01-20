import  { useState ,useEffect } from 'react';


const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('THB');
  const [convertedAmount, setConvertedAmount] = useState('');
  const currencies = ['USD', 'THB', 'CNY', 'JPY', 'KRW'];
  const [exchangeRates, setExchangeRates] = useState({});

  const convertCurrency = async () => {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const data = await response.json();
    const rate = data.rates[toCurrency];
    const convertedValue = amount * rate;
    setConvertedAmount(convertedValue.toFixed(2));
  };

  useEffect(() => {
    const fetchExchangeRates = async () => {
      const response = await fetch(
        'https://api.exchangerate-api.com/v4/latest/THB'
      );
      const data = await response.json();
      setExchangeRates(data.rates);
    };

    fetchExchangeRates();
  }, []);


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-300 via-teal-300 to-cyan-400">
      <img src="https://cdn-icons-png.flaticon.com/512/6475/6475889.png" className='w-[200px]' alt="" />
      <h1 className='md:uppercase uppercase font-bold md:text-[40px] text-[30px]'>currency-converter</h1>
      <div className="my-2">
        <h2 className="text-xl font-bold mb-2">Exchange Rates to THB</h2>
        <ul className='text-center'>
          {currencies
            .filter((currency) => currency !== toCurrency)
            .map((currency) => (
              <li key={currency}>
                1 {currency} = {(1 / exchangeRates[currency]).toFixed(2)} {toCurrency}
              </li>
            ))}
        </ul>

      </div>
      <div className="mb-4">
        <input
          
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-[300px] h-[60px] text-[30px] text-center"
          placeholder="Enter amount"
        />
      </div>
     
     <div className='flex flex-row my-6 '>
     <div className="mx-4">
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
      <img src="https://cdn-icons-png.flaticon.com/128/271/271226.png" alt="" className='w-10 h-10 '/>
      <div className="mx-4">
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
     </div>

      <button
        onClick={convertCurrency}
        className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded-md"
      >
        Convert
      </button>
      {convertedAmount && (
        <p className="mt-4 text-[30px] font-bold">Converted Amount: {convertedAmount}</p>
      )}
    </div>
  );
};

export default CurrencyConverter;