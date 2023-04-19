import { Flex, Text, useColorMode } from "@chakra-ui/react";
import { useBondCardStyle } from "hooks/style/bond/useBondCardStyle";
import { useCustomColorMode } from "hooks/style/useCustomColorMode";
import useMediaView from "hooks/useMediaView";
import { ReactNode, useMemo } from "react";
import { BondCardProps } from "types/bond";

function TextWrap(props: {
  TextComponent: ReactNode;
  SubTextComponent: ReactNode;
}) {
  return (
    <Flex
      fontSize={12}
      textAlign={"right"}
      alignItems={"flex-end"}
      flexDir={"column"}
      h={"36px"}
      justifyContent={"center"}
    >
      {props.TextComponent}
      {props.SubTextComponent}
    </Flex>
  );
}

function SubText(date: string | undefined) {
  if (date) {
    return (
      <Text maxW={["55px", "80px", "80px"]} fontSize={11} color={"gray.100"}>
        {date}
      </Text>
    );
  }

  return null;
}

export default function BondCard_Status(props: {
  version: number;
  status: BondCardProps["status"] | "Add Capacity";
  date: string | undefined;
}) {
  const { version, status, date } = props;
  const { pcView } = useMediaView();
  const { cardTextColor } = useBondCardStyle();

  const statusText = useMemo(() => {
    switch (status) {
      case "open":
        return (
          <TextWrap
            TextComponent={
              <Text color={cardTextColor} fontWeight={"bold"} fontSize={13}>
                Open
              </Text>
            }
            SubTextComponent={SubText(date)}
          />
        );
      case "will be open":
        return (
          <TextWrap
            TextComponent={
              <Text color={"#5eea8d"} fontWeight={"bold"} fontSize={13}>
                Upcoming
              </Text>
            }
            SubTextComponent={SubText(date)}
          />
        );
      case "closed":
        return (
          <TextWrap
            TextComponent={
              <Text color={"gray.100"} fontWeight={"bold"} fontSize={13}>
                Closed
              </Text>
            }
            SubTextComponent={SubText(date)}
          />
        );
      case "Add Capacity":
        return (
          <TextWrap
            TextComponent={
              <Text
                color={cardTextColor}
                fontWeight={"bold"}
                fontSize={13}
                minW={"95px"}
              >
                Add Capacity
              </Text>
            }
            SubTextComponent={SubText(date)}
          />
        );
      default:
        return;
    }
  }, [status, date, cardTextColor]);

  return (
    <Flex
      mb={"18px"}
      justifyContent={"space-between"}
      alignItems="baseline"
      // minH={"52.5px"}
    >
      <Flex
        fontWeight={600}
        color={cardTextColor}
        h={"28px"}
        alignItems={"center"}
        columnGap={"6px"}
      >
        <Text fontSize={20}>Minting Bond </Text>
        <Text fontSize={11} pb={"4px"}>
          v{version}
        </Text>
      </Flex>{" "}
      <Flex>{statusText}</Flex>
    </Flex>
  );
}
