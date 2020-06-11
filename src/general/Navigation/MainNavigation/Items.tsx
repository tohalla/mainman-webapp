import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactFragment } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RebassLink } from "rebass";

import { getColor } from "../../../theme/colors";
import styled from "../../../theme/styled";

import messages from "./messages";

const items = [
  { content: <FormattedMessage {...messages.overview} />, href: "/" },
  {
    content: <FormattedMessage {...messages.appliances} />,
    href: "/appliances",
  },
];

const Items = () => {
  const router = useRouter();
  return (
    <>
      {items
        // .filter((page) => !page.condition || whereEq(page.condition, account))
        .map<ReactFragment>(({ content, href }) => {
          const Component =
            router.pathname === href ||
            (href !== "/" && router.pathname.startsWith(href))
              ? ActiveNavLink
              : NavLink;
          return (
            <Link key={href} href={`${href}`}>
              <Component px={4} py={4}>
                {content}
              </Component>
            </Link>
          );
        })}
    </>
  );
};

const NavLink = styled(RebassLink)`
  user-select: none;
  color: ${getColor(["greyscale", 2])};
`;

const ActiveNavLink = styled(NavLink)`
  &,
  &:hover {
    color: ${getColor(["greyscale", 0])};
  }
`;

export default Items;
