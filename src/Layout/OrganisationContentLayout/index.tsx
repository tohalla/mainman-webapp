import { useRouter } from "next/router";
import { identity } from "ramda";
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";

import DefaultLayout, { Props, DefaultContentWrapper } from "..";

import WithHeading from "./WithHeading";

import { Organisation, fetchOrganisations } from "src/organisation";
import OrganisationContext from "src/organisation/OrganisationContext";
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

  const { data } = useQuery("organisations", fetchOrganisations);
  const [activeOrganisation, setActiveOrganisation] = useState<
    Organisation | undefined
  >();

  useEffect(() => {
    if (activeOrganisation || !data) {
      return;
    }
    const organisations = Object.values(data);
    const organisation = getParam("organisation", query);
    if (organisation && organisations.length > 1 && organisation in data) {
      setActiveOrganisation(data[organisation]);
    } else {
      setActiveOrganisation(Object.values(data)[0]);
    }
  }, [data, activeOrganisation, query]);
  // update path
  useEffect(() => {
    // no need for update path if do not have access to multiple organisations
    if (!data || Object.entries(data).length <= 1) {
      return;
    }
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
  }, [activeOrganisation, asPath, pathname, data]);

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
