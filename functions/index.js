const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51LKzppCxNWrzChOd5wS7OJ5isKzdn2NYhKZrxS8EwgpZuv1VzyGYIGBZ16dy9AUGcrnaaHKHsSgTN1C4zqjZpYU2009UfslNly');

// API

// App config
const app = express();
// Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API routes
app.get("/", (request, respone) => respone.status(200).send("hello world"));

app.post("/payments/create", async (request, respone) => {
    const total = request.query.total;

    console.log("payment request Received BOOM!!! for this amount >>>", total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency
        currency: "usd",
    });
    // OK - Created
    respone.status(201).send({
        clientSecret: paymentIntent.client_secret,
    })

});
// Listen command
exports.api = functions.https.onRequest(app);

// example endpoint
// http://localhost:5001/backend-f7536/us-central1/api).