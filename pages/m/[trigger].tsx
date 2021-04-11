import React from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import SanitizedHTML from "src/general/SanitizedHTML";
import useParam from "src/hooks/useParam";
import PlainLayout from "src/Layout/PlainLayout";
import {
  fetchMaintenanceTrigger,
  maintenanceTriggerKey,
  maintenanceRequestTemplateKey,
  fetchMaintenanceRequestTemplate,
} from "src/maintenance";
import MaintenanceRequestForm from "src/maintenance/MaintenanceRequestForm";

const CreateRequest: Page = () => {
  const triggerUUID = useParam("trigger") ?? "";
  const { data } = useQuery(maintenanceTriggerKey(triggerUUID), () =>
    fetchMaintenanceTrigger(triggerUUID)
  );
  const { data: template } = useQuery(
    maintenanceRequestTemplateKey(triggerUUID),
    () => fetchMaintenanceRequestTemplate(triggerUUID)
  );

  if (typeof data === "undefined") {
    return null;
  }

  return (
    <>
      <SanitizedHTML>{template}</SanitizedHTML>
      <MaintenanceRequestForm maintenanceTrigger={data} />
    </>
  );
};

CreateRequest.Layout = PlainLayout;

export default CreateRequest;
