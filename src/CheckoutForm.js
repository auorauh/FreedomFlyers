import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import './CheckoutForm.css'

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const result = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (result.error) {
      console.error(result.error.message);
    } else {
      console.log('PaymentMethod ID:', result.paymentMethod.id);
      // Send to your server to create a charge or subscription
    }
  };

  return (
        <form className="stripe-form" onSubmit={handleSubmit}>
        <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="stripe-input"
        />
        <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            className="stripe-input"
        />
        <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            className="stripe-input"
        />
        <input
            type="text"
            name="address"
            placeholder="Street Address"
            required
            className="stripe-input"
        />
        <input
            type="text"
            name="city"
            placeholder="City"
            required
            className="stripe-input"
        />
        <input
            type="text"
            name="state"
            placeholder="State"
            required
            className="stripe-input"
        />
        <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            required
            className="stripe-input"
        />
        <CardElement options={{ hidePostalCode: false }} />
        <label className="stripe-checkbox">
            <input type="checkbox" required />
            I agree to recurring charges and the terms of service.
        </label>
        <button type="submit" className="stripe-button">Subscribe</button>
        </form>

  );
};

export default CheckoutForm;
