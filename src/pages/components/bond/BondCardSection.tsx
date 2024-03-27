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
import { log } from "console";
import { bondDB } from "constants/db";

function BondCardSection() {
  const [cardList, setCardList] = useState<BondCardProps[] | undefined>(
    undefined
  );
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");

  /**
   * fetch through DB
   */
  // const { loading, error, data } = useQuery(GET_BOND_LIST, {
  //   variables: {
  //     period: "-1",
  //   },
  //   pollInterval: 10000,
  // });
  const data = bondDB;
  const { priceData } = usePrice();

  // const { BondDepositoryProxy_CONTRACT } = useCallContract();

  // useEffect(() => {
  //   async function test() {
  //     if (BondDepositoryProxy_CONTRACT) {
  //       const test = await BondDepositoryProxy_CONTRACT.getBonds();
  //       console.log(test);
  //     }
  //   }
  //   test();
  // }, [BondDepositoryProxy_CONTRACT]);

  useEffect(() => {
    if (data && priceData && priceData?.tosPrice && priceData?.ethPrice) {
      const bonds = data.getBondList;
      const { ethPrice, tosPrice } = priceData;
      const dum: BondCardProps[] = bonds.map((bond: BondRawdata) => {
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

        return {
          bondCapacity: commafy(capacity),
          bondingPrice: convertNumber({
            amount: bondPrice.toString(),
            localeString: true,
            round: false,
          }) as string,
          discountRate: `${commafy(discount)}%`,
          tokenType: "ETH",
          totalSold: `${commafy(totalSold)} TOS`,
          endTime,
          index,
        };
      });

      console.log(dum);
      setCardList(dum);
    }
  }, [data, priceData]);

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
