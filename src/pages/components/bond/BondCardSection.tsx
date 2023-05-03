import { Flex, Grid, useMediaQuery } from "@chakra-ui/react";
import { BondCardProps } from "types/bond";
import BondCard from "./BondCard";
import { useBondCard } from "hooks/bond/useBondCard";
import usePagination from "hooks/usePagination";
import BondScreenBottom from "./BondScreenBottom";
import useMediaView from "hooks/useMediaView";
function BondCardSection() {
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");

  const { cardList } = useBondCard();
  const { pageSize, currentPage, currentPageList, setCurrentPage } =
    usePagination(cardList);

  const { bp1024px } = useMediaView();

  return (
    <Flex flexDir={"column"}>
      <Grid
        // columns={3} gridRowGap={"24px"} columnGap={"25px"}
        columnGap={"2.2%"}
        templateColumns={bp1024px ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
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
