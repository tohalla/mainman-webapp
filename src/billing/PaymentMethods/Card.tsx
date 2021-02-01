import { PaymentMethod } from "@stripe/stripe-js";
import React from "react";
import {
  FaCcAmex,
  FaCcDinersClub,
  FaCcMastercard,
  FaCcVisa,
  FaCreditCard,
} from "react-icons/fa";
import { Box, Flex, Card as ThemeUICard } from "theme-ui";

interface Props {
  card: PaymentMethod.Card;
}

const cardIcons: Record<string, JSX.Element> = {
  visa: <FaCcVisa />,
  amex: <FaCcAmex />,
  mastercard: <FaCcMastercard />,
  diners: <FaCcDinersClub />,
};

const Card = ({ card }: Props) => {
  return (
    <ThemeUICard>
      <Box mb={4} sx={{ fontSize: 1 }}>
        **** **** **** {card.last4}
      </Box>
      <Flex sx={{ justifyContent: "space-between" }}>
        {`${card.exp_month}/${card.exp_year}`}
        <Box color="greyscale.3">
          {cardIcons[card.brand] ?? <FaCreditCard />}
        </Box>
      </Flex>
    </ThemeUICard>
  );
};

export default Card;
