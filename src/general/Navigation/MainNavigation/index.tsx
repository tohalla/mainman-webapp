import React, { useRef, useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useThemeUI, Flex } from "theme-ui";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import useToggle from "../../../hooks/useToggle";
import PlainButton from "../../Button/PlainButton";
import SubNavigation from "../SubNavigation";

import AccountMenu from "./AccountMenu";
import Items, { Page } from "./Items";

interface Props {
  subPages?: Page[];
}

const MainNavigation = ({ subPages }: Props) => {
  const {
    theme: { breakpoints },
  } = useThemeUI();
  const containerEl = useRef<HTMLDivElement>(null);
  const [expand, toggleExpand, setExpand] = useToggle(false);
  const [mobileNav, setMobileNav] = useState(
    typeof window === "undefined"
      ? 0
      : window.innerWidth <= Number.parseInt(String(breakpoints?.[0]), 10)
  );
  useOnClickOutside(containerEl, () => {
    if (mobileNav) {
      setExpand(false);
    }
  });

  useEffect(() => {
    const mobile = window.matchMedia(
      `(max-width: ${String(breakpoints?.[0])})`
    );

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
          px={[0, 3]}
          sx={{
            flexDirection: "column",
            boxShadow: 1,
            position: "relative",
            width: "100%",
            a: {
              textShadow: "text.light.2",
              userSelect: "none",
              "&:hover": { textShadow: "none" },
            },
          }}
        >
          {mobileNav && (
            <PlainButton
              color="text.light"
              onClick={toggleExpand}
              p={4}
              sx={{ alignSelf: "flex-end" }}
            >
              <FaBars />
            </PlainButton>
          )}
          {(!mobileNav || expand) && (
            <Flex
              backgroundColor="greyscale.1"
              sx={{
                flex: 1,
                flexDirection: ["column", "row"],
                justifyContent: "space-between",
                alignItems: ["stretch", "center"],
                zIndex: 1,
                ...(mobileNav
                  ? { position: "absolute", top: "100%", left: 0, right: 0 }
                  : undefined),
              }}
            >
              <Flex sx={{ flexDirection: "row" }}>
                <Flex
                  sx={{
                    alignItems: ["stretch", "center"],
                    flex: 1,
                    flexDirection: ["column", "row"],
                  }}
                >
                  <Items onClick={toggleExpand} />
                </Flex>
                {mobileNav && (
                  <SubNavigation
                    backgroundColor="greyscale.2"
                    color="text.light"
                    linkProps={{ color: "greyscale.7", py: 3, px: 4 }}
                    pages={subPages}
                    px={0}
                    py={3}
                    sx={{
                      alignItems: "stretch",
                      flex: 1,
                      flexDirection: "column",
                    }}
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
