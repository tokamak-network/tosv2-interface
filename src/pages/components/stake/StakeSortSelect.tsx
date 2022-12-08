import { Select, useColorMode,useMediaQuery } from "@chakra-ui/react";
import { stake_filter_sort, T_SortValues } from "atom/stake/filter";
import { useRecoilState } from "recoil";

function StakeSortSelect() {
  const { colorMode } = useColorMode();
  const [sortValue, setSortValue] =
    useRecoilState<T_SortValues>(stake_filter_sort);
    const [smallerThan726] = useMediaQuery("(max-width: 726px)");

  return (
    <Select
      w={smallerThan726? '100%':'173px'}
      h={"45px"}
      mt={smallerThan726? '24px':''}
      bgColor={colorMode === "dark" ? "#1f2128" : "white.100"}
      borderWidth={1}
      _hover={{ borderColor: colorMode === "light" ? "#c6cbd9" : "#535353" }}
      color={colorMode === "dark" ? "#64646f" : "#7e7e8f"}
      focusBorderColor={colorMode === "light" ? "#c6cbd9" : "#535353"}
      borderColor={colorMode === "dark" ? "#313442" : "#e8edf2"}
      fontSize={14}
      onChange={(e) => {
        if (e.target.value === "Recently" || e.target.value === "Earliest")
          setSortValue(e.target.value);
      }}
    >
      <option value={"Recently"}>Recently Added</option>
      <option value={"Earliest"}>End time </option>
      {/* <option value={"Latest"}>Latest </option> */}
    </Select>
  );
}

export default StakeSortSelect;
