import { ServerContext } from "../../server";
import callApi, { getApiCall } from "../util/api";

export type Account = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  locale: string;
  previouslyReviewedVersion?: string;
};

export const authenticate = async (credentials: {
  email: string;
  password: string;
}) =>
  callApi("/auth", {
    body: credentials,
    method: "POST",
  }).then(() => {
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
    return credentials;
  });

export const register = async (
  account: Omit<Account, "id"> & {
    retypePassword: string;
    password: string;
  },
  authenticateAfter = true
) =>
  callApi("/accounts", {
    body: account,
    method: "POST",
  }).then(() => {
    if (authenticateAfter) {
      return authenticate({ email: account.email, password: account.password });
    }
    return account;
  });

export const signOut = async () => {
  await callApi("/auth", {
    method: "DELETE",
  });
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
};

export const fetchAccount = (ctx: ServerContext) =>
  getApiCall<Account, Account>("/auth", {}, { ctx })();
