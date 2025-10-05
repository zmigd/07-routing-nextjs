// app/@modal/(.)notes/[id]/page.tsx
'use client';

import NotePreview from "./NotePreview";
import { use } from "react";

type NoteModalProps = {
  params: Promise<{ id: string }>; // тепер params — Promise
};

export default function NoteModal({ params }: NoteModalProps) {
  const { id } = use(params); // <-- unwrap params через React.use()
  return <NotePreview noteId={id} />;
}
