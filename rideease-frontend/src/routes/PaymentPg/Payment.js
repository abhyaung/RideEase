// src/routes/PaymentPg/Payment.js
import React, { useState } from 'react';
import './Payment.css';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Credit card format validation
    const cardRegex = /^\d{16}$/;
    // Expiry format: MMYY => (month 01-12) + 2-digit year
    const expiryRegex = /^(0[1-9]|1[0-2])\d{2}$/;
    const cvvRegex = /^\d{3}$/;

    if (!cardRegex.test(cardNumber)) {
      alert('Invalid card number. It must be 16 digits.');
      return;
    }
    if (!expiryRegex.test(expiry)) {
      alert('Invalid expiry date. Format must be MMYY (e.g. 0328).');
      return;
    }
    if (!cvvRegex.test(cvv)) {
      alert('Invalid CVV. It must be 3 digits.');
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="payment-container">
      <h2>Ride Payment</h2>
      {success ? (
        <div className="payment-success">
          <h3>Payment Successful ✅</h3>
          <p>Your ride has been confirmed!</p>
        </div>
      ) : (
        <form className="payment-form" onSubmit={handleSubmit}>
          <label>
            Name on Card
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Card Number
            <input
              type="text"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
              maxLength={16}
              pattern="\d{16}"
              title="Card number must be 16 digits"
            />
          </label>
          <div className="form-row">
            <label>
              Expiry
              <input
                type="text"
                placeholder="MMYY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
                pattern="(0[1-9]|1[0-2])\d{2}"
                title="Expiry must be in MMYY format (e.g., 0328)"
              />
            </label>
            <label>
              CVV
              <input
                type="password"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                maxLength={3}
                pattern="\d{3}"
                title="CVV must be 3 digits"
              />
            </label>
          </div>
          <button type="submit">Pay Now</button>
        </form>
      )}
    </div>
  );
};

export default Payment;
