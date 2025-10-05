import { getSingleNote } from '@/lib/api';

type Props = {
  params: { id: string };
};

const NotePage = async ({ params }: Props) => {
  const { id } = params;
  const note = await getSingleNote(id);

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
    </div>
  );
};

export default NotePage;
