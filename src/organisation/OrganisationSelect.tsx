import React, { useContext } from "react";
import { FormattedMessage } from "react-intl";
import { useQuery } from "react-query";

import Loadable from "../general/Loadadble";
import Select from "../general/Select";

import messages from "./messages";
import OrganisationContext from "./OrganisationContext";

import { fetchOrganisations } from ".";

const OrganisationSelect = () => {
  const { setActiveOrganisation, activeOrganisation } = useContext(
    OrganisationContext
  );
  const { data: organisations, isFetching } = useQuery(
    "organisations",
    fetchOrganisations
  );

  return (
    <Loadable isLoading={isFetching}>
      {organisations && (
        <Select
          label={<FormattedMessage {...messages.activeOrganisation} />}
          name="organisation"
          onChange={(event) =>
            setActiveOrganisation(organisations[event.currentTarget.value])
          }
          value={activeOrganisation?.id}
        >
          {Object.values(organisations).map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </Select>
      )}
    </Loadable>
  );
};

OrganisationSelect.displayName = "OrganisationSelect";

export default OrganisationSelect;
