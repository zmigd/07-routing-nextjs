import { getSingleNote } from "@/lib/api";

type Props = {
  params: { id: string };
};

export default async function NotePage({ params }: Props) {
  const note = await getSingleNote(params.id);

  return (
    <div>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
    </div>
  );
}
