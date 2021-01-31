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
      sx={{ gridTemplateColumns: "1fr 1fr 1fr", columnGap: 4, sx }}
      {...props}
    >
      {Object.values(paymentMethods).map(
        ({ card }) => card && <Card card={card} />
      )}
    </Grid>
  );
};

export default PaymentMethods;
