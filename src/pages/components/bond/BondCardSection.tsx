import { useQuery } from "@apollo/client";
import { Flex, SimpleGrid, useMediaQuery, Wrap } from "@chakra-ui/react";
import TabButton from "common/button/TabButton";
import { GET_BOND_LIST } from "graphql/bond/getBond";
import { useEffect, useState } from "react";
import { BondRawdata, BondCardProps } from "types/bond";
import BondCard from "./BondCard";
import commafy from "utils/commafy";

function BondCardSection() {
  const [cardList, setCardList] = useState<BondCardProps[] | undefined>(
    undefined
  );
  const [isSmallerThan750] = useMediaQuery("(max-width: 750px)");
  const { loading, error, data } = useQuery(GET_BOND_LIST, {
    variables: {
      period: "-1",
      limit: 1,
    },
  });

  console.log(data);

  useEffect(() => {
    if (data) {
      const { bonds } = data.getBondList[0];
      const dum: BondCardProps[] = bonds.map((bond: BondRawdata) => {
        const { bondPrice, capacity, index, tokenLogo, totalSold } = bond;
        return {
          bondCapacity: commafy(capacity),
          bondingPrice: bondPrice,
          discountRate: "0.5%",
          tokenType: "ETH",
          totalSold: `${commafy(totalSold)} TOS`,
          timeLeft: "",
        };
      });
      setCardList(dum);
    }
  }, [data]);

  return (
    <Flex
      // columns={3} gridRowGap={"24px"} columnGap={"25px"}
      columnGap={"2%"}
      rowGap={"20px"}
      justifyContent={isSmallerThan750 ? "center" : ""}
      flexWrap={"wrap"}
    >
      {cardList?.map((cardData: BondCardProps, index) => (
        <BondCard
          data={cardData}
          key={cardData.bondCapacity + index}
        ></BondCard>
      ))}
    </Flex>
  );
}

export default BondCardSection;
