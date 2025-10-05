"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./NotePreview.module.css";
import type { Note } from "../../types/note"; // Імпорт типу
import { getSingleNote } from "@/lib/api";

type NotePreviewProps = {
  noteId: string;
};

export default function NotePreview({ noteId }: NotePreviewProps) {
  const [note, setNote] = useState<Note | null>(null);
  const router = useRouter();

  useEffect(() => {
    getSingleNote(noteId).then((data) => setNote(data));
  }, [noteId]);

  const handleClose = () => router.back();

  if (!note) return null;

  return (
    <div className={styles.backdrop} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={handleClose}>
          &times;
        </button>
        <h2 className={styles.title}>{note.title}</h2>
        <p className={styles.content}>{note.content}</p>
      </div>
    </div>
  );
}
