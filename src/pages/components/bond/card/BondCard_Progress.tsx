import { Flex, Progress, Text } from "@chakra-ui/react";
import { useCustomColorMode } from "hooks/style/useCustomColorMode";
import { BondCardProps } from "types/bond";

type BondCardProgress = {
  progress: number;
  status: BondCardProps["status"];
};

export default function BondCard_Progress(props: BondCardProgress) {
  const { progress, status } = props;
  const { isDark } = useCustomColorMode();
  return (
    <Flex flexDir={"column"} rowGap={"5px"} mb={"17px"}>
      <Flex fontWeight={600} columnGap={"6px"} alignItems={"end"}>
        <Text fontSize={13} color={isDark ? "#dee4ef" : "#3f536e"}>
          Bond Sold
        </Text>
        <Text fontSize={12} color={status !== "open" ? "gray.100" : "blue.200"}>
          {status === "will be open" ? "N/A" : `${progress}%`}
        </Text>
      </Flex>
      <Progress
        w={"100%"}
        h={"5px"}
        borderRadius={100}
        value={progress}
        colorScheme={status === "open" ? "blue" : "gray"}
      />
    </Flex>
  );
}
