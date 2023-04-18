import { Flex, Text } from "@chakra-ui/react";
import { useBondCardStyle } from "hooks/style/bond/useBondCardStyle";

export default function BondCard_Capacity(props: {
  ethAmount: number | string;
  date: string;
}) {
  const { cardTextColor } = useBondCardStyle();

  return (
    <Flex
      fontSize={12}
      color={cardTextColor}
      textAlign={"center"}
      w={"100%"}
      justifyContent={"center"}
      flexDir={"column"}
    >
      <Text>{props.ethAmount} ETH will be added to this market in</Text>
      <Text>{props.date}.</Text>
    </Flex>
  );
}
