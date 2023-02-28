import { REACT_APP_MODE } from "constants/index";

export const isProduction = (): boolean => {
  return REACT_APP_MODE === "PRODUCTION";
};
