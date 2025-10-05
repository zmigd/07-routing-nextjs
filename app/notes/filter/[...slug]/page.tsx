import fetchNotes from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";

type NotesPageProps = {
  params: {
    slug?: string[];
  };
};

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();
  const searchWord = "";
  const page = 1;

  const slug = params.slug?.[0];
  const tag = slug === "All" ? undefined : slug;

  await queryClient.prefetchQuery({
    queryKey: ["notes", searchWord, page, tag],
    queryFn: () => fetchNotes(searchWord, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
