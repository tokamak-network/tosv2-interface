import { useCustomColorMode } from "../useCustomColorMode";

export function useBondCardStyle() {
  const { isDark } = useCustomColorMode();

  const cardTextColor = isDark ? "white.200" : "black.300";

  return { cardTextColor };
}
