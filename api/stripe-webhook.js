const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function updateClerkUser(email, subscriptionData) {
  try {
    // Najdeme uživatele podle emailu
    const searchResponse = await fetch(
      `https://api.clerk.com/v1/users?email_address=${encodeURIComponent(email)}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
        },
      }
    );
    
    const users = await searchResponse.json();
    
    if (!users || users.length === 0) {
      console.log('User not found:', email);
      return false;
    }
    
    const userId = users[0].id;
    
    // Aktualizujeme public_metadata
    const updateResponse = await fetch(
      `https://api.clerk.com/v1/users/${userId}/metadata`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${process.env.CLERK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          public_metadata: {
            subscription: subscriptionData
          }
        }),
      }
    );
    
    if (!updateResponse.ok) {
      console.error('Failed to update Clerk user:', await updateResponse.text());
      return false;
    }
    
    console.log('Updated user subscription:', email, subscriptionData);
    return true;
  } catch (error) {
    console.error('Error updating Clerk user:', error);
    return false;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method Not Allowed');
  }

  let event = req.body;

  // Zpracování událostí
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const email = session.customer_details?.email || session.customer_email;
        
        if (email) {
          await updateClerkUser(email, {
            status: 'active',
            plan: 'pro',
            stripeCustomerId: session.customer,
            subscriptionId: session.subscription,
            activatedAt: new Date().toISOString(),
          });
        }
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customer = await stripe.customers.retrieve(subscription.customer);
        
        if (customer.email) {
          await updateClerkUser(customer.email, {
            status: 'cancelled',
            plan: null,
            cancelledAt: new Date().toISOString(),
          });
        }
        break;
      }
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
  }

  res.status(200).json({ received: true });
}
