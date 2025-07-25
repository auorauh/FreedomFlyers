import React, {useState} from 'react';
import {
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import styles from './CheckoutForm.module.css';
import Spinner from './Spinner';

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    setLoading(true);
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
      setLoading(false);
      alert(error.message);
      return;
    }

    const res = await fetch('/api/checkout', {
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
  setLoading(false);
  alert(data.error.message || data.error);
  return;
}

if (data.clientSecret) {
  const confirmRes = await stripe.confirmCardPayment(data.clientSecret);
  if (confirmRes.error) {
    setLoading(false);
    alert(confirmRes.error.message);
  } else {
    setLoading(false);
    alert('Subscription successful!');
  }
} else if (data.message) {
  // No payment confirmation needed, subscription is active
  setLoading(false);
  alert(data.message);
} else {
  setLoading(false);
  alert('Unexpected response from server.');
}
  };

  return (
    <div className={styles.CheckoutForm}>
    {loading ? <div className={styles.spinner}><Spinner /> </div> : <></>}
    
    <form className={styles.formClass} onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Full Name"
        required
        className={styles.stripeInput}
      />
      <input
        type="email"
        name="email"
        placeholder="Email Address"
        required
        className={styles.stripeInput}
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        required
        className={styles.stripeInput}
      />
      <input
        type="text"
        name="address"
        placeholder="Street Address"
        required
        className={styles.stripeInput}
      />
      <input
        type="text"
        name="city"
        placeholder="City"
        required
        className={styles.stripeInput}
      />
      <input
        type="text"
        name="state"
        placeholder="State"
        required
        className={styles.stripeInput}
      />
      <input
        type="text"
        name="zip"
        placeholder="ZIP Code"
        required
        className={styles.stripeInput}
      />
      <CardElement className={styles.stripeInput} options={{ hidePostalCode: false }} />
      <label className={styles.stripeCheckbox}>
        <input type="checkbox" required />
        I agree to recurring charges and the terms of service.
      </label>
      <button type="submit" className={styles.stripeButton}>Subscribe</button>
    </form>
    </div>
  );
};

export default CheckoutForm;
