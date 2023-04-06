import { Flex, Progress, Text } from "@chakra-ui/react";

type BondCardProgress = {
  progress: number;
  isNA: boolean;
};

export default function BondCard_Progress(props: BondCardProgress) {
  const { progress, isNA } = props;
  return (
    <Flex flexDir={"column"} rowGap={"5px"} mb={"17px"}>
      <Flex fontWeight={600} columnGap={"6px"} alignItems={"end"}>
        <Text fontSize={13} color={"#dee4ef"}>
          Bond Sold
        </Text>
        <Text fontSize={12} color={isNA ? "gray.100" : "blue.200"}>
          {isNA ? "N/A" : `${progress}%`}
        </Text>
      </Flex>
      <Progress w={"100%"} h={"5px"} borderRadius={100} value={progress} />
    </Flex>
  );
}
