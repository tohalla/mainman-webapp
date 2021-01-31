import { PaymentMethod } from "@stripe/stripe-js";

import { getApiCall } from "src/util/api";

export const fetchPaymentMethods = () =>
  getApiCall<PaymentMethod, Record<string, PaymentMethod>>(
    `/billing/stripe/payment-methods`
  )({
    responseType: "json",
    key: "id",
  });

export const createPaymentMethod = (payload: PaymentMethod) =>
  getApiCall<PaymentMethod>("/billing/stripe/payment-methods", {
    method: "POST",
    body: payload,
  })({ key: "id", responseType: "json" });
