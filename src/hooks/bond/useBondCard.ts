import commafy from "@/utils/commafy";
import { convertTimeStamp, getNowTimeStamp } from "@/utils/time";
import { useQuery } from "@apollo/client";
import { bond_filter_sort_state } from "atom/bond/filter";
import { GET_BOND_LIST } from "graphql/bond/getBond";
import usePrice from "hooks/usePrice";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { BondCardProps, BondRawdata } from "types/bond";

function checkProgressNumber(num: number) {
  return num === Infinity ? "0" : isNaN(num) ? "0" : commafy(num * 100, 0);
}

export function useBondCard() {
  const [cardList, setCardList] = useState<BondCardProps[] | undefined>(
    undefined
  );
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
    console.log("**useBondCard err**");
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
          currentCapacity,
        } = bond;
        const discount = ((tosPrice - bondPrice) / tosPrice) * 100;
        const startDay = convertTimeStamp(startTime);
        const endDay = convertTimeStamp(endTime);
        const bondCapacity = commafy(capacity, 0);
        const totalSoldCom = commafy(totalSold, 0);

        const currentProgressOnCurrentCapacityValue =
          Number(totalSold) / Number(currentCapacity + totalSold);
        const currentProgress = Number(totalSold) / Number(capacity);
        const currentCapacityProgressValue =
          Number(currentCapacity) / Number(capacity);
        const currentBondableValue =
          Number(currentCapacity) - Number(totalSold);

        const progress = checkProgressNumber(currentProgress);
        const currentCapacityTotal = Number(
          Math.floor(currentCapacity) + Math.floor(totalSold)
        );
        const currentProgressOnCurrentCapacity = checkProgressNumber(
          currentProgressOnCurrentCapacityValue
        );
        const currentCapacityProgress = checkProgressNumber(
          currentCapacityProgressValue
        );
        const currentBondable =
          Number(currentCapacity) <= 0
            ? "N/A"
            : isNaN(currentCapacity)
            ? "-"
            : `${commafy(currentCapacity, 0)} TOS`;
        const endTimeDiff = endTime - getNowTimeStamp();
        const openTimeDiff = startTime - getNowTimeStamp();

        return {
          bondCapacity,
          totalSold: totalSoldCom,
          progress,
          currentProgressOnCurrentCapacity,
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
          currentCapacityProgress,
          currentBondable,
          currentCapacity: commafy(currentCapacityTotal, 0),
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

  return { cardList };
}
