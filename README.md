# What's for Dinner

What's for dinner delivers delicious dinners you’ll be proud to cook, serve and enjoy.
This repository is code for the e-coomerce store where users can visit, browse a list of products, add them to a cart, check out, and make a payment with a credit card using Stripe (pending), either as guests or as logged-in users.

## Tech Stack

A backend with express/sequelize and a frontend with react/redux on top of a postgress database.
Local and 3rd party authentication - OAuth with Google

## Setup

* Create a file called `secrets.js` in the project root

  * This file is `.gitignore`'d, and will _only_ be required in your _development_ environment
  * Its purpose is to attach the secret env variables that you'll use while developing
  * However, it's **very** important that you **not** push it to Github! Otherwise, _prying eyes_ will find your secret API keys!
  * It might look like this:

  ```
    process.env.GOOGLE_CLIENT_ID = 'hush hush'
    process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
    process.env.GOOGLE_CALLBACK = '/auth/google/callback'
  ```

## Start

`npm run start-dev` will make great things happen!

If you want to run the server and/or webpack separately, you can also `npm run start-server` and `npm run build-client`.

From there, just follow your bliss.

## Deployment
