import { useQuery } from "@apollo/client";
import { Flex, SimpleGrid, useMediaQuery, Wrap } from "@chakra-ui/react";
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
import { convertTimeStamp } from "@/utils/time";

function BondCardSection() {
  const [cardList, setCardList] = useState<BondCardProps[] | undefined>(
    undefined
  );
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");
  const { loading, error, data } = useQuery<{ getBondList: [] }>(
    GET_BOND_LIST,
    {
      variables: {
        period: "-1",
      },
      pollInterval: 10000,
    }
  );
  const { priceData } = usePrice();

  if (error) {
    console.log("**graphql_getBondList err**");
    console.log(error);
  }

  useEffect(() => {
    if (data && priceData && priceData?.tosPrice && priceData?.ethPrice) {
      const bonds = data.getBondList;
      const { ethPrice, tosPrice } = priceData;

      //test
      // const dummyServerData = getDummyServerBondData();

      const bondcardDatas: BondCardProps[] = bonds.map((bond: BondRawdata) => {
        const {
          capacity,
          index,
          totalSold,
          endTime,
          bondPrice,
          startTime,
          version,
        } = bond;
        const discount = ((tosPrice - bondPrice) / tosPrice) * 100;
        const startDay = convertTimeStamp(startTime);
        const endDay = convertTimeStamp(endTime);
        const bondCapacity = commafy(capacity, 0);
        const totalSoldCom = commafy(totalSold, 0);
        const progress =
          Number(capacity) / Number(totalSold) === Infinity
            ? "0"
            : isNaN(Number(totalSold) / Number(capacity))
            ? "-"
            : commafy((Number(totalSold) / Number(capacity)) * 100, 0);

        return {
          bondCapacity,
          totalSold: totalSoldCom,
          progress,
          bondingPrice: `$ ${commafy(bondPrice)}`,
          discountRate: Number(commafy(discount)),
          sellTokenType: "ETH",
          buyTokenType: "TOS",
          endTime,
          index,
          startDay,
          startTime,
          leftDay: "",
          endDay,
          minimumBondPrice: "0",
          version,
        };
      });

      const discountArr = bondcardDatas.map(
        (bondData) => bondData.discountRate
      );
      const biggestElementIndex = discountArr.indexOf(
        Math.max.apply(Math, discountArr)
      );

      bondcardDatas[biggestElementIndex] = {
        ...bondcardDatas[biggestElementIndex],
        isHighest: true,
      };

      setCardList(bondcardDatas);
    }
  }, [priceData, data]);

  return (
    <Flex
      // columns={3} gridRowGap={"24px"} columnGap={"25px"}
      columnGap={"2%"}
      rowGap={"20px"}
      justifyContent={isSmallerThan750 ? "center" : ""}
      flexWrap={"wrap"}
    >
      {cardList?.map((cardData: BondCardProps, index) =>
        isProduction() ? (
          index === cardList.length - 1
        ) : undefined ? null : (
          <BondCard
            data={cardData}
            key={cardData.bondCapacity + index}
          ></BondCard>
        )
      )}
    </Flex>
  );
}

export default BondCardSection;
