import { Flex, Text } from "@chakra-ui/react";
import useModal from "hooks/useModal";

function WarningComponent(props: { discountRate: number }) {
  const { discountRate } = props;
  const { openModal: openSwapModal } = useModal("swap_interface_modal");

  return (
    <>
      <Text fontWeight={"bold"}>
        NEGATIVE DISCOUNT <span style={{ color: "#e23738" }}>WARNING</span>
      </Text>
      <Text>
        Current bond discount is{" "}
        <span style={{ fontWeight: "bold", color: "#e23738" }}>
          {discountRate}%
        </span>
        . Use Tokamak Network Swap for better price &amp; stake.
      </Text>
    </>
  );
}

export default function BondCard_Description(props: {
  description: string;
  discountRate: number;
}) {
  const { description, discountRate } = props;
  const isWarning = discountRate < 0;
  return (
    <Flex
      w={"300px"}
      maxW={"300px"}
      textAlign={"center"}
      fontSize={12}
      color={"white.200"}
      lineHeight={"18px"}
      flexDir={isWarning ? "column" : "row"}
    >
      {isWarning ? (
        <WarningComponent discountRate={discountRate} />
      ) : (
        <Text>{description}</Text>
      )}
    </Flex>
  );
}
