import { useRouter } from "next/router";
import React, { ReactFragment, useState, useEffect } from "react";
import { Flex, Box } from "rebass";

import MainNavigation from "../general/Navigation/MainNavigation";

import LayoutContext from "./LayoutContext";

import Loadable from "src/general/Loadadble";
import { Page } from "src/general/Navigation/MainNavigation/Items";

export interface Props {
  isLoading: boolean;
  children: ReactFragment;
  layoutProps: LayoutProps;
  ContentWrapper(props: { children: ReactFragment } & LayoutProps): JSX.Element;
}

export interface LayoutProps {
  title?: ReactFragment;
  description?: ReactFragment;
  renderContent?(content: ReactFragment): ReactFragment;
  options?: Record<string, boolean>;
  subPages?: Page[];
}

export const DefaultContentWrapper: Props["ContentWrapper"] = ({
  children,
  renderContent,
  description,
  title,
}) => {
  return (
    <>
      <Box mb={5}>
        {title && <h1>{title}</h1>}
        {description && <p>{description}</p>}
      </Box>
      {renderContent?.(children) ?? children}
    </>
  );
};

const DefaultLayout = ({
  children,
  isLoading,
  layoutProps,
  ContentWrapper,
}: Props) => {
  const [layoutContextProps, setLayoutContextProps] = useState(layoutProps);
  const { asPath } = useRouter();

  // reset to default
  useEffect(() => {
    setLayoutContextProps(layoutProps);
  }, [asPath]);

  return (
    <LayoutContext.Provider
      value={{
        layoutProps: {
          renderContent: (content: ReactFragment) => (
            <Flex mt={4}>{content}</Flex>
          ),
          ...layoutContextProps,
        },
        setTitle: (title) =>
          setLayoutContextProps({ ...layoutContextProps, title }),
      }}
    >
      <Flex flex={1} flexDirection="column">
        <MainNavigation subPages={layoutProps.subPages} />
        <Flex
          as="main"
          flex={1}
          flexDirection="column"
          mx={[2, 5]}
          my={[2, 5]}
          sx={{ h1: { color: "greyscale.2", m: 0 } }}
        >
          <Loadable isLoading={isLoading}>
            <ContentWrapper {...layoutContextProps}>{children}</ContentWrapper>
          </Loadable>
        </Flex>
      </Flex>
    </LayoutContext.Provider>
  );
};

const defaultProps: Partial<Props> = {
  ContentWrapper: DefaultContentWrapper,
};

DefaultLayout.defaultProps = defaultProps;

export default DefaultLayout;
