/* eslint-disable react/prop-types */
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./common.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useSelectedClass from "../../../hooks/useSelectedClass";
import useEnrolled from "../../../hooks/useEnrolled";
import Swal from "sweetalert2";

// eslint-disable-next-line react/prop-types, no-unused-vars
const CheckoutForm = ({ price, cart }) => {
  const [refetch] = useSelectedClass();
  const [erefetch] = useEnrolled();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useAuth();
  console.log(user);
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  useEffect(() => {
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log("secret", res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }
    setProcessing(true);
    console.log("payment intent", paymentIntent);
    setProcessing(false);
    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // save payment information to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        date: new Date(),
        itemNames: cart.myClass.className,
        cartItems: cart,
        id: cart._id,
      };
      axiosSecure.post("/payments", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertResult.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your have Successfully enrolled this course",
            showConfirmButton: false,
            timer: 1500,
          });
        axiosSecure.put(`/increment/${cart.myClass._id}`).then((res)=>{
          console.log(res.data)
          if(res.data.modifiedCount){
            refetch();
            erefetch();
          }
        })

          
          // display confirm
        }
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cof">
      <div>
        <p>Please Give your Card information.</p>
      </div>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      {error && <p className=" text-red-400">{error}</p>}
      {transactionId && (
        <p className="text-green-500">
          Transaction complete with transactionId: {transactionId}
        </p>
      )}
      <button
        type="submit"
        className=" bg-teal-400"
        disabled={!stripe || !clientSecret || processing}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
