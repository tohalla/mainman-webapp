import { Account } from "src/auth";
import { getApiCall } from "src/util/api";

export interface PublicAccount
  extends Pick<Account, "id" | "email" | "firstName" | "lastName"> {}

export const fetchOrganisationAccounts = (organisation: number) =>
  getApiCall<PublicAccount, Record<string, PublicAccount>>(
    `/organisations/${organisation}/accounts`
  )({ key: "id", responseType: "json" });

export const organisationAccountsKey = (organisation?: number) => [
  "organisation",
  organisation,
  "accounts",
];
