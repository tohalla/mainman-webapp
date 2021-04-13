import React, { useRef } from "react";
import { FaBell } from "react-icons/fa";
import { defineMessages, FormattedMessage } from "react-intl";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Box, BoxProps, Flex, FlexProps } from "theme-ui";

import {
  acceptInvite,
  deleteInvite,
  fetchInvites,
  invitesKey,
  PendingInvite,
  useAccount,
} from "src/accounts";
import Button from "src/general/Button";
import useOnClickOutside from "src/hooks/useOnClickOutside";
import useToggle from "src/hooks/useToggle";

const messages = defineMessages({
  // text to display when no notifications
  noNotifications: "No notifications",
  // text for decline invite button
  decline: "Decline",
  // text for accept invite button
  accept: "Accept",
});

const Invite = ({
  invite,
  sx,
  ...props
}: { invite: PendingInvite } & FlexProps) => {
  const queryClient = useQueryClient();
  const { mutate: decline } = useMutation(deleteInvite, {
    onSuccess: () => {
      queryClient.setQueryData<Record<string, PendingInvite>>(
        invitesKey,
        ({ [invite.uuid]: _, ...invites } = {}) => invites
      );
    },
  });
  const { mutate: accept } = useMutation(acceptInvite, {
    onSuccess: () => {
      queryClient.setQueryData<Record<string, PendingInvite>>(
        invitesKey,
        ({ [invite.uuid]: _, ...invites } = {}) => invites
      );
    },
  });

  return (
    <Flex key={invite.uuid} sx={{ flexDirection: "column", ...sx }} {...props}>
      {invite.uuid}
      <Flex sx={{ justifyContent: "flex-end" }}>
        <Button onClick={() => decline(invite)} variant="plain">
          <FormattedMessage {...messages.decline} />
        </Button>
        <Button ml="default" onClick={() => accept(invite)} variant="plain">
          <FormattedMessage {...messages.accept} />
        </Button>
      </Flex>
    </Flex>
  );
};

const Notifications = ({ sx, ...props }: BoxProps) => {
  const { data: account } = useAccount();
  // TODO: support for other type of notifications
  const { data } = useQuery(
    invitesKey,
    () => account && fetchInvites(account),
    { enabled: typeof account !== "undefined" }
  );
  const [isOpen, toggleIsOpen, setIsOpen] = useToggle(false);
  const notificationsEl = useRef<HTMLDivElement>(null);
  useOnClickOutside(notificationsEl, () => setIsOpen(false));

  const notifications = Object.values(data ?? {});

  return (
    <Box ref={notificationsEl} sx={{ position: "relative", ...sx }} {...props}>
      <Button
        color="greyscale.8"
        onClick={toggleIsOpen}
        sx={{ "&:hover": { color: "greyscale.9" } }}
        variant="plain"
      >
        <FaBell />
      </Button>
      {notifications.length > 0 && (
        <Box
          sx={{
            position: "absolute",
            right: "-4px",
            bottom: 0,
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: "accent",
            userSelect: "none",
          }}
        >
          &nbsp;
        </Box>
      )}
      {isOpen && (
        <Flex
          p={3}
          sx={{
            position: "absolute",
            right: 0,
            flexDirection: "column",
            color: "black",
            backgroundColor: "greyscale.9",
            boxShadow: 1,
            whiteSpace: "nowrap",
          }}
        >
          {notifications.length ? (
            notifications.map((invite) => (
              <Invite key={invite.uuid} invite={invite} />
            ))
          ) : (
            <FormattedMessage {...messages.noNotifications} />
          )}
        </Flex>
      )}
    </Box>
  );
};

export default Notifications;
