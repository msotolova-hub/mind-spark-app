const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, subscriptionId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  if (!subscriptionId) {
    return res.status(400).json({ error: 'Missing subscriptionId' });
  }

  try {
    // Zrušíme subscription ve Stripe (na konci aktuálního období)
    const subscription = await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true
    });

    console.log('Subscription cancelled:', subscriptionId);

    // Aktualizujeme metadata v Clerku
    const updateResponse = await fetch(
      `https://api.clerk.com/v1/users/${userId}/metadata`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          public_metadata: {
            subscription: {
              status: 'canceling',
              cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null,
              plan: subscription.items.data[0]?.price?.id === process.env.STRIPE_PRICE_YEARLY ? 'yearly' : 'monthly',
              stripeCustomerId: subscription.customer,
              subscriptionId: subscriptionId
            }
          }
        })
      }
    );

    if (!updateResponse.ok) {
      const errorText = await updateResponse.text();
      console.error('Failed to update Clerk metadata:', errorText);
      return res.status(500).json({ error: 'Failed to update metadata' });
    }

    return res.status(200).json({ 
      success: true, 
      cancelAt: subscription.cancel_at ? new Date(subscription.cancel_at * 1000).toISOString() : null
    });

  } catch (error) {
    console.error('Cancel subscription error:', error);
    return res.status(500).json({ error: error.message });
  }
}
