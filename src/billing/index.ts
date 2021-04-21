import { PaymentMethod as StripePaymentMethod } from "@stripe/stripe-js";

import { getApiCall } from "src/util/api";

export const fetchPaymentMethods = () =>
  getApiCall<PaymentMethod, Record<string, PaymentMethod>>(
    `/billing/stripe/payment-methods`
  )({
    responseType: "json",
    key: "id",
  });

export const createPaymentMethod = (payload: StripePaymentMethod) =>
  getApiCall<PaymentMethod>("/billing/stripe/payment-methods", {
    method: "POST",
    body: payload,
  })({ key: "id", responseType: "json" });
export type PaymentMethod = Camelize<StripePaymentMethod>;

export type CardPaymentMethod = PaymentMethod & {
  card: StripePaymentMethod.Card;
};
