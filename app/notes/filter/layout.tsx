import SidebarNotes from "./@sidebar/SidebarNotes";
import css from "./[...slug]/LayoutNotes.module.css";

type FilterLayoutProps = {
  children: React.ReactNode;
};

export default function FilterLayout({ children }: FilterLayoutProps) {
  return (
    <div className={css.container}>
      <aside className={css.sidebar}>
        <SidebarNotes />
      </aside>

      <div className={css.notesWrapper}>
        <main className={css.mainContent}>
          {children} 
        </main>
      </div>
    </div>
  );
}
