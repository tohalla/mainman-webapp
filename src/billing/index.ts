import { PaymentMethod } from "@stripe/stripe-js";

import { getApiCall } from "src/util/api";

export const fetchPaymentMethods = () =>
  getApiCall<Camelize<PaymentMethod>, Record<string, Camelize<PaymentMethod>>>(
    `/billing/stripe/payment-methods`
  )({
    responseType: "json",
    key: "id",
  });

export const createPaymentMethod = (payload: PaymentMethod) =>
  getApiCall<Camelize<PaymentMethod>>("/billing/stripe/payment-methods", {
    method: "POST",
    body: payload,
  })({ key: "id", responseType: "json" });
