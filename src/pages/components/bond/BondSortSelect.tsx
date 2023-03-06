import { Select, useColorMode } from "@chakra-ui/react";
import { bond_filter_sort, T_SortValues } from "atom/bond/filter";
import useMediaView from "hooks/useMediaView";
import { useRecoilState } from "recoil";

function BondSortSelect() {
  const { colorMode } = useColorMode();
  const [sortValue, setSortValue] =
    useRecoilState<T_SortValues>(bond_filter_sort);
  const { mobileView, bp500px } = useMediaView();

  return (
    <Select
      minW={["170px", "173px", "173px"]}
      maxW={["170px", "173px", "173px"]}
      ml={bp500px ? "" : "30px"}
      h={"45px"}
      bgColor={colorMode === "dark" ? "#1f2128" : "white.100"}
      borderWidth={1}
      _hover={{ borderColor: colorMode === "light" ? "#c6cbd9" : "#535353" }}
      color={colorMode === "dark" ? "#64646f" : "#7e7e8f"}
      focusBorderColor={colorMode === "light" ? "#c6cbd9" : "#535353"}
      borderColor={colorMode === "dark" ? "#313442" : "#e8edf2"}
      fontSize={14}
      onChange={(e) => {
        setSortValue(e.target.value as T_SortValues);
      }}
    >
      <option value={"default"}>Sorting </option>
      <option value={"open"}>Open </option>
      <option value={"future"}>Future </option>
      <option value={"closed"}>Closed </option>
    </Select>
  );
}

export default BondSortSelect;
