import React from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import './CheckoutForm.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const form = e.target;
    const billingDetails = {
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
      address: {
        line1: form.address.value,
        city: form.city.value,
        state: form.state.value,
        postal_code: form.zip.value,
      },
    };

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
      billing_details: billingDetails,
    });

    if (error) {
      console.error(error.message);
      alert(error.message);
      return;
    }

    const res = await fetch('https://your-backend.com/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        name: billingDetails.name,
        email: billingDetails.email,
        phone: billingDetails.phone,
        address: billingDetails.address,
      }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error.message);
      return;
    }

    const confirmRes = await stripe.confirmCardPayment(data.clientSecret);
    if (confirmRes.error) {
      console.error(confirmRes.error.message);
      alert(confirmRes.error.message);
    } else {
      alert('Subscription successful!');
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
      <CardElement className="stripe-input" options={{ hidePostalCode: false }} />
      <label className="stripe-checkbox">
        <input type="checkbox" required />
        I agree to recurring charges and the terms of service.
      </label>
      <button type="submit" className="stripe-button">Subscribe</button>
    </form>
  );
};

export default CheckoutForm;
