import { createSlice } from "@reduxjs/toolkit";

import type { ThunkAction } from "../store";
import { reduxApiCall } from "../store/middleware/api/reducer";

import { Account } from ".";

export interface SessionState {
  account?: Account;
}

const initialState: SessionState = {
  account: undefined,
};

const { reducer, actions } = createSlice({
  name: "session",
  initialState,
  reducers: {
    setAccount: (draft, { payload }: { payload: Account | undefined }) => {
      draft.account = payload;
    },
  },
});

export const fetchAccount = (): ThunkAction => (dispatch) =>
  dispatch(
    reduxApiCall({
      request: {
        endpoint: "/accounts",
      },
      attemptToFetchFromStore: (state) => state.session.account,
      onSuccess: (payload) => {
        dispatch(actions.setAccount(payload));
      },
      onFailure: (error) => {
        dispatch(actions.setAccount());
        throw error;
      },
    })
  );

export { reducer, actions };
