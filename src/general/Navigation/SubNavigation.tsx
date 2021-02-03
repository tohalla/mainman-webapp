import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Flex, FlexProps, Link as ThemeUILink, LinkProps } from "theme-ui";

import { Page } from "./MainNavigation/Items";

interface Props extends FlexProps {
  pages?: Omit<Page[], "isActive">;
  linkProps?: LinkProps;
}

interface SubPageLinkProps extends Page, Omit<LinkProps, "children" | "href"> {
  isActive: boolean;
}

const SubPageLink = ({
  href,
  children,
  isActive,
  sx,
  ...props
}: SubPageLinkProps) => (
  <Link href={href} passHref>
    <ThemeUILink
      px={3}
      py={2}
      sx={{
        fontSize: 2,
        textDecoration: isActive ? "underline" : undefined,
        ...sx,
      }}
      {...props}
    >
      {children}
    </ThemeUILink>
  </Link>
);

const SubNavigation = ({ pages, sx, linkProps, ...props }: Props) => {
  const { pathname } = useRouter();

  if (!pages) {
    return null;
  }

  return (
    <Flex
      backgroundColor="greyscale.9"
      pt={2}
      px={4}
      sx={{
        flexDirection: "row",
        alignSelf: "stretch",
        boxShadow: 1,
        a: {
          userSelect: "none",
        },
        ...sx,
      }}
      {...props}
    >
      {pages?.map((page) => (
        <SubPageLink
          key={page.href}
          {...page}
          isActive={page.href === pathname}
          {...linkProps}
        />
      ))}
    </Flex>
  );
};

export default SubNavigation;
