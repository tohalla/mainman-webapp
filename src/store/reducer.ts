import { combineReducers } from "@reduxjs/toolkit";

import { reducer as session } from "../auth/slice";

import requests from "./middleware/api/reducer";

const reducer = combineReducers({
  session,
  requests,
});

export type State = ReturnType<typeof reducer>;

export default reducer;
