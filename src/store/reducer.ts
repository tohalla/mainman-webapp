import { combineReducers } from "@reduxjs/toolkit";

import { reducer as session } from "../auth/slice";

const reducer = combineReducers({
  session,
});

export type State = ReturnType<typeof reducer>;

export default reducer;
