import { useEffect, useState } from "react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";
import { MoviePoster, ReviewDialog, ReviewSection } from "../components";
import styles from "./HomePage.module.css";

async function addComment(text: string) {
  await fetch("http://localhost:8000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text,
    }),
  });
}

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<{ id: number; text: string }[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/comments")
      .then((res) => res.json())
      .then((result) => setComments(result.data));
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing here ...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    injectCSS: false,
    content: "",
  });

  const handleSaveReview = async () => {
    if (editor) {
      const html = editor.getHTML();
      if (html !== "<p></p>") {
        setComments([...comments, { id: comments.length + 1, text: html }]);
        editor.commands.clearContent();
        setIsModalOpen(false);
        await addComment(html);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Now Showing</h1>

      <MoviePoster
        posterUrl="../poster.png"
        movieTitle="The XSS Attack"
        movieOverview="A digital thriller that explores the vulnerabilities of the modern
            world."
      />

      <ReviewSection
        onDialogOpen={() => setIsModalOpen(true)}
        comments={comments}
      />

      {isModalOpen && (
        <ReviewDialog
          editor={editor}
          onDialogClose={() => setIsModalOpen(false)}
          handleSaveReview={handleSaveReview}
        />
      )}
    </div>
  );
}
