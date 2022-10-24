import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Box,
  Flex,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { accountBar } from "atom/global/sidebar";
import { useRecoilState } from "recoil";
import WalletIconLayOut from "./components/WalletIconLayout";
import CLOSE_ICON from "assets/icons/close-modal(white).svg";
import Image from "next/image";
import useUserBalance from "hooks/useUserBalance";
import BasicButton from "common/button/BasicButton";
import SubmitButton from "common/button/SubmitButton";
import { useRouter } from "next/router";
import useModal from "hooks/useModal";

type HeaderProps = {
  walletopen: () => void;
};

function TitleText(props: { title: string }) {
  return (
    <Text fontSize={12} color={"#8b8b93"}>
      {props.title}
    </Text>
  );
}

function AccountDrawer(props: HeaderProps) {
  const [isOpen, setIsOpen] = useRecoilState(accountBar);
  const { userTOSBalance, userLTOSBalance, userSTOSBalance } = useUserBalance();

  const router = useRouter();
  const { openModal } = useModal("stake_stake_modal");

  const sendToStake = () => {
    router.push("/stake");
    openModal();
    setIsOpen(false);
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={() => {
        setIsOpen(false);
      }}
    >
      <DrawerOverlay />
      <DrawerContent bg={"#1f2128"} px={"23px"} minW={"340px"} maxW={"340px"}>
        <DrawerHeader p={0}>
          <Flex alignItems={"center"} pt={"13px"}>
            <WalletIconLayOut
              w={"179px"}
              fontSize={16}
              bg={"#07070c"}
              h={"48px"}
              pl={"15px"}
              borderRadius={8}
              border={"1px solid #313442"}
            ></WalletIconLayOut>
            <Text
              fontSize={13}
              ml={"15px"}
              mr={"24px"}
              color={"blue.200"}
              cursor={"pointer"}
              onClick={props.walletopen}
            >
              Change
            </Text>
            <Image
              src={CLOSE_ICON}
              alt={"CLOSE_ICON"}
              style={{ cursor: "pointer" }}
              onClick={() => setIsOpen(false)}
            ></Image>
          </Flex>
        </DrawerHeader>

        <DrawerBody p={0}>
          <Grid pt={"30px"} flexDir={"column"} rowGap={"21px"}>
            <GridItem>
              <TitleText title={"Available Balance"}></TitleText>
              <Flex
                color={"white.200"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={"6px"}
              >
                <Flex alignItems={"center"} h={"25px"}>
                  <Text fontSize={18}>{userTOSBalance || "-"}</Text>
                  <Flex
                    fontSize={12}
                    height={"27px"}
                    ml={"5px"}
                    alignItems={"flex-end"}
                    pb={"2px"}
                  >
                    TOS
                  </Flex>
                </Flex>
                <SubmitButton
                  name="Stake"
                  w={"90px"}
                  h={"30px"}
                  onClick={sendToStake}
                ></SubmitButton>
              </Flex>
            </GridItem>
            <GridItem>
              <TitleText title={"My Staked"}></TitleText>
              <Flex
                color={"white.200"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={"8px"}
              >
                <Flex alignItems={"center"}>
                  <Text fontSize={16}>{userLTOSBalance}</Text>
                  <Flex
                    fontSize={12}
                    height={"24px"}
                    ml={"5px"}
                    alignItems={"flex-end"}
                    pb={"2px"}
                  >
                    LTOS
                  </Flex>
                </Flex>
                <Text color={"#64646f"}>/</Text>
                <Flex alignItems={"center"}>
                  <Text fontSize={16}>{userSTOSBalance}</Text>
                  <Flex
                    fontSize={12}
                    height={"24px"}
                    ml={"5px"}
                    alignItems={"flex-end"}
                    pb={"2px"}
                  >
                    sTOS
                  </Flex>
                </Flex>
              </Flex>
            </GridItem>
          </Grid>
        </DrawerBody>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AccountDrawer;
