export default async function handler(req, res) {
  // Povolíme CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { sessionId, userId } = req.body;

  if (!sessionId || !userId) {
    return res.status(400).json({ error: 'Missing sessionId or userId' });
  }

  try {
    // Ověříme Stripe session
    const Stripe = require('stripe');
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    if (session.payment_status !== 'paid') {
      return res.status(400).json({ error: 'Payment not completed' });
    }

    // Aktualizujeme Clerk metadata
    const clerkResponse = await fetch(`https://api.clerk.com/v1/users/${userId}/metadata`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        public_metadata: {
          subscription: {
            status: 'active',
            stripeCustomerId: session.customer,
            subscriptionId: session.subscription,
            plan: session.mode === 'subscription' ? 'pro' : 'one-time',
            activatedAt: new Date().toISOString(),
          }
        }
      }),
    });

    if (!clerkResponse.ok) {
      const error = await clerkResponse.text();
      console.error('Clerk API error:', error);
      return res.status(500).json({ error: 'Failed to update user' });
    }

    return res.status(200).json({ 
      success: true, 
      subscription: {
        status: 'active',
        plan: 'pro'
      }
    });
    
  } catch (error) {
    console.error('Error verifying payment:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
