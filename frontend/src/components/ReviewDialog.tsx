import { type Editor, EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Placeholder } from "@tiptap/extensions";

import styles from "./ReviewDialog.module.css";

interface ReviewDialogProps {
  readonly onDialogClose: () => void;
  readonly handleSaveReview: () => void;
}

function MenuBar({ editor }: { editor: Editor }) {
  if (!editor) return null;

  return (
    <div className={styles.menuBar}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`${styles.menuBarBtn} ${editor.isActive("bold") && styles.bold}`.trim()}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`${styles.menuBarBtn} ${editor.isActive("italic") && styles.italic}`.trim()}
      >
        I
      </button>
    </div>
  );
}

export function ReviewDialog({
  handleSaveReview,
  onDialogClose,
}: Readonly<ReviewDialogProps>) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Start typing here ...",
        emptyEditorClass: "is-editor-empty",
      }),
    ],
    content: "",
  });

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h3>Submit Your Review</h3>
        <div className={styles.editorWrapper}>
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className={styles.editor} />
        </div>
        <div className={styles.footer}>
          <button className={styles.btn} onClick={onDialogClose}>
            Cancel
          </button>
          <button
            className={`${styles.btn} ${styles.saveBtn}`}
            onClick={handleSaveReview}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
