import cx from "classnames";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

export function SectionHeading({ className, ...props }: SectionHeadingProps) {
  return <h2 className={cx("text-2xl font-bold text-center", className)} {...props} />;
}
