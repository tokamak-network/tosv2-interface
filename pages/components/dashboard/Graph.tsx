import { selector, useRecoilValue } from "recoil";
import { filterState } from "atom/dashboard";
import { Flex } from "@chakra-ui/react";

const selectedFilterState = selector({
  key: "selectedFilterState", // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const selectedFilter = get(filterState);

    return selectedFilter;
  },
});

function Graph() {
  const selectedFilter = useRecoilValue(selectedFilterState);
  return (
    <Flex
      w={"100%"}
      minWidth={"336px"}
      maxWidth={"556px"}
      h={"350px"}
      bgColor={"gray.600"}
      borderRadius={14}
      borderWidth={1}
      borderColor={"#313442"}
    ></Flex>
  );
}

export default Graph;
