import { useQuery } from "@apollo/client";
import { Flex, Grid, SimpleGrid, useMediaQuery, Wrap } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import { GET_BOND_LIST } from "graphql/bond/getBond";
import { useEffect, useState } from "react";
import { BondRawdata, BondCardProps } from "types/bond";
import BondCard from "./BondCard";
import commafy from "utils/commafy";
import usePrice from "hooks/usePrice";
import useCallContract from "hooks/useCallContract";
import { convertNumber } from "@/utils/number";
import { getDummyServerBondData } from "test/bond/dummyBondData";
import { isProduction } from "constants/production";
import { convertTimeStamp, getNowTimeStamp } from "@/utils/time";
import { useRecoilValue } from "recoil";
import { bond_filter_sort_state } from "atom/bond/filter";
import useMediaView from "hooks/useMediaView";
import { useBondCard } from "hooks/bond/useBondCard";
import usePagination from "hooks/usePagination";
import BondScreenBottom from "./BondScreenBottom";
function BondCardSection() {
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");
  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");
  const { cardList } = useBondCard();
  const { pageSize, currentPage, currentPageList, setCurrentPage } =
    usePagination(cardList);

  return (
    <Flex flexDir={"column"}>
      <Grid
        // columns={3} gridRowGap={"24px"} columnGap={"25px"}
        columnGap={"2.2%"}
        templateColumns={
          isSmallerThan1024 ? "repeat(1, 1fr)" : "repeat(3, 1fr)"
        }
        rowGap={"20px"}
        justifyContent={isSmallerThan750 ? "center" : ""}
        flexWrap={"wrap"}
      >
        {/* {cardList?.map((cardData: BondCardProps, index) =>
        //need to check displaying one vault which was a test vault on the mainnet
        isProduction() ? (
          index === cardList.length - 1
        ) : undefined ? null : (
          <BondCard
            data={cardData}
            key={cardData.bondCapacity + index}
          ></BondCard>
        )
      )} */}

        {currentPageList.length > 0 ? (
          currentPageList?.map((cardData: BondCardProps, index: number) => {
            if (cardData) {
              return (
                <BondCard
                  data={cardData}
                  key={cardData.bondCapacity + index}
                ></BondCard>
              );
            }
          })
        ) : (
          <></>
        )}
      </Grid>
      <BondScreenBottom
        pageSize={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </Flex>
  );
}

export default BondCardSection;
