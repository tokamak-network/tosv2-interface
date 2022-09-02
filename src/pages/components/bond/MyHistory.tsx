import { Flex, Text } from "@chakra-ui/react";
import MyCardSection from "./MyCardSection";
import { useWeb3React } from "@web3-react/core";
import SubmitButton from "common/button/SubmitButton";
import useWallet from "hooks/useWallet";

function MyHistory() {
  const { account, activate } = useWeb3React();
  const { tryActivation } = useWallet();

  if (account) {
    return (
      <Flex>
        <MyCardSection></MyCardSection>
      </Flex>
    );
  }

  return (
    <Flex flexDir={"column"} alignItems={"center"}>
      {/* <Text fontSize={24} fontWeight={600} color={"white.200"} mb={"24px"}>
        Before connecting Wallet
      </Text> */}
      <SubmitButton
        name="Connect Wallet"
        w={"240px"}
        h={"42px"}
        style={{ fontSize: 16 }}
        onClick={tryActivation}
      ></SubmitButton>
    </Flex>
  );
}

export default MyHistory;
