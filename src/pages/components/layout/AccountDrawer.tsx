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
  useColorMode,
} from "@chakra-ui/react";
import { accountBar } from "atom/global/sidebar";
import { useRecoilState } from "recoil";
import WalletIconLayOut from "./components/WalletIconLayout";
import CLOSE_ICON from "assets/icons/close-modal(white).svg";
import CLOSE_ICON_LIGHT from "assets/icons/close-modal(dark).svg";
import TokenSymbol from "common/token/TokenSymol";
import Image from "next/image";
import useUserBalance from "hooks/useUserBalance";
import BasicButton from "common/button/BasicButton";
import SubmitButton from "common/button/SubmitButton";
import { useRouter } from "next/router";
import useModal from "hooks/useModal";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import NetworkIcon from "./components/NetworkIcon";

type HeaderProps = {
  walletopen: () => void;
};

function TitleText(props: { title: string }) {
  const { colorMode } = useColorMode();
  return (
    <Text fontSize={12} color={colorMode === "light" ? "#7e7e8f" : "#8b8b93"}>
      {props.title}
    </Text>
  );
}

function AccountDrawer(props: HeaderProps) {
  const [isOpen, setIsOpen] = useRecoilState(accountBar);
  const { userTOSBalance, userLTOSBalance, userSTOSBalance } = useUserBalance();
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { openModal } = useModal("stake_stake_modal");
  const { account, connector, activate, active, error, deactivate } =
    useWeb3React();
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
      <DrawerOverlay zIndex={1001} className="modalOverlayDrawer"  bg={'none'}  />
      <DrawerContent
        bg={colorMode === "dark" ? "#1f2128" : "white.0"}
        px={"23px"}
        minW={"360px"}
        maxW={"360px"}
      >
        <DrawerHeader p={0} zIndex={10000}>
          <Flex alignItems={"center"} pt={"13px"}>
            <NetworkIcon />
            <WalletIconLayOut
              ml={"9px"}
              w={"147px"}
              fontSize={16}
              bg={colorMode === "dark" ? "#07070c" : "transparent"}
              h={"48px"}
              borderRadius={8}
              border={
                colorMode === "dark" ? "1px solid #313442" : "1px solid #e8edf2"
              }
            ></WalletIconLayOut>
            <Text
              fontSize={13}
              ml={"14px"}
              mr={"23px"}
              color={"blue.200"}
              cursor={"pointer"}
              onClick={props.walletopen}
            >
              Change
            </Text>
            <Image
              src={colorMode === "dark" ? CLOSE_ICON : CLOSE_ICON_LIGHT}
              alt={"CLOSE_ICON"}
              style={{ cursor: "pointer", height: "21px", width: "21px" }}
              onClick={() => setIsOpen(false)}
            ></Image>
          </Flex>
        </DrawerHeader>

        <DrawerBody p={0}>
          <Grid pt={"30px"} flexDir={"column"} rowGap={"21px"}>
            <GridItem>
              <TitleText title={"Available Balance"}></TitleText>
              <Flex
                color={colorMode === "dark" ? "white.200" : "gray.800"}
                alignItems={"center"}
                justifyContent={"space-between"}
                mt={"6px"}
              >
                <Flex alignItems={"center"} h={"25px"}>
                  <Text fontSize={18} fontWeight={600}>
                    {userTOSBalance || "-"}
                  </Text>
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
                color={colorMode === "dark" ? "white.200" : "gray.800"}
                alignItems={"center"}
                // justifyContent={"space-between"}
                mt={"8px"}
              >
                <Flex alignItems={"center"}>
                  <Text fontSize={"16px"} fontWeight={600}>
                    {userLTOSBalance}
                  </Text>
                  <Flex
                    fontSize={"12px"}
                    height={"24px"}
                    ml={"5px"}
                    alignItems={"flex-end"}
                    pb={"2px"}
                    mr="9px"
                    fontWeight={600}
                  >
                    LTOS
                  </Flex>
                </Flex>
                <Text
                  color={colorMode === "dark" ? "#64646f" : "#9a9aaf"}
                  mr="9px"
                >
                  /
                </Text>
                <Flex alignItems={"center"}>
                  <Text
                    fontWeight={600}
                    color={colorMode === "dark" ? "white.200" : "gray.800"}
                    fontSize={"16px"}
                  >
                    {userSTOSBalance}
                  </Text>
                  <Flex
                    fontSize={"12px"}
                    height={"24px"}
                    ml={"5px"}
                    alignItems={"flex-end"}
                    pb={"2px"}
                    fontWeight={600}
                  >
                    sTOS
                  </Flex>
                </Flex>
              </Flex>
            </GridItem>
          </Grid>
        </DrawerBody>

        <DrawerFooter>
          <Flex width={"100%"} justifyContent={"center"}>
            <Flex
              h="42px"
              w="170px"
              border={"1px solid"}
              borderColor={colorMode === "light" ? "#7e7e8f" : "#8a8a98"}
              borderRadius="8px"
              justifyContent="center"
              alignItems={"center"}
              color={colorMode === "light" ? "gray.800" : "white.200"}
              fontWeight={500}
              onClick={() => {
                deactivate();
                setIsOpen(false);
              }}
              _hover={{ cursor: account ? "pointer" : "not-allowed" }}
            >
              Disconnect
            </Flex>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default AccountDrawer;
