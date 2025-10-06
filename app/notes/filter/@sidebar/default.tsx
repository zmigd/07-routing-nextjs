"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./SidebarNotes.module.css"; // використовуємо готові стилі

const tags = ["All", "Work", "Personal", "Shopping", "Meeting"];

export default function SidebarDefault() {
  const pathname = usePathname();

  return (
    <aside className={css.sidebar}>
      
      <ul className={css.menuList}>
        {tags.map((tag) => {
          // для All робимо коректний маршрут
          const href = tag === "All" ? "/notes/filter/All" : `/notes/filter/${tag}`;
          const isActive = pathname === href;

          return (
            <li key={tag} className={css.menuItem}>
              <Link
                href={href}
                className={`${css.menuLink} ${isActive ? css.active : ""}`}
              >
                {tag}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
