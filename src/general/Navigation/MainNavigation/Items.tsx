import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";
import { FormattedMessage } from "react-intl";
import { Link as RebassLink } from "rebass";

import { getColor } from "../../../theme/colors";
import styled from "../../../theme/styled";

import messages from "./messages";

const items = () => [
  {
    content: <FormattedMessage {...messages.overview} />,
    href: "/",
  },
  {
    content: <FormattedMessage {...messages.appliances} />,
    href: `/appliances`,
    as: `/appliances`,
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
        .map(({ content, href, as }) => {
          const Component =
            router.pathname === href ||
            (href !== "/" && router.pathname.startsWith(href))
              ? ActiveNavLink
              : NavLink;
          return (
            <Link key={href} as={as} href={href}>
              <Component onClick={onClick} px={4} py={4}>
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
  text-decoration: underline;
  &,
  &:hover {
    color: ${getColor(["greyscale", 0])};
  }
`;

export default Items;
