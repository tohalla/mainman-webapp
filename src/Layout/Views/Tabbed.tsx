import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import React, { ReactNode } from "react";
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
      backgroundColor={isActive ? "greyscale.9" : "greyscale.7"}
      flex="0 0 auto"
      pb={2}
      pt={3}
      px={3}
      sx={{
        userSelect: "none",
        whiteSpace: "nowrap",
        marginTop: isActive ? 0 : 2,
      }}
    >
      {children}
    </RebassLink>
  </Link>
);

const Tabbed = ({ children, initialTabs }: Props) => {
  const { pathname } = useRouter();
  return (
    <Flex flex={0} flexDirection="column">
      <Flex mb={-3} mx={3} overflowX="scroll" pb={3}>
        <Flex flex="0 0 auto" flexDirection="row">
          {initialTabs?.map((tab) => (
            <Tab key={tab.as} isActive={pathname === tab.as} {...tab} />
          ))}
        </Flex>
      </Flex>
      <Flex backgroundColor="greyscale.9" flex="1" px={4} py={4}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Tabbed;
