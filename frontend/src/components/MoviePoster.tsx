import { useNavigate } from "react-router-dom";

import styles from "./MoviePoster.module.css";

interface MoviePosterProps {
  readonly posterUrl: string;
  readonly movieTitle: string;
  readonly movieOverview: string;
}

export function MoviePoster({
  posterUrl,
  movieTitle,
  movieOverview,
}: Readonly<MoviePosterProps>) {
  const navigate = useNavigate();

  return (
    <div className={styles.movieCard}>
      <img src={posterUrl} alt={movieTitle} className={styles.poster} />
      <div className={styles.content}>
        <h2 className={styles.title}>The XSS Attack</h2>
        <p>{movieOverview}</p>
        <button
          className={`${styles.btn} ${styles.bookButton}`}
          onClick={() => navigate("/book")}
        >
          Book Ticket
        </button>
      </div>
    </div>
  );
}
