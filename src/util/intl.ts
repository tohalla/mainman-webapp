import { createIntl } from "react-intl";

export const onError: Parameters<typeof createIntl>[0]["onError"] = (err) => {
  if (err.code === "MISSING_TRANSLATION") {
    return;
  }
  throw err;
};
