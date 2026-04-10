import type { Update as UpdateType } from "@/lib/types";
import { isFilledArray } from "@/lib/data";
import { Link } from "./link";

interface UpdateProps {
  update: UpdateType;
}

export function Update({ update }: UpdateProps) {
  return (
    <article className="mb-8 lg:grid lg:grid-cols-4 lg:gap-4">
      <div className="text-xl font-bold mb-2">{update.title}</div>
      <div className="prose lg:col-span-2">
        <p className="whitespace-pre-wrap">{update.description}</p>
      </div>
      <div className="prose">
        {isFilledArray(update.links) && (
          <ul>
            {update.links.map((link) => (
              <li key={link.url}>
                <Link to={link.url}>{link.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
