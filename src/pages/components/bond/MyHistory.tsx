import { Flex } from "@chakra-ui/react";
import {useDisclosure} from '@chakra-ui/react';
import MyCardSection from "./MyCardSection";
import { useWeb3React } from "@web3-react/core";
import SubmitButton from "common/button/SubmitButton";
import {WalletModal} from 'common/wallet/index';
function MyHistory() {
  const { library, account } = useWeb3React();

  const {onOpen, isOpen: isModalOpen, onClose} = useDisclosure();
  const handleWalletModalOpen = () => {
    onOpen();
  };
  return (
    <Flex justifyContent={"center"} alignItems={"center"}>
      {account !== undefined ? (
        <MyCardSection></MyCardSection>
      ) : (
        <Flex>
          {" "}
          <SubmitButton name="Connect Wallet" w={240} h={42} style={{fontSize: 16}}  onClick={() => handleWalletModalOpen()}/>{" "}
        </Flex>
      )}
        <WalletModal isOpen={isModalOpen} onClose={onClose}/>
    </Flex>
  );
}

export default MyHistory;
