import React from "react";
import {
  FaCcAmex,
  FaCcDinersClub,
  FaCcMastercard,
  FaCcVisa,
  FaCreditCard,
} from "react-icons/fa";
import { defineMessages, FormattedMessage } from "react-intl";
import { useMutation, useQueryClient } from "react-query";
import { Box, Flex, Card as ThemeUICard, Badge } from "theme-ui";

import {
  CardPaymentMethod,
  deletePaymentMethod,
  PaymentMethod,
  stripeKey,
} from "..";

import Button from "src/general/Button";
import { CardProps } from "src/general/CardOptions";
import generalMessages from "src/general/messages";

const messages = defineMessages({
  // text for default payment method
  defaultPaymentMethod: "Default",
});

interface Props extends CardProps<CardPaymentMethod> {
  defaultPaymentMethod?: PaymentMethod;
}

const cardIcons: Record<string, JSX.Element> = {
  visa: <FaCcVisa />,
  amex: <FaCcAmex />,
  mastercard: <FaCcMastercard />,
  diners: <FaCcDinersClub />,
};

const Card = ({
  value: paymentMethod,
  sx,
  defaultPaymentMethod,
  ...props
}: Props) => {
  const queryClient = useQueryClient();
  const { mutate: deleteCard, isLoading } = useMutation(
    () => deletePaymentMethod(paymentMethod),
    { onSuccess: () => queryClient.invalidateQueries(stripeKey) }
  );
  const { card } = paymentMethod;

  return (
    <ThemeUICard
      {...props}
      sx={{
        borderRadius: 3,
        borderStyle:
          defaultPaymentMethod?.id === paymentMethod.id ? "solid" : "none",
        borderWidth: 0,
        ...sx,
      }}
    >
      <Flex mb={4} sx={{ justifyContent: "space-between" }}>
        <Box sx={{ fontSize: 1 }}>**** **** **** {card.last4}</Box>
        <Box color="greyscale.3">
          {cardIcons[card.brand] ?? <FaCreditCard />}
        </Box>
      </Flex>
      <Box>{`${card.expMonth}/${card.expYear}`}</Box>
      <Flex
        mt={2}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          border: 1,
        }}
      >
        {defaultPaymentMethod?.id === paymentMethod.id ? (
          <Badge variant="tag">
            <FormattedMessage {...messages.defaultPaymentMethod} />
          </Badge>
        ) : (
          <span />
        )}
        <Button
          loading={isLoading}
          onClick={() => deleteCard()}
          py={2}
          variant="plain"
        >
          <FormattedMessage {...generalMessages.delete} />
        </Button>
      </Flex>
    </ThemeUICard>
  );
};

export default Card;
