import { useTheme } from "emotion-theming";
import React, { useRef, useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import useToggle from "../../../hooks/useToggle";
import PlainButton from "../../Button/PlainButton";
import SubNavigation from "../SubNavigation";

import AccountMenu from "./AccountMenu";
import Items, { Page } from "./Items";

import { Flex } from "rebass";
import theme from "src/theme";

interface Props {
  subPages?: Page[];
}

const MainNavigation = ({ subPages }: Props) => {
  const { breakpoints } = useTheme<typeof theme>();
  const containerEl = useRef<HTMLDivElement>(null);
  const [expand, toggleExpand, setExpand] = useToggle(false);
  const [mobileNav, setMobileNav] = useState(
    typeof window === "undefined"
      ? 0
      : window.innerWidth <= Number.parseInt(breakpoints[0], 10)
  );
  useOnClickOutside(containerEl, () => {
    if (mobileNav) {
      setExpand(false);
    }
  });

  useEffect(() => {
    const mobile = window.matchMedia(`(max-width: ${breakpoints[0]})`);

    const onMobile = ({ matches }: MediaQueryListEvent) => {
      setMobileNav(matches);
    };
    mobile.addEventListener("change", onMobile);

    return () => mobile.removeEventListener("change", onMobile);
  }, [breakpoints]);

  return (
    <>
      <Flex
        sx={{
          position: "relative",
        }}
      >
        <Flex
          ref={containerEl}
          backgroundColor="greyscale.1"
          color="text.light"
          flexDirection="column"
          px={[0, 3]}
          sx={{
            boxShadow: 1,
            position: "relative",
          }}
          width="100%"
        >
          {mobileNav && (
            <PlainButton
              alignSelf="flex-end"
              color="text.light"
              onClick={toggleExpand}
              p={4}
            >
              <FaBars />
            </PlainButton>
          )}
          {(!mobileNav || expand) && (
            <Flex
              alignItems={["stretch", "center"]}
              backgroundColor="greyscale.1"
              flex={1}
              flexDirection={["column", "row"]}
              justifyContent="space-between"
              sx={{
                zIndex: 1,
                ...(mobileNav
                  ? { position: "absolute", top: "100%", left: 0, right: 0 }
                  : undefined),
              }}
            >
              <Flex flexDirection="row">
                <Flex
                  alignItems={["stretch", "center"]}
                  flex={1}
                  flexDirection={["column", "row"]}
                >
                  <Items onClick={toggleExpand} />
                </Flex>
                {mobileNav && (
                  <SubNavigation
                    alignItems="stretch"
                    backgroundColor="greyscale.2"
                    color="text.light"
                    flex={1}
                    flexDirection="column"
                    linkProps={{ color: "greyscale.7", py: 3, px: 4 }}
                    pages={subPages}
                    px={0}
                    py={3}
                  />
                )}
              </Flex>
              <AccountMenu />
            </Flex>
          )}
        </Flex>
      </Flex>
      {!mobileNav && <SubNavigation pages={subPages} />}
    </>
  );
};

export default MainNavigation;
