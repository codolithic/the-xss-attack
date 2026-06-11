import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

import styles from "./CheckoutSection.module.css";

const stripePromise = loadStripe("dev_secret_key");

function CheckoutForm() {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  if (!stripe || !elements) return;

  return (
    <form
      id="stripe-form"
      onSubmit={async (event) => {
        event.preventDefault();
        navigate("/success");
      }}
    >
      <div className={styles.stripeElement}>
        <CardElement
          options={{
            style: { base: { fontSize: "16px" } },
            hidePostalCode: true,
          }}
        />
      </div>
      <button disabled={!stripe} className={styles.payButton}>
        Confirm Purchase
      </button>
    </form>
  );
}

export function CheckoutSection() {
  return (
    <div className={styles.card}>
      <h2 className={styles.header}>Checkout</h2>
      <p className={styles.subHeader}>Ticket for "The XSS Attack"</p>
      <div id="stripe-content">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
