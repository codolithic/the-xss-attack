import { CheckoutSection, BackButton } from "../components";
import styles from "./BookingPage.module.css";

const BookingPage = () => {
  return (
    <div className={styles.wrapper}>
      <BackButton />
      <CheckoutSection />
    </div>
  );
};

export default BookingPage;
