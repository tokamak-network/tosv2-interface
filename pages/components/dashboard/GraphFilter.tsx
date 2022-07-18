import { Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
import { filterState } from "atom/dashboard";
import BasicButton from "common/button/BasicButton";
import SwitchButton from "common/button/SwitchButton";
import { atom, useRecoilState } from "recoil";

const filterList = [
  {
    name: "1 Week",
    w: 70,
  },
  {
    name: "1 Month",
    w: 74,
  },
  {
    name: "3 Months",
    w: 84,
  },
  {
    name: "6 Months",
    w: 84,
  },
  {
    name: "1 Year",
    w: 64,
  },
];

function GraphFilter() {
  const [selectedFilter, setSelectedFilter] = useRecoilState(filterState);

  return (
    <Flex mt={"48px"} w={"100%"}>
      <Flex mb={"24px"} w={"100%"} justifyContent="center">
        <Flex
          justifyContent={"space-between"}
          columnGap={"6px"}
          overflow={"auto"}
        >
          {filterList.map(
            (list: { name: string; w: number }, index: number) => {
              return (
                <Box
                  key={list.name}
                  onClick={() => setSelectedFilter(list.name)}
                >
                  <SwitchButton
                    name={list.name}
                    w={`${list.w}px`}
                    h={"36px"}
                    isSelected={selectedFilter === list.name}
                  ></SwitchButton>
                </Box>
              );
            }
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default GraphFilter;
