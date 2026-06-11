import styles from "./PaymentSuccess.module.css";

function PaymentSuccess() {
  return (
    <div className={styles.success}>
      <p>Payment Successful!</p>
      <p>Enjoy the movie!</p>
    </div>
  );
}

export default PaymentSuccess;
