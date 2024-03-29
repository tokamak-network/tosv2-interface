import { Select, useColorMode } from "@chakra-ui/react";
import { bond_filter_sort, T_SortValues } from "atom/bond/filter";
import { useRecoilState } from "recoil";

function BondSortSelect() {
  const { colorMode } = useColorMode();
  const [sortValue, setSortValue] =
    useRecoilState<T_SortValues>(bond_filter_sort);

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
        if (e.target.value === "Earliest" || e.target.value === "Latest")
          setSortValue(e.target.value);
      }}
    >
      <option value={"Earliest"}>Earliest </option>
      <option value={"Latest"}>Latest </option>
    </Select>
  );
}

export default BondSortSelect;
