import { PaymentMethod } from "@stripe/stripe-js";
import React from "react";
import { Grid, GridProps } from "theme-ui";

import Card from "src/billing/PaymentMethods/Card";

interface Props extends Omit<GridProps, "ref"> {
  paymentMethods: Record<string, PaymentMethod>;
}

const PaymentMethods = ({ paymentMethods, sx, ...props }: Props) => {
  return (
    <Grid
      sx={{
        gridTemplateColumns: "repeat(auto-fill, minmax(auto, 192px))",
        columnGap: 4,
        alignSelf: "stretch",
        ...sx,
      }}
      {...props}
    >
      {Object.values(paymentMethods).map(
        ({ id, card }) => card && <Card key={id} card={card} />
      )}
    </Grid>
  );
};

export default PaymentMethods;
