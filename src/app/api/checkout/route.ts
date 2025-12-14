import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-11-17.clover',
});

// Membership plans matching the frontend
const PLANS = {
  monthly: {
    name: 'Monthly Plan',
    amount: 1999, // €19.99 in cents
    interval: 'month' as const,
    intervalCount: 1,
    trialDays: 3,
  },
  quarterly: {
    name: 'Quarterly Plan',
    amount: 5499, // €54.99 in cents
    interval: 'month' as const,
    intervalCount: 3,
    trialDays: 7,
  },
  annual: {
    name: 'Annual Plan',
    amount: 21999, // €219.99 in cents
    interval: 'year' as const,
    intervalCount: 1,
    trialDays: 30,
  },
};

export async function POST(request: Request) {
  try {
    const { plan } = await request.json();

    if (!plan) {
      return NextResponse.json(
        { error: 'Missing plan parameter' },
        { status: 400 }
      );
    }

    const planKey = plan as keyof typeof PLANS;
    const planData = PLANS[planKey];

    if (!planData) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      subscription_data: {
        trial_period_days: planData.trialDays,
      },
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: planData.name,
              description: `Gamma Capital Discord Premium - ${planData.name}`,
            },
            unit_amount: planData.amount,
            recurring: {
              interval: planData.interval,
              interval_count: planData.intervalCount,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${request.headers.get('origin')}/memberships/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/memberships`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
