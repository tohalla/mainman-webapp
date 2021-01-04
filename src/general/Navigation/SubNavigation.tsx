import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { Flex, Link as RebassLink } from "rebass";

import { Page } from "./MainNavigation/Items";

interface Props {
  pages: Omit<Page[], "isActive">;
}

const SubPageLink = ({
  href,
  as,
  children,
  isActive,
}: Page & { isActive: boolean }) => (
  <Link as={as} href={href}>
    <RebassLink
      color={isActive ? "greyscale.0" : undefined}
      fontSize={2}
      px={[3]}
      sx={{
        textDecoration: isActive ? "underline" : undefined,
        ":hover": { color: isActive ? "greyscale.0" : undefined },
      }}
    >
      {children}
    </RebassLink>
  </Link>
);

const SubNavigation = ({ pages }: Props) => {
  const { pathname } = useRouter();

  return (
    <Flex
      alignSelf="stretch"
      backgroundColor="greyscale.9"
      flexDirection="row"
      px={4}
      py={2}
      sx={{
        boxShadow: 1,
      }}
    >
      {pages?.map((page) => (
        <SubPageLink key={page.as} {...page} isActive={page.as === pathname} />
      ))}
    </Flex>
  );
};

export default SubNavigation;
