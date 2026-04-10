import type { Update as UpdateType } from "@/lib/types";
import { isFilledArray } from "@/lib/data";
import { Update } from "./update";

interface UpdatesProps {
  updates: UpdateType[];
  title?: string;
}

export function Updates({ updates, title }: UpdatesProps) {
  if (!isFilledArray(updates)) {
    return null;
  }

  return (
    <>
      {title && (
        <h2 className="text-2xl font-bold text-center">{title}</h2>
      )}
      <ul>
        {updates.map((update, i) => (
          <li key={i}>
            <Update update={update} />
          </li>
        ))}
      </ul>
    </>
  );
}
