import cx from "classnames";

interface IconLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
}

export function IconLink({
  to,
  href = to,
  children,
  className,
  ...props
}: IconLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(
        "inline-block p-2 rounded-full text-gray-500 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
