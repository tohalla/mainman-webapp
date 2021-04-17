import React from "react";
import { FaCheck, FaExclamationTriangle, FaWrench } from "react-icons/fa";
import { defineMessages, FormattedMessage } from "react-intl";
import { Box, Flex } from "theme-ui";

import { Entity } from "..";

import Tooltip from "src/general/Tooltip";

const messages = defineMessages({
  // tooltip text for pending requests
  pendingRequests: "{count} Pending requests",
  // tooltip text for unfinished events
  unfinishedEvents: "{count} Active maintenances",
  // tooltip text for ok status
  ok: "Everything seems to be in order",
});

const EntityStatus = ({
  pendingRequests = 0,
  unfinishedEvents = 0,
}: Entity) => {
  if (pendingRequests === 0 && unfinishedEvents === 0) {
    return (
      <Tooltip content={<FormattedMessage {...messages.ok} />}>
        <Box color="indicator.success">
          <FaCheck />
        </Box>
      </Tooltip>
    );
  }
  return (
    <Flex sx={{ "div + div": { ml: 3 } }}>
      {pendingRequests > 0 && (
        <Tooltip
          content={
            <FormattedMessage
              {...messages.pendingRequests}
              values={{ count: pendingRequests }}
            />
          }
        >
          <Box color="indicator.warning">
            <FaExclamationTriangle display="block" />
          </Box>
        </Tooltip>
      )}
      {unfinishedEvents > 0 && (
        <Tooltip
          content={
            <FormattedMessage
              {...messages.unfinishedEvents}
              values={{ count: unfinishedEvents }}
            />
          }
        >
          <Box>
            <FaWrench display="block" />
          </Box>
        </Tooltip>
      )}
    </Flex>
  );
};

export default EntityStatus;
