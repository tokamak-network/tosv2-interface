import { Select, useColorMode } from "@chakra-ui/react";

function SortSelect() {
  const { colorMode } = useColorMode();
  return (
    <Select
      w={"173px"}
      h={"45px"}
      bgColor={colorMode === 'dark'? "#1f2128": 'white.100'}
      borderWidth={1}
      color={colorMode ==='dark'? '#64646f': '#7e7e8f'}
      borderColor={colorMode === 'dark'? "#313442": 'gray.900'}
    >
      <option>Sorting</option>
    </Select>
  );
}

export default SortSelect;
