import React from "react";
import { Flex } from "rebass";

import CardOptions, { CardProps } from "src/general/CardOptions";
import { Plan } from "src/organisation";

interface Props {
  plans: Plan[];
}

const PlanCard = ({ name, isSelected, onClick }: CardProps<Plan>) => (
  <Flex
    onClick={onClick}
    sx={{
      fontWeight: isSelected ? "bold" : "normal",
    }}
  >
    {name}
  </Flex>
);

const PlanSelection = ({ plans }: Props) => (
  <CardOptions Card={PlanCard} name="plan" options={plans} />
);

export default PlanSelection;
