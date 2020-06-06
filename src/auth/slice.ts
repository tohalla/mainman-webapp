import { createSlice } from "@reduxjs/toolkit";

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

export { reducer, actions };
