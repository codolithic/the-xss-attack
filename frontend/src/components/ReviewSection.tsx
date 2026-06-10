import styles from "./ReviewSection.module.css";

interface ReviewSectionProps {
  readonly onDialogOpen: () => void;
  readonly comments: Array<{
    id: number;
    text: string;
  }>;
}

export function ReviewSection({
  comments,
  onDialogOpen,
}: Readonly<ReviewSectionProps>) {
  return (
    <div className={styles.reviewSection}>
      <div className={styles.header}>
        <h3>User Reviews</h3>
        <button
          className={`${styles.btn} ${styles.reviewButton}`}
          onClick={onDialogOpen}
        >
          Write Review
        </button>
      </div>
      {comments.map((c) => (
        <div key={c.id} className={styles.reviewList}>
          <div dangerouslySetInnerHTML={{ __html: c.text }} />
          {/* <div>{c.text}</div> */}
        </div>
      ))}
    </div>
  );
}
