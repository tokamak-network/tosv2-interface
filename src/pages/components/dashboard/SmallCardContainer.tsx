import { Box, Flex, SimpleGrid, useColorMode } from "@chakra-ui/react";
import useCallContract from "hooks/useCallContract";
import useContract from "hooks/useContract";
import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useEffect, useState } from "react";

import CONTRACT_ADDRESS from "services/addresses/contract";
import TreasuryAbi from "services/abis/Treasury.json";

import {
  Dashboard_SmallCardArrType,
  Dashboard_SmallCardType,
} from "types/dashboard";
import SmallCard from "./SmallCard";
import useCardData from "hooks/dashboard/useCardData";
import { GET_DASHBOARD_CARD } from "graphql/dashboard/getDashboard";
import { useQuery } from "@apollo/client";
import commafy from "@/utils/commafy";
import { convertNumber } from "@/utils/number";

const SmallCardContainer = () => {
  const [cardList, setCardList] = useState<
    Dashboard_SmallCardArrType | undefined
  >(undefined);
  const [width] = useWindowDimensions();
  const { Treasury_CONTRACT } = useCallContract();
  const { colorMode } = useColorMode();

  const { loading, error, data } = useQuery(GET_DASHBOARD_CARD, {
    variables: {
      period: "-1",
      limit: 2,
    },
    pollInterval: 10000,
  });

  // const { data, loading, error } = useCardData();
  // const { tosPrice, backingPerTos, ltosPrice, ltosIndex } = data;

  useEffect(() => {
    if (data) {
      const { tosPrice, backingPerTos, mintingRate, ltosIndex } =
        data.getDashboardCard[0];

      const {
        tosPrice: exTosPrice,
        backingPerTos: exBackingPerTos,
        ltosPrice: exLtosPrice,
        ltosIndex: exLtosIndex,
      } = data.getDashboardCard[0];

      const tosPriceChangePercent =
        (Number(commafy(tosPrice - exTosPrice)) / Number(commafy(exTosPrice))) *
        100;
      // const ltosPriceChangePercent =
      //   (Number(commafy(ltosPrice - exLtosPrice)) /
      //     Number(commafy(exLtosPrice))) *
      //   100;
      const ltosIndexChangePercent =
        (Number(commafy(ltosIndex - exLtosIndex)) /
          Number(commafy(exLtosIndex))) *
        100;
      const backingPerTosNum = convertNumber({
        amount: backingPerTos,
        decimalPlaces: 7,
        decimalPoints: 7,
      });

      const dummyData: Dashboard_SmallCardArrType = [
        {
          price: commafy(tosPrice) as string,
          priceUnit: "$",
          priceChangePercent: tosPriceChangePercent,
          title: "TOS Price",
          tooltip: true,
          tooltipMessage: "TOS market price in USD",
          switchButton: true
        },
        {
          price: backingPerTosNum as string,
          priceUnit: "ETH",
          title: "Backing Per TOS",
          tooltip: true,
          tooltipMessage: "Amount of treasury asset backed per 1 TOS in ETH",
          switchButton: true
        },
        {
          price: commafy(mintingRate) as string,
          priceUnit: "TOS",
          title: "Minting Rate Per ETH",
          tooltip: true,
          tooltipMessage:
            "Minting rate per ETH determines how many TOS gets minted for every 1 ETH that gets bonded",
            switchButton: false
          },
        {
          price: commafy(ltosIndex, 7) as string,
          priceUnit: "TOS",
          priceChangePercent: ltosIndexChangePercent,
          title: "LTOS Index",
          tooltip: true,
          tooltipMessage:
            "Number of TOS you get when you unstake 1 LTOS. LTOS index increases every 8 hours.",
            switchButton: false
          },
      ];
      setCardList(dummyData);
    }
  }, [Treasury_CONTRACT, data]);

  if (width < 490) {
    return (
      <Flex
        flexDir={"column"}
        borderWidth={1}
        borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
        borderRadius={14}
      >
        {cardList?.map((cardData: Dashboard_SmallCardType, index: number) => {
          return (
            <Box key={`${cardData.title}_${index}`} w={"100%"} minW={"210px"}>
              <SmallCard
                price={cardData.price}
                priceChangePercent={cardData.priceChangePercent}
                title={cardData.title}
                priceUnit={cardData.priceUnit}
                tooltipMessage={cardData.tooltipMessage}
                style={
                  index === 0
                    ? { borderTopRadius: 14 }
                    : index === cardList.length - 1
                    ? { borderBottomRadius: 14 }
                    : {}
                }
              ></SmallCard>
            </Box>
          );
        })}
      </Flex>
    );
  }

  return (
    <SimpleGrid
      columnGap={"24px"}
      rowGap={"24px"}
      justifyContent="center"
      columns={width < 960 ? 2 : 4}
    >
      {cardList?.map((cardData: Dashboard_SmallCardType, index: number) => {
        return (
          <Box key={`${cardData.title}_${index}`} w={"100%"} minW={"210px"}>
            <SmallCard
              price={cardData.price}
              priceChangePercent={cardData.priceChangePercent}
              title={cardData.title}
              priceUnit={cardData.priceUnit}
              tooltipMessage={cardData.tooltipMessage}
              switchButton={cardData.switchButton}
            ></SmallCard>
          </Box>
        );
      })}
    </SimpleGrid>
  );
};

export default SmallCardContainer;
