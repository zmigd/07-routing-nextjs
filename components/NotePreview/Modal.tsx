'use client';

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import css from "./Modal.module.css";

type ModalProps = {
  children: ReactNode;
};

export default function Modal({ children }: ModalProps) {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <div className={css.backdrop} onClick={handleClose}>
      <div className={css.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={handleClose} className={css.backBtn}>Close</button>
      </div>
    </div>
  );
}
