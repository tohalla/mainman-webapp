import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import { Page } from "./MainNavigation/Items";

import { Flex, FlexProps, Link as RebassLink, LinkProps } from "rebass";

interface Props extends Omit<FlexProps, "css"> {
  pages?: Omit<Page[], "isActive">;
  linkProps?: Omit<LinkProps, "css">;
}

interface SubPageLinkProps
  extends Page,
    Omit<LinkProps, "css" | "children" | "href"> {
  isActive: boolean;
}

const SubPageLink = ({
  href,
  children,
  isActive,
  sx,
  ...props
}: SubPageLinkProps) => (
  <Link href={href}>
    <RebassLink
      fontSize={2}
      px={3}
      py={2}
      sx={{
        textDecoration: isActive ? "underline" : undefined,
        ...sx,
      }}
      {...props}
    >
      {children}
    </RebassLink>
  </Link>
);

const SubNavigation = ({ pages, sx, linkProps, ...props }: Props) => {
  const { pathname } = useRouter();

  if (!pages) {
    return null;
  }

  return (
    <Flex
      alignSelf="stretch"
      backgroundColor="greyscale.9"
      flexDirection="row"
      pt={2}
      px={4}
      sx={{
        boxShadow: 1,
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
