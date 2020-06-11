import { not } from "ramda";
import { Dispatch, SetStateAction, useState } from "react";

export default (
  initial = false
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(initial);
  return [state, () => setState(not), setState];
};
