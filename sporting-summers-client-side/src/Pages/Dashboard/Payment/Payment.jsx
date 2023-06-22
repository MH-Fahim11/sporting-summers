import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useSelectedClass from "../../../hooks/useSelectedClass";

// import useSelectedClass from "../../../hooks/useSelectedClass";

const stripePromise = loadStripe(import.meta.env.VITE_PK_Payment);
const Payment = () => {
const {id} =  useParams()
const [SelectedClass] = useSelectedClass()
const foundPayableClass = SelectedClass.find((selectPayableClass) => selectPayableClass._id === id);
const price = foundPayableClass?.myClass.price;

  return (
    <div className="p-5">
      <h1 className=" text-center text-3xl p-10 font-bold">
        Make Your Payment
      </h1>
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={foundPayableClass} price={price}></CheckoutForm>
      </Elements>
    </div>
  );
};

export default Payment;
