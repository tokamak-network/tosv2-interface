import { Select, useColorMode } from "@chakra-ui/react";
import { stake_filter_sort, T_SortValues } from "atom/stake/filter";
import useMediaView from "hooks/useMediaView";
import { useRecoilState } from "recoil";

function StakeSortSelect() {
  const { colorMode } = useColorMode();
  const [sortValue, setSortValue] =
    useRecoilState<T_SortValues>(stake_filter_sort);
  const { mobileView } = useMediaView();

  return (
    <Select
      minW={["170px", "173px", "173px"]}
      ml={mobileView ? "" : "30px"}
      h={"45px"}
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
