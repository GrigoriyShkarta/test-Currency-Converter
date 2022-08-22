import './currencyInput.scss';

function CurrencyInput({onAmountChange, onCurrencyChange, currencies, amount, currency}) {
  return (
    <div className="group">
      <input type="text" value={amount} onChange={ev => onAmountChange(ev.target.value)} />
      <select value={currency} onChange={ev => onCurrencyChange(ev.target.value)}>
        {currencies.map((currency => (
          <option key={currency} value={currency}>{currency}</option>
        )))}
      </select>
    </div>
  );
}

export default CurrencyInput;