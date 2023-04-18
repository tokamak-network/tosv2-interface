import { useColorMode } from "@chakra-ui/react";

export function useCustomColorMode() {
  const { colorMode } = useColorMode();

  return { isDark: colorMode === "dark" };
}
