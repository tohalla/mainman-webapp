import { prop } from "ramda";
import React from "react";
import { Card, Flex } from "theme-ui";

import CardOptions, { CardProps } from "src/general/CardOptions";
import { Plan } from "src/organisation";

interface Props {
  plans: Plan[];
}

const PlanCard = ({
  name,
  entities,
  accounts,
  maintainers,
  isSelected,
  onClick,
}: CardProps<Plan>) => (
  <Card backgroundColor="greyscale.9" onClick={onClick} p={0}>
    <Flex
      color="textInvert"
      py={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        ...(isSelected
          ? {
              fontWeight: "bold",
              backgroundColor: "primary",
            }
          : { backgroundColor: "greyscale.2" }),
      }}
    >
      {name}
    </Flex>
    <Flex px={3} py={2} sx={{ flexDirection: "column" }}>
      <div>{accounts}</div>
      <div>{entities}</div>
      <div>{maintainers}</div>
    </Flex>
  </Card>
);

const PlanSelection = ({ plans }: Props) => (
  <CardOptions
    Card={PlanCard}
    getOptionIdentifier={prop("name")}
    name="plan"
    options={plans}
    sx={{
      alignSelf: "stretch",
      gridTemplateColumns: "repeat(auto-fill, minmax(auto, 128px))",
    }}
  />
);

export default PlanSelection;
