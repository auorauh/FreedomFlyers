import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { paymentMethodId, email, name, phone, address } = await req.json();

    // 1. Create customer
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      email,
      name,
      phone,
      address,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    // 2. Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: 'price_1RobFy2Lh23AW9B4LzsQgdoN',
          quantity: 1,
        },
      ],
      payment_settings: {
        payment_method_types: ['card'],
        save_default_payment_method: 'on_subscription',
      },
      expand: ['latest_invoice'],
    });

    const invoice = subscription.latest_invoice;
    const paymentIntent = invoice?.payment_intent;

    if (paymentIntent) {
      // PaymentIntent exists, return client secret to confirm payment on frontend
      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        subscriptionId: subscription.id,
      });
    } else if (invoice?.status === 'paid') {
      // No PaymentIntent but invoice is already paid (subscription active immediately)
      return NextResponse.json({
        subscriptionId: subscription.id,
        message: 'Subscription active and paid.',
      });
    } else {
      console.log('No PaymentIntent and invoice not paid:', invoice);
      return NextResponse.json(
        { error: 'Invoice not paid and no PaymentIntent available.' },
        { status: 400 }
      );
    }
  } catch (err) {
    console.error('Error in subscription:', err);
    return NextResponse.json({ error: { message: err.message } }, { status: 500 });
  }
}
