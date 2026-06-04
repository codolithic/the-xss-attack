import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Placeholder } from '@tiptap/extensions';
import styles from './HomePage.module.css';

async function addComment(text: string) {
  await fetch('http://localhost:8000/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
    }),
  });
}

export function MenuBar({ editor }: { editor: Editor }) {
  if (!editor) return null;

  return (
    <div style={{ borderBottom: '1px solid #ddd', padding: '8px', marginBottom: '8px' }}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        style={{ fontWeight: editor.isActive('bold') ? 'bold' : 'normal', marginRight: '5px' }}
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        style={{ fontStyle: editor.isActive('italic') ? 'italic' : 'normal' }}
      >
        I
      </button>
    </div>
  );
}

export function HomePage() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<{ id: number; text: string }[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/comments')
      .then((res) => res.json())
      .then((result) => setComments(result.data));
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start typing here ...',
        emptyEditorClass: 'is-editor-empty',
      }),
    ],
    content: '',
  });

  const handleSaveReview = () => {
    if (editor) {
      const html = editor.getHTML();
      if (html !== '<p></p>') {
        setComments([...comments, { id: comments.length + 1, text: html }]);
        editor.commands.clearContent();
        setIsModalOpen(false);
        addComment(html);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Now Showing</h1>

      <div className={styles.movieCard}>
        <img src="/poster.png" alt="The XSS Attack" className={styles.poster} />
        <div className={styles.content}>
          <h2 className={styles.title}>The XSS Attack</h2>
          <p>A digital thriller that explores the vulnerabilities of the modern world.</p>
          <button className={`${styles.btn} ${styles.bookButton}`} onClick={() => navigate('/book')}>
            Book Ticket
          </button>
        </div>
      </div>

      <div className={styles.reviewSection}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h3>User Reviews</h3>
          <button className={`${styles.btn} ${styles.reviewButton}`} onClick={() => setIsModalOpen(true)}>
            Write Review
          </button>
        </div>
        {comments.map((c) => (
          <div key={c.id} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
            <div dangerouslySetInnerHTML={{ __html: c.text }} />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Submit Your Review</h3>
            <div className={styles.tiptapWrapper} style={{ border: '1px solid #ccc', borderRadius: '4px' }}>
              <MenuBar editor={editor} />
              <EditorContent editor={editor} style={{ padding: '10px', minHeight: '100px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button className={styles.btn} onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className={`${styles.btn} ${styles.bookButton}`} onClick={handleSaveReview}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
