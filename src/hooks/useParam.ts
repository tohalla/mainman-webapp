import { useRouter } from "next/router";

import { getParam } from "src/util/routing";

const useParam = (key: string) => {
  const { query } = useRouter();
  return getParam(key, query);
};

export default useParam;
