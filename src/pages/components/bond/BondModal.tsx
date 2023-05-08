import {
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useColorMode,
  Link,
} from "@chakra-ui/react";
// import { CloseIcon } from "@chakra-ui/icons";
import { subModalState } from "atom//global/modal";
import useModal from "hooks/useModal";
import Image from "next/image";
import CLOSE_ICON from "assets/icons/close-modal.svg";
import USER_GUIDE from "assets/icons/bond/sicon-user_guide.svg";

import SubmitButton from "common/button/SubmitButton";
import { useCallback } from "react";
import useCallContract from "hooks/useCallContract";
import { BondCardProps } from "types/bond";
import { convertToWei } from "@/utils/number";
import useInput from "hooks/useInput";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import useCustomToast from "hooks/useCustomToast";
import { useRecoilState, useRecoilValue } from "recoil";
import useBondModalCondition from "hooks/bond/useBondModalCondition";
import BondConfirm from "./modal/BondConfirm";
import BondModal_BottomContent from "./modal/BondModal_BottomContent";
import useMediaView from "hooks/useMediaView";
import BondModal_Period from "./modal/BondModal_Period";
import { bond_modal, bond_modal_state_defaultValue } from "atom/bond/modal";
import { isProduction } from "constants/production";
import { accountBar } from "atom/global/sidebar";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { ZERO_ADDRESS } from "constants/index";
import { selectedToken0 } from "atom/swap";
import { BondModalInput } from "atom/bond/input";
import BondModal_Balance from "./modal/BondModal_Balance";
import { useBondDepository } from "hooks/bond/useBondDepository";

