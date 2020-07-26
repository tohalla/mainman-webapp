import { useTheme } from "emotion-theming";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Flex } from "rebass";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import useToggle from "../../../hooks/useToggle";
import { Theme } from "../../../theme";
import PlainButton from "../../Button/PlainButton";

import AccountMenu from "./AccountMenu";
import Items from "./Items";

const MainNavigation = () => {
  const { breakpoints, colors } = useTheme<Theme>();
  const containerEl = useRef<HTMLDivElement>(null);
  const [expand, toggleExpand, setExpand] = useToggle(false);
  const [width, setWidth] = useState(
    typeof window === "undefined" ? 0 : window.innerWidth
  );
  const mobileNav = useMemo(
    () => width > 0 && width <= Number.parseInt(breakpoints[0], 10),
    [width]
  );
  useOnClickOutside(containerEl, () => {
    if (width <= Number.parseInt(breakpoints[0], 10)) {
      setExpand(false);
    }
  });

  const height: undefined | number = useMemo(
    () => containerEl.current?.clientHeight,
    [containerEl.current]
  );

  useEffect(() => {
    const updateDimensions = () => setWidth(window.innerWidth);
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Flex
      sx={{
        position: ["relative", "dynamic"],
        minHeight: height,
      }}
    >
      <Flex
        ref={containerEl}
        alignItems={["stretch", "center"]}
        backgroundColor={colors.greyscale[9]}
        flexDirection={["column", "row"]}
        justifyContent="space-between"
        px={[0, 3]}
        sx={{
          boxShadow: 1,
          position: height ? ["absolute", "dynamic"] : "dynamic",
        }}
        width="100%"
      >
        {mobileNav && (
          <PlainButton
            alignSelf="flex-end"
            flex="1"
            onClick={toggleExpand}
            p={4}
          >
            <FaBars />
          </PlainButton>
        )}
        {(!mobileNav || expand) && (
          <>
            <Flex
              alignItems={["stretch", "center"]}
              flex={1}
              flexDirection={["column", "row"]}
            >
              <Items onClick={toggleExpand} />
            </Flex>
            <AccountMenu />
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default MainNavigation;
