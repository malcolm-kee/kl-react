import cx from "classnames";
import { Container } from "./container";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: React.ReactNode;
  className?: string;
}

export function Section({
  title,
  description,
  children,
  className,
  ...props
}: SectionProps) {
  return (
    <Container className={cx("lg:grid lg:grid-cols-4", className)} {...props}>
      <div className="space-y-5 sm:space-y-4 pb-4">
        {title && (
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
        )}
        {description}
      </div>
      <div className="lg:col-span-3">{children}</div>
    </Container>
  );
}
