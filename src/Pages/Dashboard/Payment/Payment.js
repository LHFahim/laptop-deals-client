import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_stripe_private_key);

const Payment = () => {
  const booking = useLoaderData();
  const { productName, price } = booking;
  return (
    <div className="bg-base-200 p-4 min-h-screen lg:p-10 text-center">
      <h2 className="normal-case text-3xl mb-3 font-bold text-primary">
        Payment for : {productName}
      </h2>
      <p className="text-xl">
        Please pay <strong>${price}</strong> for your order!
      </p>
      <div className="lg:w-4/5 rounded-3xl mx-auto p-6 my-6 shadow-2xl bg-slate-600">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
