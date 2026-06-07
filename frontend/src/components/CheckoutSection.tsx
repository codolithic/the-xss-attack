import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe } from "@stripe/react-stripe-js";

import styles from "./CheckoutSection.module.css";

const stripePromise = loadStripe("pk_test_your_key");

interface CheckoutSectionProps {
  readonly onSubmit: (data: FormData) => Promise<void>;
}

function CheckoutForm({ onSubmit }: Readonly<CheckoutSectionProps>) {
  const stripe = useStripe();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!stripe) return;
        onSubmit(new FormData(event.target));
      }}
    >
      <div className={styles.stripeElement}>
        <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      </div>
      <button disabled={!stripe} className={styles.payButton}>
        Confirm Purchase
      </button>
    </form>
  );
}

export function CheckoutSection({ onSubmit }: Readonly<CheckoutSectionProps>) {
  return (
    <div className={styles.card}>
      <h2 className={styles.header}>Checkout</h2>
      <p className={styles.subHeader}>Ticket for "The XSS Attack"</p>
      <div id="stripe-content">
        <Elements stripe={stripePromise}>
          <CheckoutForm onSubmit={onSubmit} />
        </Elements>
      </div>
    </div>
  );
}
