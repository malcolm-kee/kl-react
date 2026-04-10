import cx from "classnames";

interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export function PageTitle({ className, ...props }: PageTitleProps) {
  return (
    <h1
      className={cx(
        "text-3xl font-bold leading-tight text-gray-900 mb-4",
        className
      )}
      {...props}
    />
  );
}
