import SidebarNotes from "./filter/@sidebar/SidebarNotes";
import css from "./filter/[...slug]/LayoutNotes.module.css";

export default function FilterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>
      <main className={css.mainContent}>
        {children} {/* Тут буде NotesClient для вибраного тегу */}
      </main>
    </div>
  );
}
