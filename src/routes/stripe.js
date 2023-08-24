const express = require('express')
const router = express.Router()
const Stripe  = require('stripe');
require('dotenv').config();
const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/create-checkout-session", async(req, res) => {
    const customer = stripe.customers.create({
      metadata:{
      userId : req.body.userId,
      cart   : JSON.stringify(req.body.cartItems)
    }
  });
  //Define product information when you create the Checkout Session 
  //using predefined price IDs or on the fly with price_data
    const line_items = req.body.cartItems?.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: {
              id: item.id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.cartQuantity,
      };
    });
  
    //A Checkout Session is the programmatic representation of what your customer sees
    const session = await stripe.checkout.sessions.create({
      payment_method_types : ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      customer: customer.id,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url : `${process.env.CLIENT_URL}/cancel`,
    });
  
    res.send({URL: session.url});
  });
  //After the transaction, a webhook fulfills the order using the checkout.session.completed event.
module.exports = router ;
  