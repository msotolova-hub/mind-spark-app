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

  const { userId, subscriptionId, newPlan } = req.body;

  if (!userId || !subscriptionId || !newPlan) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!['monthly', 'yearly'].includes(newPlan)) {
    return res.status(400).json({ error: 'Invalid plan' });
  }

  const priceIds = {
    monthly: process.env.STRIPE_PRICE_MONTHLY,
    yearly: process.env.STRIPE_PRICE_YEARLY
  };

  try {
    // Získáme aktuální subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    
    if (!subscription || subscription.status === 'canceled') {
      return res.status(400).json({ error: 'Subscription not found or already canceled' });
    }

    // Změníme plán - prorating znamená že se přepočítá cena
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [{
        id: subscription.items.data[0].id,
        price: priceIds[newPlan],
      }],
      proration_behavior: 'create_prorations', // Přepočítá rozdíl v ceně
    });

    console.log('Subscription updated to:', newPlan);

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
              status: 'active',
              plan: newPlan,
              stripeCustomerId: updatedSubscription.customer,
              subscriptionId: subscriptionId,
              updatedAt: new Date().toISOString()
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
      newPlan: newPlan
    });

  } catch (error) {
    console.error('Change plan error:', error);
    return res.status(500).json({ error: error.message });
  }
}
