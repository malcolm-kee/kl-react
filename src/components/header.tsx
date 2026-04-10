"use client";

import cx from "classnames";
import { usePathname } from "next/navigation";
import { siteMetadata } from "@/lib/site";
import { Container } from "./container";
import { Icon } from "./icon";
import { NLink } from "./nav-link";

export function Header() {
  const pathname = usePathname();
  const flat = pathname === "/";

  return (
    <header
      className={cx(
        flat
          ? "absolute top-0 left-0 right-0 z-50"
          : "bg-white border-b border-gray-200 xl:sticky xl:top-0 xl:z-50"
      )}
    >
      <Container>
        <div className="flex sm:justify-between">
          <div className="flex flex-1 justify-between sm:justify-start">
            <NLink
              className="text-xl h-16 font-bold px-1 flex-shrink-0 rounded text-primary-500"
              to="/"
              innerClass="inline-flex items-center"
            >
              <Icon className="mr-2 inline-block" />
              <span className="hidden sm:inline-block">
                {siteMetadata.title}
              </span>
            </NLink>
            <div className="flex flex-wrap justify-end space-x-2 sm:justify-start sm:-my-px sm:ml-6 sm:space-x-6">
              <HeaderLink to="/events">Events</HeaderLink>
              <HeaderLink to="/speakers">Speakers</HeaderLink>
              <HeaderLink to="/talks">Talks</HeaderLink>
            </div>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <NLink
              to="/submit-a-talk"
              className={cx(
                "border border-transparent text-base leading-6 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-500 focus:border-primary-700 active:bg-primary-700 transition ease-in-out duration-150 px-4 py-2",
                flat && "relative"
              )}
            >
              Submit a Talk
            </NLink>
          </div>
        </div>
      </Container>
    </header>
  );
}

interface HeaderLinkProps {
  to: string;
  children: React.ReactNode;
}

function HeaderLink({ to, children }: HeaderLinkProps) {
  return (
    <NLink
      className="px-3 py-3 sm:pt-1 sm:pb-0 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-900 transition duration-150 ease-in-out"
      to={to}
      activeClassName="border-primary-500"
    >
      {children}
    </NLink>
  );
}
