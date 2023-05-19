import { useState } from 'react';

import CreditCard from './components/CreditCard';

const App = () => {
  const currentMonth = new Date().getMonth() + 1;
  const formatting = String(currentMonth).length <= 1 ? '0' : null;
  const formattedCurrentMonth = formatting + currentMonth;
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    date: currentYear + '-' + formattedCurrentMonth,
    cvv: '',
  });

  const [side, setSide] = useState('front');
  const [message, setMessage] = useState(
    'Please enter your credit card details!'
  );

  const handleChange = e => {
    const name = e.target.name;
    let value = e.target.value;

    if ((name === 'cvv') | (name === 'number')) {
      value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'cvv') {
      setSide('back');
      return;
    }
    setSide('front');
  };

  const handleSubmit = e => {
    e.preventDefault();
    setMessage('Thank you for your card information!');
  };

  return (
    <div className="form-container">
      <CreditCard formData={formData} side={side} />
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>
            Name on Card
            <input
              name="name"
              value={formData.name}
              placeholder="Name"
              required
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="input-container">
          <label>
            Card Number
            <input
              name="number"
              value={formData.number}
              placeholder="0000 0000 0000 0000"
              minLength={16}
              maxLength={16}
              required
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="supporting-inputs-container">
          <label>
            Expiry Date
            <input
              name="date"
              value={formData.date}
              type="month"
              required
              onChange={handleChange}
            />
          </label>

          <label>
            CVV
            <input
              name="cvv"
              id="cvv"
              value={formData.cvv}
              placeholder="123"
              minLength={3}
              maxLength={3}
              required
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="input-container">
          <input type="submit" />
        </div>

        <p className="info-message">{message}</p>
      </form>
    </div>
  );
};

export default App;
