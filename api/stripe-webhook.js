const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const event = req.body;

  // Zpracování checkout.session.completed
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Získáme Clerk user ID z client_reference_id
    const userId = session.client_reference_id;
    
    if (!userId) {
      console.error('No client_reference_id (userId) found');
      return res.status(400).json({ error: 'No userId' });
    }

    console.log('Processing payment for user:', userId);

    try {
      // Zjistíme jaký plán uživatel koupil
      let plan = 'monthly'; // default
      
      // Získáme line items ze session
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      if (lineItems.data.length > 0) {
        const priceId = lineItems.data[0].price.id;
        // Porovnáme s environment variables
        if (priceId === process.env.STRIPE_PRICE_YEARLY) {
          plan = 'yearly';
        } else if (priceId === process.env.STRIPE_PRICE_MONTHLY) {
          plan = 'monthly';
        }
      }

      console.log('Detected plan:', plan);

      // Aktualizujeme metadata uživatele
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
                plan: plan,
                stripeCustomerId: session.customer,
                subscriptionId: session.subscription,
                activatedAt: new Date().toISOString()
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

      console.log('Successfully updated subscription for user:', userId, 'with plan:', plan);
      return res.status(200).json({ received: true, userId, plan });

    } catch (error) {
      console.error('Webhook error:', error);
      return res.status(500).json({ error: error.message });
    }
  }

  // Pro ostatní eventy jen potvrdíme přijetí
  return res.status(200).json({ received: true });
}
