import {useState, useEffect} from "react";

import axios from "axios";

import CurrencyInput from "./currencyInput/CurrencyInput";
import Header from "./header/Header";

import './App.css';


function App() {

  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [rates, setRates] = useState([]);


  useEffect(() => {
    axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
      .then(response => {
        setRates(response.data.slice(0, -1))
      })
  }, []);

  function format(number) {
    return number.toFixed(2);
  }

  function handleAmount1Change(amount1) {
    setAmount2(format(amount1 * rates.find(c => c.ccy === currency1)?.sale / rates.find(c => c.ccy === currency2)?.sale));
    setAmount1(amount1);
  }

  function handleCurrency1Change(currency1) {
    setAmount2(format(amount1 * rates.find(c => c.ccy === currency1)?.sale / rates.find(c => c.ccy === currency2)?.sale));
    setCurrency1(currency1);
  }

  function handleAmount2Change(amount2) {
    setAmount1(format(amount2 * rates.find(c => c.ccy === currency2)?.sale / rates.find(c => c.ccy === currency1)?.sale));
    setAmount2(amount2);
  }

  function handleCurrency2Change(currency2) {
    setAmount1(format(amount2 * rates.find(c => c.ccy === currency2)?.sale / rates.find(c => c.ccy === currency1)?.sale));
    setCurrency2(currency2);
  }


  return (
    <div className="wrapper">
      <Header rates={rates} format={format}/>
      <h1>Currency Converter</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={rates.map(a => a.ccy)}
        amount={amount1}
        currency={currency1}/>
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={rates.map(a => a.ccy)}
        amount={amount2}
        currency={currency2}/>
    </div>
  );
}

export default App;
