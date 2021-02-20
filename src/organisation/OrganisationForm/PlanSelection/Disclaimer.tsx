import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Box } from "theme-ui";

const messages = defineMessages({
  // text for storage disclaimer
  storageDisclaimer: "All paid plans have unlimited storage during the beta.",
});

const Disclaimer = () => (
  <Box color="neutral" sx={{ fontSize: 1 }}>
    <FormattedMessage tagName="div" {...messages.storageDisclaimer} />
  </Box>
);

export default Disclaimer;
