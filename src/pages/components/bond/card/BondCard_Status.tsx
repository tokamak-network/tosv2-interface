import { Flex, Text } from "@chakra-ui/react";
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
    >
      {props.TextComponent}
      {props.SubTextComponent}
    </Flex>
  );
}

function SubText(date: string | undefined) {
  if (date) {
    return (
      <Text fontSize={11} color={"gray.100"}>
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

  const statusText = useMemo(() => {
    switch (status) {
      case "open":
        return (
          <TextWrap
            TextComponent={
              <Text color={"white.200"} fontWeight={"bold"} fontSize={13}>
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
              <Text color={"white.200"} fontWeight={"bold"} fontSize={13}>
                Add Capacity
              </Text>
            }
            SubTextComponent={SubText(date)}
          />
        );
      default:
        return;
    }
  }, [status, date]);

  return (
    <Flex mb={"18px"} justifyContent={"space-between"} alignItems="center">
      <Flex
        fontWeight={600}
        color={"white.200"}
        h={"28px"}
        alignItems={"end"}
        columnGap={"6px"}
      >
        <Text fontSize={20}>Minting Bond </Text>
        <Text fontSize={11} pb={"4px"}>
          v{version}
        </Text>
      </Flex>
      {statusText}
    </Flex>
  );
}
