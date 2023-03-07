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

function BondCardSection() {
  const [cardList, setCardList] = useState<BondCardProps[] | undefined>(
    undefined
  );
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");
  const [isSmallerThan1024] = useMediaQuery("(max-width: 1024px)");
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

  const sortValue = useRecoilValue(bond_filter_sort_state);

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
        const endTimeDiff = endTime - getNowTimeStamp();
        const openTimeDiff = startTime - getNowTimeStamp();

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
          isDiscountMinus: Number(commafy(discount)) < 0,
          status:
            openTimeDiff > 0
              ? "will be open"
              : endTimeDiff > 0
              ? "open"
              : "closed",
        };
      });

      //remove bonds are already done or not started yet from the list to calculate highest yield bond
      const discountArr = bondcardDatas.map((bondData) =>
        bondData.status === "open" ? bondData.discountRate : -9999
      );

      let max = discountArr[0];
      let maxIndices: number[] = [];
      let maxArr = [];

      for (let i = 0; i < discountArr.length; i++) {
        if (discountArr[i] > max) {
          max = discountArr[i];
          maxIndices = [i];
        } else if (discountArr[i] === max) {
          maxIndices.push(i);
        }
      }

      //to set highest value for bonds which have even same discount value
      for (let i = 0; i < maxIndices.length; i++) {
        const index = maxIndices[i];
        bondcardDatas[index] = {
          ...bondcardDatas[index],
          isHighest: discountArr[index] > 0 ? true : false,
        };
      }

      // const biggestElementIndex = discountArr.indexOf(
      //   Math.max.apply(Math, discountArr)
      // );

      // bondcardDatas[biggestElementIndex] = {
      //   ...bondcardDatas[biggestElementIndex],
      //   isHighest: discountArr[biggestElementIndex] > 0 ? true : false,
      // };

      setCardList(bondcardDatas);

      const openList = bondcardDatas.filter(
        (bondData: BondCardProps) => bondData.status === "open"
      );
      const futureList = bondcardDatas.filter(
        (bondData: BondCardProps) => bondData.status === "will be open"
      );
      const closedList = bondcardDatas.filter(
        (bondData: BondCardProps) => bondData.status === "closed"
      );

      switch (sortValue) {
        case "default":
          const result = openList.concat(futureList).concat(closedList);
          return setCardList(result);
        case "open":
          return setCardList(openList);
        case "future":
          return setCardList(futureList);
        case "closed":
          return setCardList(closedList);
        default:
          break;
      }
    }
  }, [priceData, data, sortValue]);

  return (
    <Grid
      // columns={3} gridRowGap={"24px"} columnGap={"25px"}
      columnGap={"2.2%"}
      templateColumns={isSmallerThan1024 ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
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
    </Grid>
  );
}

export default BondCardSection;
