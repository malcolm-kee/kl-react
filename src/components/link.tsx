import NextLink from "next/link";

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
}

export function Link({
  to,
  target = to[0] !== "/" ? "_blank" : undefined,
  rel = target === "_blank" ? "noopener noreferrer" : undefined,
  children,
  ...props
}: LinkProps) {
  if (to[0] !== "/") {
    return (
      <a href={to} target={target} rel={rel} {...props}>
        {children}
      </a>
    );
  }

  return (
    <NextLink href={to} {...props}>
      {children}
    </NextLink>
  );
}
