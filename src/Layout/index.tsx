import { useRouter } from "next/router";
import React, { ReactNode, useEffect, useState } from "react";
import { Flex, Box, Heading } from "theme-ui";

import MainNavigation from "../general/Navigation/MainNavigation";

import LayoutContext from "./LayoutContext";

import Loadable from "src/general/Loadadble";
import Loader from "src/general/Loadadble/Loader";
import { Page } from "src/general/Navigation/MainNavigation/Items";
import useIsomorphicLayoutEffect from "src/hooks/useIsomorphicLayoutEffect";

export interface Props {
  children: ReactNode;
  layoutProps: LayoutProps;
  ContentWrapper(props: { children: ReactNode } & LayoutProps): JSX.Element;
}

export interface LayoutProps {
  title?: ReactNode;
  description?: ReactNode;
  renderContent?(content: ReactNode): ReactNode;
  options?: Record<string, boolean>;
  subPages?: Page[];
}

export const DefaultContentWrapper: Props["ContentWrapper"] = ({
  children,
  renderContent,
  description,
  title,
}) => (
  <>
    <Box mb={5}>
      {title && (
        <Heading as="h1" m={0}>
          {title}
        </Heading>
      )}
      {description && <p>{description}</p>}
    </Box>
    {renderContent?.(children) ?? children}
  </>
);

const DefaultLayout = ({ children, layoutProps, ContentWrapper }: Props) => {
  const [layoutContextProps, setLayoutContextProps] = useState(layoutProps);
  const router = useRouter();
  const { asPath } = useRouter();
  const [isTransitioning, setIsTransitining] = useState(false);

  useEffect(() => {
    const handleStart = () => setIsTransitining(true);
    const handleDone = () => setIsTransitining(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleDone);
    router.events.on("routeChangeError", handleDone);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleDone);
      router.events.off("routeChangeError", handleDone);
    };
  }, []);

  // reset to default
  useIsomorphicLayoutEffect(() => {
    setLayoutContextProps(layoutProps);
  }, [asPath.split("?")[0]]);

  return (
    <LayoutContext.Provider
      value={{
        layoutProps: {
          renderContent: (content) => <Flex mt={4}>{content}</Flex>,
          ...layoutContextProps,
        },
        setTitle: (title) =>
          setLayoutContextProps({ ...layoutContextProps, title }),
      }}
    >
      <Loadable>
        <Flex sx={{ flex: 1, flexDirection: "column" }}>
          <MainNavigation subPages={layoutProps.subPages} />
          <Flex
            as="main"
            px={[3, 5]}
            py={[4, 5]}
            sx={{
              overflowX: "scroll",
              flex: 1,
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            {isTransitioning ? (
              <Loader />
            ) : (
              <ContentWrapper {...layoutContextProps}>
                {children}
              </ContentWrapper>
            )}
          </Flex>
        </Flex>
      </Loadable>
    </LayoutContext.Provider>
  );
};

const defaultProps: Partial<Props> = {
  ContentWrapper: DefaultContentWrapper,
  layoutProps: {},
};

DefaultLayout.defaultProps = defaultProps;

export default DefaultLayout;
