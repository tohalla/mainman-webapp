import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEventHandler, ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Link as ThemeUILink } from "theme-ui";

import messages from "./messages";

export interface Page {
  children: ReactNode;
  href: string;
}

const items = (): Page[] => [
  {
    children: <FormattedMessage {...messages.overview} />,
    href: "/",
  },
  {
    children: <FormattedMessage {...messages.entities} />,
    href: `/entities`,
  },
  {
    children: <FormattedMessage {...messages.maintainers} />,
    href: `/maintainers`,
  },
  {
    children: <FormattedMessage {...messages.organisation} />,
    href: `/organisation`,
  },
];

interface Props {
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

const Items = ({ onClick }: Props) => {
  const router = useRouter();

  return (
    <>
      {items()
        .filter(
          (link): link is Exclude<typeof link, undefined> =>
            typeof link !== "undefined"
        )
        .map((page) => {
          const isActive =
            router.pathname === page.href ||
            (page.href !== "/" && router.pathname.startsWith(page.href));
          return (
            <PageLink
              key={page.href}
              onClick={onClick}
              {...page}
              isActive={isActive}
            />
          );
        })}
    </>
  );
};

const PageLink = ({
  href,
  children,
  isActive,
  onClick,
}: Page & { isActive: boolean } & Pick<Props, "onClick">) => (
  <Link href={href} passHref>
    <ThemeUILink
      color={`greyscale.${isActive ? 9 : 8}`}
      onClick={onClick}
      px={4}
      py={4}
      sx={{
        fontSize: 2,
        textDecoration: isActive ? "underline" : "none",
        ":hover": { color: isActive ? "greyscale.9" : "none" },
      }}
    >
      {children}
    </ThemeUILink>
  </Link>
);

export default Items;
