import { Flex, Progress, Text } from "@chakra-ui/react";
import { useCustomColorMode } from "hooks/style/useCustomColorMode";
import { LegacyRef, useEffect, useRef } from "react";
import { BondCardProps } from "types/bond";

type BondCardProgress = {
  progress: number;
  status: BondCardProps["status"];
  currentRound: number;
};

export default function BondCard_Progress(props: BondCardProgress) {
  const { progress, status, currentRound } = props;
  const { isDark } = useCustomColorMode();
  const progressBarRef = useRef<LegacyRef<HTMLDivElement> | undefined>(
    undefined
  );

  useEffect(() => {
    if (
      //@ts-ignore
      progressBarRef?.current?.children[0] &&
      status === "closed"
    ) {
      //@ts-ignore
      const progress = progressBarRef.current.children[0];
      progress.style.backgroundColor = isDark ? "#64646f" : "#c6cbd9";
    }
  }, [progressBarRef, isDark, status]);

  return (
    <Flex flexDir={"column"} rowGap={"5px"} mb={"17px"}>
      <Flex fontWeight={600} columnGap={"6px"} alignItems={"baseline"}>
        <Text fontSize={13} color={isDark ? "#dee4ef" : "#3f536e"}>
          Bond Sold
        </Text>
        <Text
          fontSize={12}
          color={
            status !== "open" || currentRound !== 1 ? "gray.100" : "blue.200"
          }
        >
          {status === "will be open" || currentRound !== 1
            ? "N/A"
            : `${progress}%`}
        </Text>
      </Flex>
      <Progress
        w={"100%"}
        h={"5px"}
        borderRadius={100}
        //@ts-ignore
        ref={progressBarRef}
        value={
          status === "open" && currentRound !== 1
            ? 0
            : status === "will be open"
            ? 0
            : progress
        }
        bg={isDark ? "#353d48" : "#e7edf3"}
        colorScheme={status === "open" && currentRound === 1 ? "blue" : "gray"}
      />
    </Flex>
  );
}
