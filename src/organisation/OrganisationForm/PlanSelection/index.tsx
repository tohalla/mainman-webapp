import { prop } from "ramda";
import React from "react";
import { Flex } from "rebass";

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
    flexDirection="column"
    mr={3}
    onClick={onClick}
    sx={{ boxShadow: 1 }}
    width="130px"
  >
    <Flex
      alignItems="center"
      color="text.light"
      justifyContent="center"
      py={2}
      sx={{
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
    <Flex flexDirection="column" px={3} py={2}>
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
