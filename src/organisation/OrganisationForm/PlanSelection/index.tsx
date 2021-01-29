import { prop } from "ramda";
import React from "react";
import { Flex } from "theme-ui";

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
  <Flex
    backgroundColor="greyscale.9"
    mr={3}
    onClick={onClick}
    sx={{ width: "130px", boxShadow: 1, flexDirection: "column" }}
  >
    <Flex
      color="text.light"
      py={2}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        userSelect: "none",
        ...(isSelected
          ? {
              fontWeight: "bold",
              backgroundColor: "primary.light",
            }
          : { backgroundColor: "greyscale.2" }),
      }}
    >
      {name}
    </Flex>
    <Flex sx={{ flexDirection: "column" }} px={3} py={2}>
      <div>{accounts}</div>
      <div>{entities}</div>
      <div>{maintainers}</div>
    </Flex>
  </Flex>
);

const PlanSelection = ({ plans }: Props) => (
  <CardOptions
    Card={PlanCard}
    getOptionIdentifier={prop("name")}
    name="plan"
    options={plans}
  />
);

export default PlanSelection;
