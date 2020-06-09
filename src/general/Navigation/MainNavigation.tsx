import { useTheme } from "emotion-theming";
import React, { useRef, useState, useMemo, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Flex, Box } from "rebass";

import useOnClickOutside from "../../hooks/useOnClickOutside";
import { Theme } from "../../theme";
import PlainButton from "../Button/PlainButton";

const MainNavigation = () => {
  const { breakpoints } = useTheme<Theme>();
  const containerEl = useRef(null);
  const [expand, setExpand] = useState(false);
  const [width, setWidth] = useState(
    typeof window === "undefined" ? 0 : window.innerWidth
  );

  const mobileNav = useMemo(
    () => width <= Number.parseInt(breakpoints[0], 10),
    [width]
  );

  useOnClickOutside(containerEl, () => {
    if (width <= Number.parseInt(breakpoints[0], 10)) {
      setExpand(false);
    }
  });

  useEffect(() => {
    const updateDimensions = () => setWidth(window.innerWidth);
    window.addEventListener("resize", updateDimensions);
    updateDimensions();
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <Flex
      ref={containerEl}
      as="nav"
      flexDirection={["column", "row"]}
      justifyContent="space-between"
    >
      {mobileNav && (
        <PlainButton onClick={() => setExpand(!expand)}>
          <FaBars />
        </PlainButton>
      )}
      {(!mobileNav || expand) && (
        <>
          <Flex flexDirection={["column", "row"]}>items</Flex>
          <Box>auth</Box>
        </>
      )}
    </Flex>
  );
};

export default MainNavigation;
