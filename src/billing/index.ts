import { PaymentMethod as StripePaymentMethod } from "@stripe/stripe-js";

import { getApiCall } from "src/util/api";

export interface StripeCustomer {
  invoiceSettings: {
    defaultPaymentMethod?: string;
  };
}

export const fetchCustomerDetails = () =>
  getApiCall<StripeCustomer>("/billing/stripe")({
    responseType: "json",
  });

export const updateCustomerDetails = (payload: StripeCustomer) =>
  getApiCall<StripeCustomer>("/billing/stripe", {
    method: "PATCH",
    body: payload,
  })({
    responseType: "json",
  });

export const fetchPaymentMethods = () =>
  getApiCall<PaymentMethod, Record<string, PaymentMethod>>(
    "/billing/stripe/payment-methods"
  )({
    responseType: "json",
    key: "id",
  });

export const createPaymentMethod = (payload: StripePaymentMethod) =>
  getApiCall<PaymentMethod>("/billing/stripe/payment-methods", {
    method: "POST",
    body: payload,
  })({ key: "id", responseType: "json" });

export const deletePaymentMethod = (payload: PaymentMethod) =>
  getApiCall<PaymentMethod>(`/billing/stripe/payment-methods/${payload.id}`, {
    method: "DELETE",
  })({ key: "id", responseType: "json" });

export type PaymentMethod = Camelize<StripePaymentMethod>;

export type CardPaymentMethod = PaymentMethod & {
  card: StripePaymentMethod.Card;
};

export const stripeKey = "stripe";
export const stripeCustomerKey = [stripeKey, "customer"];
export const paymentMethodsKey = [stripeKey, "paymentMethods"];
