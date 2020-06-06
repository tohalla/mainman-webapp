import { combineReducers } from "@reduxjs/toolkit";

import { reducer as session } from "../auth/slice";

export type State = Record<string, unknown>;

export default combineReducers({
  session,
});
