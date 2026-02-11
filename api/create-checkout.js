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

  const { userId, plan } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  if (!plan || !['monthly', 'yearly'].includes(plan)) {
    return res.status(400).json({ error: 'Invalid plan' });
  }

  // Stripe Price IDs - NAHRAĎ SVÝMI!
  const priceIds = {
    monthly: process.env.STRIPE_PRICE_MONTHLY,
    yearly: process.env.STRIPE_PRICE_YEARLY
  };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceIds[plan],
          quantity: 1,
        },
      ],
      client_reference_id: userId, // Toto propojí platbu s Clerk uživatelem!
      success_url: `${process.env.APP_URL || 'https://mind-spark-app.vercel.app'}?success=true`,
      cancel_url: `${process.env.APP_URL || 'https://mind-spark-app.vercel.app'}?canceled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return res.status(500).json({ error: error.message });
  }
}
