import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = () => {
    const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

     // Trigger form validation and wallet collection
     const {error: submitError} = await elements.submit();
     if (submitError) {
       handleError(submitError);
       return;
     }

    const res = await fetch("/api/create-intent",{
        method:'POST',
        body:JSON.stringify({
            amount:5
        })
    })

    const clientSecret = await res.json();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret: clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000",
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-32 md:mx-[200px]">
        <PaymentElement />
        <button className="bg-slate-500 p-2 px-4 mt-5 rounded-sm">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
