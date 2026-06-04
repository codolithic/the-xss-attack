import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import styles from './BookingPage.module.css';

const stripePromise = loadStripe('pk_test_your_key');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    // Call your backend API
    try {
      //   await fetch('http://localhost:8000/api/bookings', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ movie: 'The XSS Attack' }),
      //   });
      await Promise.resolve();
      alert('Success!');
    } catch (e) {
      alert('Check your console - is the API running?');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.stripeElement}>
        <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
      </div>
      <button disabled={!stripe} className={styles.payButton}>
        Confirm Purchase
      </button>
    </form>
  );
};

const BookingPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className={styles.card}>
        <h2 style={{ marginBottom: '16px', color: '#000' }}>Checkout</h2>
        <p style={{ color: '#667085', marginBottom: '24px' }}>Ticket for "The XSS Attack"</p>
        <div id="stripe-content">
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
