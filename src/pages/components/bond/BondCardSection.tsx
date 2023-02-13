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
  const { loading, error, data } = useQuery(GET_BOND_LIST, {
    variables: {
      period: "-1",
    },
    pollInterval: 10000,
  });
  // const { priceData } = usePrice();

  // const { BondDepositoryProxy_CONTRACT } = useCallContract();

  const priceData = {
    ethPrice: 1524.33,
    tosPrice: 1,
  };

  useEffect(() => {
    // if (data && priceData && priceData?.tosPrice && priceData?.ethPrice)
    if (priceData && priceData?.tosPrice && priceData?.ethPrice) {
      // const bonds = data.getBondList;
      const { ethPrice, tosPrice } = priceData;

      const dummyServerData = getDummyServerBondData();

      const bondcardDatas: BondCardProps[] = dummyServerData.map(
        (bond: BondRawdata) => {
          const {
            capacity,
            index,
            tokenLogo,
            totalSold,
            endTime,
            bondPrice: _tosPrice,
          } = bond;
          const bondPrice = (1 / _tosPrice) * 1e18 * ethPrice;
          const convertedbondPrice = Number(
            convertNumber({ amount: bondPrice.toString() })
          );
          const discount = ((tosPrice - convertedbondPrice) / tosPrice) * 100;
          const startDay = convertTimeStamp(1676272010);
          const endDay = convertTimeStamp(endTime);

          return {
            bondCapacity: commafy(capacity),
            bondingPrice: convertNumber({
              amount: bondPrice.toString(),
              localeString: true,
              round: false,
            }) as string,
            discountRate: `${commafy(discount)}%`,
            sellTokenType: "ETH",
            buyTokenType: "TOS",
            totalSold: `${commafy(totalSold)} TOS`,
            endTime,
            index,
            startDay,
            leftDay: "",
            endDay,
          };
        }
      );

      setCardList(bondcardDatas);
    }
  }, []);

  return (
    <Flex
      // columns={3} gridRowGap={"24px"} columnGap={"25px"}
      columnGap={"2%"}
      rowGap={"20px"}
      justifyContent={isSmallerThan750 ? "center" : ""}
      flexWrap={"wrap"}
    >
      {cardList?.map((cardData: BondCardProps, index) =>
        index === cardList.length - 1 ? null : (
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
