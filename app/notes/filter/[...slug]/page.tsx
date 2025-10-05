import fetchNotes from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { use } from "react";

type NotesPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default function NotesPage({ params }: NotesPageProps) {
  const { slug } = use(params);

  const queryClient = new QueryClient();
  const searchWord = "";
  const page = 1;
  const tag = slug?.[0] === "All" ? undefined : slug?.[0];

  queryClient.prefetchQuery({
    queryKey: ["notes", searchWord, page, tag],
    queryFn: () => fetchNotes(searchWord, page, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
