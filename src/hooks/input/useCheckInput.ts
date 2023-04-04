import { useMemo } from "react";

export function useCheckInput(param: string | number | undefined) {
  return useMemo(() => {
    if (param === undefined || param === "") {
      return true;
    }
    return false;
  }, [param]);
}
