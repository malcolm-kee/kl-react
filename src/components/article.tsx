import cx from "classnames";

interface ArticleProps extends React.HTMLAttributes<HTMLElement> {
  className?: string;
}

export function Article({ className, ...props }: ArticleProps) {
  return (
    <article
      className={cx("prose max-w-2xl px-2 sm:px-4 mx-auto", className)}
      {...props}
    />
  );
}
