import { useRouter } from "next/router";
import { identity } from "ramda";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import DefaultLayout, { Props, DefaultContentWrapper } from "..";

import WithHeading from "./WithHeading";

import { Organisation, fetchOrganisations } from "src/organisations";
import OrganisationContext from "src/organisations/OrganisationContext";
import { formatQuery } from "src/util/api";
import { getParam } from "src/util/routing";

const Content: Props["ContentWrapper"] = ({
  children,
  options,
  description,
  title,
  renderContent,
}) => {
  return options?.organisationSelect ?? true ? (
    <WithHeading description={description} title={title}>
      {children && renderContent?.(children)}
    </WithHeading>
  ) : (
    <DefaultContentWrapper
      description={description}
      options={options}
      renderContent={renderContent}
      title={title}
    >
      {children}
    </DefaultContentWrapper>
  );
};

const OrganisationContentLayout = ({
  children,
  layoutProps,
  ...props
}: Partial<Props>) => {
  const { query, asPath, replace, pathname } = useRouter();

  const { data: organisations } = useQuery("organisations", fetchOrganisations);
  const [activeOrganisation, setActiveOrganisation] = useState<
    Organisation | undefined
  >();

  useEffect(() => {
    if (activeOrganisation || !organisations) {
      return;
    }
    const organisation = getParam("organisation", query);
    if (organisation && organisation in organisations) {
      setActiveOrganisation(organisations[organisation]);
    } else {
      setActiveOrganisation(Object.values(organisations)[0]);
    }
  }, [organisations, activeOrganisation, query]);
  // update path
  useEffect(() => {
    const organisation = getParam("organisation", query);
    if (activeOrganisation && Number(organisation) !== activeOrganisation.id) {
      void replace(
        { pathname },
        `${asPath.split("?")[0]}${formatQuery({
          organisation: activeOrganisation.id,
        })}`,
        { shallow: true }
      );
    }
  }, [activeOrganisation, asPath, pathname]);

  return (
    <OrganisationContext.Provider
      value={{ activeOrganisation, setActiveOrganisation }}
    >
      <DefaultLayout
        ContentWrapper={Content}
        layoutProps={{ renderContent: identity, ...layoutProps }}
        {...props}
      >
        {children}
      </DefaultLayout>
    </OrganisationContext.Provider>
  );
};

export default OrganisationContentLayout;
