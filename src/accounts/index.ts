import { useQuery } from "react-query";

import { Account } from "src/auth";
import callApi, { getApiCall, SetHeader } from "src/util/api";

export interface PublicAccount
  extends Pick<Account, "id" | "email" | "firstName" | "lastName"> {
  role?: {
    name: string;
    id: number;
    rights: Record<string, boolean>;
  };
}

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

export const fetchInvites = (account: PublicAccount) =>
  getApiCall<PendingInvite, Record<string, PendingInvite>>(
    `/accounts/${account.id}/invites`
  )({ key: "uuid", responseType: "json" });

export const fetchPendingOrganisationInvites = (organisation: number) =>
  getApiCall<PendingInvite, Record<string, PendingInvite>>(
    `/organisations/${organisation}/accounts/invites`
  )({ key: "uuid", responseType: "json" });

export const inviteAccount = (invite: Creatable<PendingInvite>) =>
  getApiCall<PendingInvite>(
    `/organisations/${invite.organisation}/accounts/invites`,
    { body: invite, method: "POST" }
  )({ key: "uuid", responseType: "json" });

export const acceptInvite = (invite: PendingInvite) =>
  callApi(
    `/organisations/${invite.organisation}/accounts/invites/${invite.uuid}`,
    { method: "POST" }
  );

export const deleteInvite = (invite: PendingInvite) =>
  callApi(
    `/organisations/${invite.organisation}/accounts/invites/${invite.uuid}`,
    { method: "DELETE" }
  );

export const fetchAccountWithHeaders = (
  headers: RequestInit["headers"],
  setHeader: SetHeader
) =>
  getApiCall<Account, Account>("/auth", { headers })({
    key: "id",
    responseType: "json",
    setHeader,
  });

export const fetchAccount = () =>
  getApiCall<Account, Account>("/auth")({ key: "id", responseType: "json" });

export const useAccount = () =>
  useQuery(accountKey, fetchAccount, {
    staleTime: 60000,
  });

export const invitesKey = "invites";

export const organisationAccountsKey = (organisation?: number) => [
  "organisation",
  organisation,
  "accounts",
];

export const organisationInvitesKey = (organisation?: number) => [
  "organisation",
  organisation,
  "pending-invites",
];

export const accountKey = "account";
