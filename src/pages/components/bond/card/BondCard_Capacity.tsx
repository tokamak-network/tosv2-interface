import { Flex, Text } from "@chakra-ui/react";

export default function BondCard_Capacity(props: {
  ethAmount: number | string;
  date: string;
}) {
  return (
    <Flex
      fontSize={12}
      color={"white.200"}
      textAlign={"center"}
      w={"100%"}
      justifyContent={"center"}
      flexDir={"column"}
    >
      <Text>{props.ethAmount} will be added to this market in</Text>
      <Text>{props.date}.</Text>
    </Flex>
  );
}
