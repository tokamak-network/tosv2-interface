import { Select, useColorMode } from "@chakra-ui/react";
import { stake_filter_sort } from "atom/stake/filter";
import { useRecoilState } from "recoil";

function SortSelect() {
  const { colorMode } = useColorMode();
  const [sortValue, setSortValue] = useRecoilState(stake_filter_sort);

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
      onChange={(e) => {
        setSortValue(e.target.value);
      }}
    >
      <option value={"Earliest"}>Earliest </option>
      <option value={"Latest"}>Latest </option>
    </Select>
  );
}

export default SortSelect;
