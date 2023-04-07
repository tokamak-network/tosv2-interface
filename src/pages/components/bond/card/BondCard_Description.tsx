import { Flex, Text } from "@chakra-ui/react";
import { accountBar } from "atom/global/sidebar";
import { selectedToken0 } from "atom/swap";
import { ZERO_ADDRESS } from "constants/index";
import useModal from "hooks/useModal";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

function WarningComponent(props: { discountRate: number }) {
  const { discountRate } = props;
  const { openModal: openSwapModal } = useModal("swap_interface_modal");
  const [token0, setToken0] = useRecoilState(selectedToken0);
  const [isOpendAccount, setOpenedAccountBar] = useRecoilState(accountBar);
  const { openModal } = useModal("stake_stake_modal");
  const router = useRouter();

  const sendToStake = () => {
    router.push("/stake");
    openModal();
  };

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
        . Use{" "}
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => {
            setOpenedAccountBar(true);
            openSwapModal();
            setToken0({
              name: "ETH",
              address: ZERO_ADDRESS,
              img: "https://tonstarter-symbols.s3.ap-northeast-2.amazonaws.com/wton-symbol%403x.png",
            });
          }}
        >
          Tokamak Network Swap
        </span>{" "}
        for better price &amp;
        <span
          style={{
            textDecoration: "underline",
            marginLeft: "3px",
            cursor: "pointer",
          }}
          onClick={() => sendToStake()}
        >
          stake
        </span>
        .
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
