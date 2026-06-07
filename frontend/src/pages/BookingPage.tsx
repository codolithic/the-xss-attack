import { CheckoutSection, BackButton } from "../components";
import styles from "./BookingPage.module.css";

const BookingPage = () => {
  const handleSubmit = async (formData: FormData) => {
    console.log(formData);
    // Call your backend API
    try {
      //   await fetch('http://localhost:8000/api/bookings', {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify({ movie: 'The XSS Attack' }),
      //   });
      await Promise.resolve();
      alert("Success!");
    } catch (e) {
      alert("Check your console - is the API running?");
    }
  };

  return (
    <div className={styles.wrapper}>
      <BackButton />
      <CheckoutSection onSubmit={handleSubmit} />
    </div>
  );
};

export default BookingPage;
