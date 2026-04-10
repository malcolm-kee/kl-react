import cx from "classnames";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cx("max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}
      {...props}
    />
  );
}
