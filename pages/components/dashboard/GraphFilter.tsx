import { Box, Flex, Grid, SimpleGrid } from "@chakra-ui/react";
import { filterState } from "atom/dashboard";
import BasicButton from "common/button/BasicButton";
import { atom, useRecoilState } from "recoil";

const filterList = ["1 Week", "1 Month", "3 Months", "6 Months", "1 Year"];

function GraphFilter() {
  const [selectedFilter, setSelectedFilter] = useRecoilState(filterState);

  return (
    <Flex mt={"48px"} w={"100%"}>
      <Flex mb={"24px"} w={"100%"} justifyContent="center">
        <SimpleGrid columns={5} columnGap={"6px"}>
          {filterList.map((name: string) => {
            return (
              <Box key={name} onClick={() => setSelectedFilter(name)}>
                <BasicButton name={name} w={"70px"} h={"36px"}></BasicButton>
              </Box>
            );
          })}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default GraphFilter;
