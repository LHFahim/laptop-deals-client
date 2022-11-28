import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";

const CheckoutForm = ({ booking }) => {
  const { user } = useContext(AuthContext);
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();
  const { displayName, email } = user;
  const { _id, productName, productImg, price, p_id } = booking;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("https://laptop-deals-server.vercel.app/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      //   console.log("[error]", error);
      console.log(error);
      setCardError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }
    setSuccess("");
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: displayName,
            email: email,
          },
        },
      });
    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === "succeeded") {
      // store payment info in the database

      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id,
        img: productImg,
        name: productName,
        p_id: p_id,
      };

      fetch("https://laptop-deals-server.vercel.app/payments", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.insertedId) {
            setSuccess("Congrats! your payment completed");
            setTransactionId(paymentIntent.id);
          }
        });
    }
    setProcessing(false);
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="text-slate-100">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "green",
                "::placeholder": {
                  color: "white",
                },
              },
              invalid: {
                color: "red",
              },
            },
          }}
        />
        <button
          className="btn btn-secondary text-white btn-sm rounded-none w-3/4 mt-6"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
      </form>
      <p className="text-error text-sm text-center mt-2">{cardError}</p>
      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <p className="text-slate-200">
            Your transactionId:{" "}
            <span className="font-bold">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
