import { Article } from "./article";
import { PageTitle } from "./page-title";

interface NoteProps {
  title: string;
  children: React.ReactNode;
}

export function Note({ title, children }: NoteProps) {
  return (
    <Article>
      <PageTitle>{title}</PageTitle>
      {children}
    </Article>
  );
}
