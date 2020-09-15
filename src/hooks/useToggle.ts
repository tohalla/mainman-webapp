import { not } from "ramda";
import { Dispatch, SetStateAction, useState } from "react";

const useToggle = (
  initial = false
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] => {
  const [state, setState] = useState(initial);
  return [state, () => setState(not), setState];
};

export default useToggle;
