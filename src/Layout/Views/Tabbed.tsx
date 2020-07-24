import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import { Flex, Link as RebassLink } from "rebass";

interface TabProps extends Required<Pick<LinkProps, "href">> {
  children: ReactNode;
  isActive: boolean;
  as: string;
}

interface Props {
  children: ReactNode;
  initialTabs?: Omit<TabProps, "isActive">[];
}

const Tab = ({ href, as, children, isActive }: TabProps) => (
  <Link as={as} href={href}>
    <RebassLink
      backgroundColor={isActive ? "greyscale.9" : "none"}
      px={3}
      py={3}
      sx={{ whiteSpace: "nowrap" }}
    >
      {children}
    </RebassLink>
  </Link>
);

export default ({ children, initialTabs }: Props) => {
  const { pathname } = useRouter();
  return (
    <Flex flex="1">
      <Flex backgroundColor="greyscale.9" flex="1">
        {children}
      </Flex>
      <Flex alignItems="stretch" flex="0 0 auto" flexDirection="column">
        {initialTabs?.map((tab) => (
          <Tab key={tab.as} isActive={pathname === tab.as} {...tab} />
        ))}
      </Flex>
    </Flex>
  );
};
