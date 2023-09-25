const express = require('express')
const router = express.Router()
const Cart =  require('../models/cartModel');
const Stripe  = require('stripe');
require('dotenv').config();

const stripe = Stripe(process.env.STRIPE_KEY);

router.post("/checkout", async(req, res) => {
  const cart = await Cart.findOne({_id: req.body.cartId});
  if(!cart) return res.json("Not found the cart!");
  const customer = stripe.customers.create({
      metadata:{
      userId : cart.userId,
      cart   : JSON.stringify(cart.items)
    }
  });
  //Define product information when you create the Checkout Session 
  //using predefined price IDs or on the fly with price_data
    const line_items = cart.items?.map((item) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            images: [item.image],
            metadata: {
              id: item.productId,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: cart.totalPrice,
      };
    });
  
    //A Checkout Session is the programmatic representation of what your customer sees
    const session = await stripe.checkout.sessions.create({
      payment_method_types : ['card'],
      line_items: line_items,
      mode: 'payment',
      customer: customer.id,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url : `${process.env.CLIENT_URL}/cancel`,
    });
  
    res.json({URL: session.url});
  });
  //After the transaction, a webhook fulfills the order using the checkout.session.completed event.
module.exports = router ;
  