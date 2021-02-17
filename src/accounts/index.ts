import { Account } from "src/auth";
import { getApiCall } from "src/util/api";

export interface PublicAccount
  extends Pick<Account, "id" | "email" | "firstName" | "lastName"> {}

export interface PendingInvite {
  uuid: string;
  organisation: number;
  email: string;
  createdAt: string;
}

export const fetchOrganisationAccounts = (organisation: number) =>
  getApiCall<PublicAccount, Record<string, PublicAccount>>(
    `/organisations/${organisation}/accounts`
  )({ key: "id", responseType: "json" });

export const fetchPendingInvites = (organisation: number) =>
  getApiCall<PendingInvite, Record<string, PendingInvite>>(
    `/organisations/${organisation}/accounts/invites`
  )({ key: "uuid", responseType: "json" });

export const organisationAccountsKey = (organisation?: number) => [
  "organisation",
  organisation,
  "accounts",
];

export const pendingInvitesKey = (organisation?: number) => [
  "organisation",
  organisation,
  "pending-invites",
];
