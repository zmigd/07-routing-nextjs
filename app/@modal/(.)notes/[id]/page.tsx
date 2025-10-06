// app/@modal/(.)notes/[id]/page.tsx
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotePreview from "./NotePreview.client";
import { fetchNoteById } from "@/lib/api";

type NoteModalProps = {
  params: { id: string };
};

export default async function NoteModal({ params }: NoteModalProps) {
  const { id } = params;

  const queryClient = new QueryClient();

  // Prefetch однієї нотатки за id
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotePreview noteId={id} />
    </HydrationBoundary>
  );
}
