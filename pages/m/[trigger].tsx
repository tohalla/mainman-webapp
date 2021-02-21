import React from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import useParam from "src/hooks/useParam";
import {
  fetchMaintenanceTrigger,
  maintenanceTriggerKey,
} from "src/maintenance";
import MaintenanceRequestForm from "src/maintenance/MaintenanceRequestForm";

const CreateRequest: Page = () => {
  const { data } = useQuery(
    maintenanceTriggerKey(useParam("trigger") as string),
    ({ queryKey: [_, uuid] }) => fetchMaintenanceTrigger(uuid)
  );

  if (typeof data === "undefined") {
    return null;
  }

  return <MaintenanceRequestForm maintenanceTrigger={data} />;
};

CreateRequest.Layout = ({ children }) => <>{children}</>;

export default CreateRequest;
