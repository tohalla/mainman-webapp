import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
import { Flex, Link as RebassLink } from "rebass";

export interface SubPage extends Required<Pick<LinkProps, "href">> {
  children: ReactNode;
  as: string;
}

interface SubPageLinkProps extends SubPage {
  isActive: boolean;
}

interface Props {
  pages: SubPage[];
}

const SubPageLink = ({ href, as, children, isActive }: SubPageLinkProps) => (
  <Link as={as} href={href}>
    <RebassLink
      color={isActive ? "greyscale.0" : undefined}
      fontSize={2}
      px={[4]}
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
      flexDirection="row"
      justifyContent={["flex-end"]}
      mt={[4]}
      pr={[0, 6]}
    >
      {pages?.map((page) => (
        <SubPageLink key={page.as} {...page} isActive={page.as === pathname} />
      ))}
    </Flex>
  );
};

export default SubNavigation;
