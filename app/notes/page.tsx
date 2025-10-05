import { redirect } from "next/navigation";

export default async function NotesPage() {
  // Редирект на /notes/filter/All
  redirect("/notes/filter/All");
}
