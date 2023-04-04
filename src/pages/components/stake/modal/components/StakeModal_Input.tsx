import { convertToWei } from "@/utils/number";
import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { bond_modal } from "atom/bond/modal";
import { BalanceInput } from "common/input/TextInput";
import TokenSymbol from "common/token/TokenSymol";
import constant from "constant";
import { BigNumber, ethers } from "ethers";
import useBondModal from "hooks/bond/useBondModal";
import useBondModalCondition from "hooks/bond/useBondModalCondition";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { SetterOrUpdater, useRecoilValue } from "recoil";
import { PageKey, SupportedInputTokenTypes } from "types";
import { useWeb3React } from "@web3-react/core";
import useMediaView from "hooks/useMediaView";
import TokenImageContrainer from "pages/components/common/modal/TokenImageContrainer";
import { StakeCardProps } from "types/stake";
import { InputKey } from "types/atom";

const bondToken: SupportedInputTokenTypes = "ETH";

type StakeModalInput = {
  defaultValue: string | number | undefined;
  maxValue: string | number | undefined;
  tokenBalance: string | undefined;
  inputTokenType: SupportedInputTokenTypes;
  pageKey: PageKey;
  recoilKey: InputKey;
  atomKey: string;
  err: {
    zeroInputBalance: boolean;
    inputOver: boolean;
    inputBalanceIsEmpty: boolean;
  };
  buyMoreButton?: boolean;
  isDisabled?: boolean;
};

export default function StakeModal_Input(props: StakeModalInput) {
  const {
    defaultValue,
    maxValue,
    tokenBalance,
    inputTokenType,
    pageKey,
    recoilKey,
    atomKey,
    err: { zeroInputBalance, inputOver, inputBalanceIsEmpty },
    buyMoreButton,
    isDisabled,
  } = props;
  const { errMsg } = constant;
  const { inputValue, setValue } = useInput(pageKey, recoilKey);
  const { bondDiscount, isMinusDiscount, minimumTosPrice, roi, isMinusROI } =
    useBondModalInputData();
  const { colorMode } = useColorMode();

  const bondModalRecoilValue = useRecoilValue(bond_modal);
  const { fiveDaysLockup } = bondModalRecoilValue;
  const { bp700px } = useMediaView();

  const { openModal: openSwapModal, selectedModal } = useModal(
    "swap_interface_modal"
  );

  const setMaxValue = useCallback(() => {
    if (maxValue) return setValue({ ...inputValue, [atomKey]: maxValue });
  }, [maxValue, atomKey, inputValue]);

  return (
    <Flex alignItems={"center"} flexDir={"column"} rowGap={"10px"}>
      <Flex
        borderWidth={"1px"}
        borderColor={
          maxValue !== undefined &&
          (zeroInputBalance || inputOver || inputBalanceIsEmpty)
            ? "#e23738"
            : colorMode === "dark"
            ? "#313442"
            : "#e8edf2"
        }
        w={bp700px ? "310px" : "460px"}
        h={"78px"}
        bgColor={colorMode === "dark" ? "#1f2128" : "white.100"}
        px={"20px"}
        py={"14px"}
        borderRadius={"10px"}
        flexDir={"column"}
        rowGap={"9px"}
      >
        <Flex justifyContent={"space-between"} h={"25px"}>
          <BalanceInput
            placeHolder={"0.00"}
            pageKey={pageKey}
            recoilKey={recoilKey}
            atomKey={atomKey}
            isError={
              maxValue !== undefined &&
              (zeroInputBalance || inputOver || inputBalanceIsEmpty)
            }
            errorMsg={
              inputBalanceIsEmpty
                ? undefined
                : inputOver
                ? inputTokenType === "LTOS"
                  ? errMsg.stake.ltosBalanceIsOver
                  : errMsg.stake.tosBalanceIsOver
                : errMsg.stake.inputIsZero
            }
            fontSize={18}
            w={bp700px ? "190px" : "270px"}
            inputContainerStyle={{
              borderRadius: 0,
              borderWidth: 0,
              margin: 0,
              fontWeight: 600,
              height: "25px",
            }}
            inputFieldStyle={{ padding: 0 }}
            isDisabled={isDisabled}
          ></BalanceInput>
          <TokenImageContrainer
            tokenTypes={inputTokenType}
            name={inputTokenType}
          ></TokenImageContrainer>
        </Flex>
        <Flex fontSize={12} columnGap={"9px"} alignItems={"center"}>
          <Text>
            Balance: {tokenBalance} {inputTokenType}
          </Text>
          <Button
            w={"48px"}
            h={"20px"}
            border={
              colorMode === "dark" ? "1px solid #535353" : "1px solid #e8edf2"
            }
            bgColor={"transparent"}
            fontSize={11}
            color={"blue.200"}
            onClick={() => setMaxValue()}
          >
            MAX
          </Button>
          {buyMoreButton !== false && (
            <Text
              color={"blue.200"}
              fontSize="12px"
              onClick={openSwapModal}
              _hover={{ cursor: "pointer" }}
              mr="5px"
            >
              Buy More
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
