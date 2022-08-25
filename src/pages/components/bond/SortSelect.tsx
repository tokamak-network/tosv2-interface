import { Select, useColorMode } from "@chakra-ui/react";

function SortSelect() {
  const { colorMode } = useColorMode();
  return (
    <Select
      w={["165px", "190px", "173px"]}
      h={"45px"}
      bgColor={colorMode === "dark" ? "#1f2128" : "white.100"}
      borderWidth={1}
      _hover={{ borderColor: colorMode === "light" ? "#c6cbd9" : "#535353" }}
      color={colorMode === "dark" ? "#64646f" : "#7e7e8f"}
      focusBorderColor={colorMode === "light" ? "#c6cbd9" : "#535353"}
      borderColor={colorMode === "dark" ? "#8a8a98" : "#e8edf2"}
    >
      <option>Sorting</option>
    </Select>
  );
}

export default SortSelect;
