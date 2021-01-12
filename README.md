<h1 align="center"><b>Text To Order</b></h1>
<p align="center"><i>Twilio, React, Redux, Node.js, MongoDB, Heroku, VGS, Stripe</i></p>

# Introduction
### [Live Demo](https://text-to-order.herokuapp.com)

- The app let customer place orders through SMS. Twilio webhook routes customer messages to the app backend. The app uses the phone number to recognize the customer and merchant. The app uses cookie session to track customer cart.
- There is also a website which allow merchants to login to edit their info, add/edit/remove items on their menu, publish their menu, and check order history. 
- It has PCI compliant payment flow. After customer confirms order, it collects customer's payment info by VGS Collect which sends card data to VGS reverse proxy to convert the card data to tokens. After the backend server receives the card token, it will send requests through VGS forward proxy, which reveals tokens, to 3rd party payment gateway like Stripe, Adyen...   

 </br>       
<img src="sms-recording.gif" width="300">   
<img src="web-recording.gif" width="600">
 </br>    
 </br>    

## Tech Stack

Twilio, React, Redux, Node.js, MongoDB, Heroku, VGS, Stripe

 </br>    

## Features to implement:
1. optimize backend database query
2. optimize merchant dashboard
3. Checkout API to charge customer card with 3rd party like Stripe
4. email verification (90%)