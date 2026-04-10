import cx from "classnames";

const buttonClasses =
  "inline-flex items-center border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-500 active:bg-primary-700 transition ease-in-out duration-150";

interface NButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "large";
}

export function NButton({
  type = "button",
  size,
  className,
  children,
  ...buttonProps
}: NButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        buttonClasses,
        size === "large"
          ? "px-8 py-3 md:py-4 md:text-lg md:px-10"
          : "px-4 py-2",
        className
      )}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

interface NButtonLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  size?: "large";
  href: string;
}

export function NButtonLink({
  size,
  className,
  children,
  href,
  ...linkProps
}: NButtonLinkProps) {
  return (
    <a
      href={href}
      className={cx(
        buttonClasses,
        size === "large"
          ? "px-8 py-3 md:py-4 md:text-lg md:px-10"
          : "px-4 py-2",
        className
      )}
      {...linkProps}
    >
      {children}
    </a>
  );
}
