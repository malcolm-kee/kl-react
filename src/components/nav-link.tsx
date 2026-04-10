"use client";

import cx from "classnames";
import { usePathname } from "next/navigation";
import { Link } from "./link";

interface NLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  innerClass?: string;
  children: React.ReactNode;
  primary?: boolean;
  to: string;
  activeClassName?: string;
}

export function NLink({
  className,
  innerClass,
  children,
  primary,
  activeClassName,
  to,
  ...linkProps
}: NLinkProps) {
  const pathname = usePathname();
  const isActive = activeClassName ? pathname === to : false;

  return (
    <Link
      className={cx(
        "inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary-500 rounded",
        primary && "text-primary-700 hover:underline",
        isActive && activeClassName,
        className
      )}
      tabIndex={0}
      to={to}
      {...linkProps}
    >
      <span className={cx("focus:outline-none", innerClass)} tabIndex={-1}>
        {children}
      </span>
    </Link>
  );
}
