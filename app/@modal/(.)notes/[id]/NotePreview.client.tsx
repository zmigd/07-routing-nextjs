'use client';

import { useEffect, useState } from "react";
import Modal from "../../../../components/NotePreview/Modal";
import { fetchNoteById } from "@/lib/api";
import type { Note } from "../../../../types/note";
import css from "./NotePreview.module.css";

type NotePreviewProps = {
  noteId: string;
};

export default function NotePreview({ noteId }: NotePreviewProps) {
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    setNote(null);
    fetchNoteById(noteId).then(setNote);
  }, [noteId]);

  if (!note) return null;

  return (
    <Modal>
      <div className={css.container} key={noteId}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            <span className={css.date}>
              {note.updatedAt ? new Date(note.updatedAt).toLocaleDateString() : ""}
            </span>
          </div>

          <div className={css.content}>{note.content}</div>

          <div>
            <span className={css.tag}>{note.tag}</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}
