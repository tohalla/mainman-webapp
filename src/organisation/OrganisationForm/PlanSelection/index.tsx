import { prop } from "ramda";
import React from "react";
import { defineMessages, FormattedMessage, FormattedNumber } from "react-intl";
import { Card, Flex, Grid } from "theme-ui";

import Disclaimer from "./Disclaimer";

import CardOptions, { CardProps } from "src/general/CardOptions";
import { Plan } from "src/organisation";

interface Props {
  plans: Plan[];
}

const messages = defineMessages({
  // text for plan account limit
  accountLimit: "Accounts",
  // text for plan entity limit
  entityLimit: "Entities",
  // text for plan maintainer limit
  maintainerLimit: "Maintainers",
  // text for plan monthly price
  monthlyPrice: "{value} / month",
});

const PlanCard = ({
  isSelected,
  onClick,
  value: { name, entities, accounts, maintainers, stripePrice },
  ...props
}: CardProps<Plan>) => (
  <Card backgroundColor="greyscale.9" onClick={onClick} p={0} {...props}>
    <Flex
      color="textInvert"
      py={3}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        ...(isSelected
          ? {
              fontWeight: "bold",
              backgroundColor: "greyscale.1",
            }
          : { backgroundColor: "greyscale.3" }),
      }}
    >
      {name}
    </Flex>
    <Grid px={4} py={3} sx={{ gridTemplateColumns: "1fr auto" }}>
      <FormattedMessage {...messages.accountLimit} />
      <div>{accounts}</div>
      <FormattedMessage {...messages.entityLimit} />
      <div>{entities}</div>
      <FormattedMessage {...messages.maintainerLimit} />
      <div>{maintainers}</div>
    </Grid>
    <Flex
      backgroundColor="greyscale.8"
      mt={3}
      px={4}
      py={2}
      sx={{
        justifyContent: "center",
        fontSize: 1,
      }}
    >
      <FormattedMessage
        {...messages.monthlyPrice}
        values={{
          value: (
            <FormattedNumber
              currency={stripePrice?.currency ?? "eur"}
              style="currency"
              value={(stripePrice?.unitAmount ?? 0) / 100}
            />
          ),
        }}
      />
    </Flex>
  </Card>
);

const PlanSelection = ({ plans }: Props) => (
  <div>
    <CardOptions
      Card={PlanCard}
      getOptionIdentifier={prop("name")}
      mb="default"
      name="plan"
      options={plans}
      sx={{
        alignSelf: "stretch",
        gridTemplateColumns: "repeat(auto-fill, minmax(auto, 176px))",
      }}
    />
    <Disclaimer />
  </div>
);

export default PlanSelection;
