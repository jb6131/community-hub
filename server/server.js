require('dotenv').config();

const path = require('path');
// const stripe = require('stripe')('sk_test_51OG4JxELqHvNcxjUDCNkcxUpeWpQOI04rweWGP0atKucDHNQRVkEKyFdVoZfrS1UiessTBKAOmAklQfHOU6vvBJo00hyIpjPiW');

const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const db = require('./config/connection');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // app.post('/create-checkout-session', async (req, res) => {
  // const session = await stripe.checkout.sessions.create({
  //   line_items: [
  //     {
  //       price: 'price_1OG4SiELqHvNcxjUD8tgBDA5',
  //       quantity: 1,
  //     },
  //     {
  //       price: 'price_1OG4SLELqHvNcxjUR2nmq4hJ',
  //       quantity: 1,
  //     },
  //     {
  //       price: 'price_1OG4S5ELqHvNcxjUfcbpTwZx',
  //       quantity: 1,
  //     },
  //     {
  //       price: 'price_1OG4RZELqHvNcxjUXGhUAMkS',
  //       quantity: 1,
  //     },
  //   ],
  //   mode: 'payment',
  //   success_url: `${whispering-brook-60496-af6838df675c.herokuapp.com}?success=true`,
  //   cancel_url: `${whispering-brook-60496-af6838df675c.herokuapp.com}?canceled=true`,
  // });

  // res.redirect(303, session.url);
  // });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};


startApolloServer();
