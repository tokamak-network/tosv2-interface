import { getRound } from "@/utils/bond/card/getRound";
import { getTosCapacityOnEth } from "@/utils/bond/card/getTosCapacityOnEth";
import commafy from "@/utils/commafy";
import { convertTimeStamp, getNowTimeStamp } from "@/utils/time";
import { useQuery } from "@apollo/client";
import { bond_filter_sort_state } from "atom/bond/filter";
import { GET_BOND_LIST } from "graphql/bond/getBond";
import useStosReward from "hooks/stake/useStosReward";
import { useBlockNumber } from "hooks/useBlockNumber";
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
  const { loading, error, data } = useQuery<{ getBondList: BondRawdata[] }>(
    GET_BOND_LIST,
    {
      variables: {
        period: "-1",
      },
      pollInterval: 8000,
    }
  );
  const { priceData } = usePrice();
  const sortValue = useRecoilValue(bond_filter_sort_state);

  //get timestamps to calculate roi
  const { blockTimeStamp } = useBlockNumber();
  const { newEndTimeStamp } = useStosReward(0, 52);

  if (error) {
    console.log("**useBondCard err**");
    console.log(error);
  }

  useEffect(() => {
    if (
      data &&
      priceData &&
      priceData?.tosPrice &&
      priceData?.ethPrice &&
      blockTimeStamp &&
      newEndTimeStamp
    ) {
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
          closed,
          ethPrice,
          capacityUpdatePeriod,
          periodicCapacity,
          ROIforLockupWeeks,
        } = bond;
        const discount = ((tosPrice - bondPrice) / tosPrice) * 100;

        //time
        const startDay = convertTimeStamp(startTime, "YYYY.MM.DD HH:mm:ss");
        const endDay = convertTimeStamp(endTime, "YYYY.MM.DD HH:mm:ss");
        const salePeriod = endTime - getNowTimeStamp();
        // const totalRound = salePeriod / capacityUpdatePeriod;
        const { roundNums, saleRoundTimeStamp } = getRound({
          startTime,
          endTime,
          capacityPeriod: capacityUpdatePeriod,
        });

        const bondEthCapacity = getTosCapacityOnEth({
          tosCapacity: capacity,
          ethPrice,
          tosPrice,
        });
        const roundEthCapacity = getTosCapacityOnEth({
          tosCapacity: Math.floor(periodicCapacity),
          ethPrice,
          tosPrice,
        });

        const bondCapacity = commafy(capacity, 0);
        const totalSoldCom = commafy(totalSold, 0);

        const blueProgressValue = Number(totalSold) / Number(capacity);
        const blueProgress = Number(checkProgressNumber(blueProgressValue));

        const currentProgressOnCurrentCapacityValue =
          Number(totalSold) / Number(currentCapacity + totalSold);
        const currentCapacityProgressValue =
          Number(currentCapacity) / Number(capacity);
        const currentBondableValue =
          Number(currentCapacity) - Number(totalSold);

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

        const isClosed = closed || endTimeDiff < 0;
        const isUpcoming = openTimeDiff > 0;
        const status: BondCardProps["status"] = isClosed
          ? "closed"
          : isUpcoming
          ? "will be open"
          : "open";

        return {
          bondCapacity,
          totalSold: totalSoldCom,
          blueProgress,
          currentProgressOnCurrentCapacity,
          bondingPrice: commafy(bondPrice),
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
          status,
          bondButtonIsDisabled:
            status !== "open" || Number(currentCapacity) <= 0,
          marketId: index,
          ethPrice,
          totalRound: roundNums,
          roundEthCapacity,
          bondEthCapacity,
          roi: Number(commafy(ROIforLockupWeeks)),
          ltosApy: 10.1,
          tosPrice: Number(commafy(tosPrice, 2)),
          saleRoundTimeStamp,
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

      const openList = bondcardDatas
        .filter((bondData: BondCardProps) => bondData.status === "open")
        .sort((a, b) => {
          return Number(b.discountRate) - Number(a.discountRate);
        });
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
  }, [priceData, data, sortValue, blockTimeStamp, newEndTimeStamp]);

  // console.log("--cardList--");
  // console.log(cardList);

  return { cardList };
}
