import { useColorMode, Box } from "@chakra-ui/react";

const Line = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      width={"100%"}
      height={"1px"}
      bg={colorMode === "light" ? "#e8edf2" : "#313442"}
    ></Box>
  );
};

export default Line;
