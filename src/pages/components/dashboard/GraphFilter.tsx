import { Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
import { filterState } from "atom//dashboard";
import BasicButton from "common/button/BasicButton";
import SwitchButton from "common/button/SwitchButton";
import { atom, useRecoilState } from "recoil";
import { SetStateAction } from "react";

type FilterProps = {
  setFilter: React.Dispatch<SetStateAction<string>>;
  setSelectedDates:  React.Dispatch<SetStateAction<number>>;
};

const filterList = [
  {
    name: "1 Week",
    w: 70,
    d:7
  },
  {
    name: "1 Month",
    w: 74,
    d:30
  },
  {
    name: "3 Months",
    w: 84,
    d:90
  },
  {
    name: "6 Months",
    w: 84,
    d:182
  },
  {
    name: "1 Year",
    w: 64,
    d:365
  },
];

function GraphFilter(props: FilterProps) {
  const { setFilter,setSelectedDates } = props;
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
            (list: { name: string; w: number; d:number }, index: number) => {
              return (
                <Box
                  key={list.name}
                  onClick={() =>{ 
                    setFilter(list.name)
                    setSelectedDates(list.d)
                    setSelectedFilter(list.name)}}
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