function BondModal() {
  const [isOpenConfirm, setIsOpenConfirm] = useRecoilState(subModalState);

  const [isOpendAccount, setOpenedAccountBar] = useRecoilState(accountBar);
  const { openModal: openSwapModal } = useModal("swap_interface_modal");
  const [token0, setToken0] = useRecoilState(selectedToken0);
  const { WTON_ADDRESS } = CONTRACT_ADDRESS;

  const { colorMode } = useColorMode();
  const { inputValue, setResetValue } = useInput<BondModalInput>(
    "Bond_screen",
    "bond_modal"
  );

  const { selectedModalData, selectedModal, closeModal } =
    useModal<BondCardProps>();
  const { BondDepositoryProxy_CONTRACT } = useCallContract();
  const bondModalRecoilValue = useRecoilValue(bond_modal);
  const { fiveDaysLockup, fiveDaysLockupEndTime } = bondModalRecoilValue;
  const [bondModalRecoilState, setBondModalRecoilState] =
    useRecoilState(bond_modal);

  const marketId = selectedModalData?.index;

  const { bp700px } = useMediaView();
  const { minimumTosPrice, isMinusDiscount } = useBondModalInputData();

  const { setTx } = useCustomToast({
    confirmedMessage: "Bond purchase success! Go to",
    confirmedLink: "Stake_screen",
  });

  const { inputOver, btnDisabled } = useBondModalCondition();
  const { basePrice } = useBondDepository();

  const closeThisModal = useCallback(() => {
    setResetValue();
    setBondModalRecoilState(bond_modal_state_defaultValue);
    closeModal();
  }, [closeModal, setResetValue, setBondModalRecoilState]);

  const callBond = useCallback(async () => {
    try {
      if (
        BondDepositoryProxy_CONTRACT &&
        inputValue.bond_modal_balance &&
        minimumTosPrice &&
        basePrice
      ) {
        const inputAmount = String(inputValue.bond_modal_balance)
          .replaceAll(",", "")
          .replaceAll(" ", "");
        const periodWeeks = inputValue.bond_modal_period + 1;

        if (!fiveDaysLockup && inputValue.bond_modal_period) {
          console.log("---ETHDepositWithSTOS()---");
          console.log(`marketId : ${marketId}`);
          console.log(`inputAmount : ${convertToWei(inputAmount)}`);
          console.log(`minimumTosPrice : ${minimumTosPrice.toString()}`);
          console.log(`periodWeeks : ${periodWeeks}`);
          console.log(`value : ${convertToWei(inputAmount)}`);

          const tx = await BondDepositoryProxy_CONTRACT.ETHDepositWithSTOS(
            marketId,
            convertToWei(inputAmount),
            minimumTosPrice,
            periodWeeks,
            { value: convertToWei(inputAmount) }
          );
          setTx(tx);
          return closeThisModal();
        }

        console.log("---ETHDeposit()---");
        console.log(`marketId : ${marketId}`);
        console.log(`inputAmount : ${convertToWei(inputAmount)}`);
        console.log(`minimumTosPrice : ${minimumTosPrice.toString()}`);
        console.log(`value : ${convertToWei(inputAmount)}`);

        // just in case when bondingDiscount is not correct on a frontend side
        // const bondingPrice = await BondDepositoryProxy_CONTRACT.getBondingPrice(
        //   marketId,
        //   0,
        //   basePrice
        // );

        const tx = await BondDepositoryProxy_CONTRACT.ETHDeposit(
          marketId,
          convertToWei(inputAmount),
          minimumTosPrice,
          { value: convertToWei(inputAmount) }
        );
        setTx(tx);
        return closeThisModal();
      }
    } catch (e) {
      // console.log(e);
      // return errToast();
    } finally {
      setIsOpenConfirm(null);
    }
  }, [
    inputValue,
    BondDepositoryProxy_CONTRACT,
    marketId,
    fiveDaysLockup,
    setTx,
    closeThisModal,
    minimumTosPrice,
    basePrice,
    setIsOpenConfirm,
  ]);

  return (
    <Modal
      isOpen={selectedModal === "bond_bond_modal"}
      isCentered
      onClose={() => closeThisModal()}
    >
      <ModalOverlay className="modalOverlayDrawer" bg={"none"} />
      <ModalContent
        bg={colorMode === "light" ? "white.100" : "#121318"}
        minW={bp700px ? "350px" : "700px"}
        maxW={bp700px ? "350px" : "700px"}
        mt={bp700px ? 0 : undefined}
        top={bp700px ? "60px" : undefined}
        overflow={bp700px ? "auto" : undefined}
        // position="fixed"
        // bottom={"unset"}
        maxH={bp700px ? "80vh" : undefined}
      >
        <ModalBody px={0} pt={"30px"} h={"auto"}>
          <Flex w="100%" flexDir={"column"}>
            {/*TOP Area*/}
            <Flex flexDir={"column"} pos={"relative"}>
              {/* Title Area*/}
              <Flex
                w={"100%"}
                flexDir={"column"}
                mb={"34px"}
                alignItems={"center"}
                rowGap={"6px"}
              >
                {/* <TokenSymbol
                  tokenType={"ETH"}
                  h={"30px"}
                  w={"30px"}
                ></TokenSymbol> */}
                <Flex>
                  <Text
                    color={colorMode === "light" ? "gray.800" : "white.200"}
                    fontSize={20}
                    fontWeight={600}
                  >
                    Minting Bond{" "}
                    <span style={{ fontSize: "11px" }}>
                      {selectedModalData?.version}
                    </span>
                  </Text>
                  <Flex
                    pos={"absolute"}
                    right={"1.56em"}
                    cursor={"pointer"}
                    onClick={() => closeThisModal()}
                  >
                    <Image src={CLOSE_ICON} alt={"CLOSE_ICON"}></Image>
                  </Flex>
                </Flex>
                <Flex
                  columnGap={"6px"}
                  pl={"4px"}
                  cursor={"pointer"}
                  onClick={() => {}}
                >
                  <Image src={USER_GUIDE} alt={"USER_GUIDE"}></Image>
                  <Text fontSize={13} color={"gray.100"}>
                    User Guide
                  </Text>
                </Flex>
              </Flex>
              {/* Content Area*/}
              <Flex
                w={"100%"}
                flexDir={"column"}
                px={bp700px ? "20px" : "50px"}
                mb={"29px"}
                rowGap={"30px"}
                mt={bp700px ? "34px" : ""}
              >
                {/* Period input */}
                <BondModal_Period />
                {/* ETH input */}
                <BondModal_Balance />
                {/* end of content middle area */}
              </Flex>

              {/* Content Bottom */}
              <BondModal_BottomContent
                fiveDaysLockup={fiveDaysLockup}
                fiveDaysLockupEndTime={fiveDaysLockupEndTime}
              />
            </Flex>
            <Flex justifyContent={"center"}>
              <SubmitButton
                w={bp700px ? 310 : 460}
                h={42}
                name="Bond"
                onClick={() =>
                  isMinusDiscount
                    ? setIsOpenConfirm("bond_confirm")
                    : callBond()
                }
                isDisabled={fiveDaysLockup ? inputOver : btnDisabled}
              ></SubmitButton>
            </Flex>
            {!isMinusDiscount && (
              <Flex
                fontSize={11}
                textAlign="center"
                w={"100%"}
                mt={"21px"}
                mb={"24px"}
                flexDir={"column"}
                // color={colorMode === "dark" ? "white.200" : "gray.700"}
                color={"#8b8b93"}
                px={bp700px ? "20px" : 0}
              >
                <Flex alignItems={"center"} justifyContent={"center"}>
                  <Text>
                    <span style={{ color: "#e23738", marginRight: "2px" }}>
                      *
                    </span>
                    The amount may change slightly based on the slippage (0.5%).{" "}
                    {bp700px ? null : <br />}
                    If the price slips any further, txn will revert.
                  </Text>
                </Flex>
              </Flex>
            )}
            {isMinusDiscount && (
              <Flex
                fontSize={11}
                textAlign="center"
                w={"100%"}
                mt={"21px"}
                mb={"24px"}
                flexDir={"column"}
                // color={colorMode === "dark" ? "white.200" : "gray.700"}
                color={"#e23738"}
                px={bp700px ? "20px" : 0}
              >
                <Text>
                  You can purchase TOS for a lower price at Tokamak Network Swap
                  <br />
                  using{" "}
                  <span
                    style={{
                      color: colorMode === "dark" ? "#f1f1f1" : "#07070c",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    // onClick={openSwapModal}
                    onClick={() => {
                      setOpenedAccountBar(true);
                      openSwapModal();
                      setToken0({
                        name: "WTON",
                        address: WTON_ADDRESS,
                        img: "https://tonstarter-symbols.s3.ap-northeast-2.amazonaws.com/wton-symbol%403x.png",
                      });
                    }}
                  >
                    WTON
                  </span>
                  <span
                    style={{
                      color: colorMode === "dark" ? "#f1f1f1" : "#07070c",
                    }}
                  >
                    {" "}
                    &{" "}
                  </span>
                  <span
                    style={{
                      color: colorMode === "dark" ? "#f1f1f1" : "#07070c",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setOpenedAccountBar(true);
                      openSwapModal();
                      setToken0({
                        name: "ETH",
                        address: ZERO_ADDRESS,
                        img: "",
                      });
                    }}
                  >
                    {" "}
                    ETH
                  </span>{" "}
                  and{" "}
                  <Link
                    isExternal={true}
                    href={
                      isProduction()
                        ? "https://tosv2.tokamak.network/stake"
                        : "https://goerli.tosv2.tokamak.network/stake"
                    }
                    color={colorMode === "dark" ? "white.200" : "gray.800"}
                    textDecoration={"underline"}
                  >
                    stake
                  </Link>{" "}
                  them for LTOS
                </Text>
              </Flex>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
      <BondConfirm callBond={callBond}></BondConfirm>
    </Modal>
  );
}

export default BondModal;
