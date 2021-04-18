import React from "react";
import { useQuery } from "react-query";

import { Page } from "pages/_app";
import SanitizedHTML from "src/general/SanitizedHTML";
import useParam from "src/hooks/useParam";
import PlainLayout from "src/Layout/PlainLayout";
import {
  maintenanceTaskTemplateKey,
  fetchMaintenanceTaskTemplate,
  maintenancTaskKey,
  fetchMaintenanceTask,
} from "src/maintenance";
import MaintenanceReportForm from "src/maintenance/MaintenanceReportForm";

const MaintenanceReport: Page = () => {
  const taskUUID = useParam("task") ?? "";
  const { data } = useQuery(maintenancTaskKey(taskUUID), () =>
    fetchMaintenanceTask(taskUUID)
  );
  const { data: template } = useQuery(
    maintenanceTaskTemplateKey(taskUUID),
    () => fetchMaintenanceTaskTemplate(taskUUID)
  );

  if (typeof data === "undefined") {
    return null;
  }

  return (
    <>
      <SanitizedHTML>{template}</SanitizedHTML>
      <MaintenanceReportForm maintenanceTask={data} />
    </>
  );
};

MaintenanceReport.Layout = PlainLayout;

export default MaintenanceReport;
