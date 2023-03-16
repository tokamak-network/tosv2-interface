import { convertToWei } from "@/utils/number";
import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { bond_modal } from "atom/bond/modal";
import { BalanceInput } from "common/input/TextInput";
import TokenSymbol from "common/token/TokenSymol";
import constant from "constant";
import { ethers } from "ethers";
import useBondModal from "hooks/bond/useBondModal";
import useBondModalCondition from "hooks/bond/useBondModalCondition";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { TokenTypes } from "types";
import { BondCardProps } from "types/bond";

let bondTokenType = "ETH";

function TokenImageContrainer(props: { tokenTypes: TokenTypes; name: string }) {
  const { colorMode } = useColorMode();

  return (
    <Flex columnGap={"9px"} alignItems={"center"}>
      <TokenSymbol
        tokenType={props.tokenTypes}
        w={"24px"}
        h={"24px"}
        imageW={"8.4px"}
        imageH={"14.4px"}
      ></TokenSymbol>
      <Text color={colorMode === "dark" ? "white.200" : "gray.800"}>
        {props.name}
      </Text>
    </Flex>
  );
}

export default function BondModal_Input() {
  const { errMsg } = constant;
  const { modalCondition, userTokenBalance } = useBondModal();
  const { zeroInputBalance, inputOver, inputBalanceisEmpty } = modalCondition;
  const { maxValue, balacne, balanceNum, name } = userTokenBalance;
  const { inputValue, setValue } = useInput("Bond_screen", "bond_modal");
  const { bondDiscount, isMinusDiscount, minimumTosPrice } =
    useBondModalInputData();
  const { colorMode } = useColorMode();
  const [actualMaxValue, setActualMaxValue] = useState<string | undefined>(
    undefined
  );

  const { BondDepositoryProxy_CONTRACT } = useCallContract();
  const bondModalRecoilValue = useRecoilValue(bond_modal);
  const { fiveDaysLockup } = bondModalRecoilValue;

  const { selectedModalData } = useModal<BondCardProps>();
  const marketId = selectedModalData?.index;

  const tokenImage = useMemo(() => {
    switch (bondTokenType) {
      case "ETH":
        return (
          <TokenImageContrainer
            tokenTypes={"ETH"}
            name={"ETH"}
          ></TokenImageContrainer>
        );
      default:
        return <Text>no bondTokenType</Text>;
    }
  }, []);

  useEffect(() => {
    async function fetchActualMaxValue() {
      if (BondDepositoryProxy_CONTRACT && maxValue && minimumTosPrice) {
        const inputAmount = String(maxValue)
          .replaceAll(",", "")
          .replaceAll(" ", "");
        const parseInputAmount = ethers.utils.parseUnits(inputAmount, 18);
        const periodWeeks = inputValue.bond_modal_period + 1;

        if (!fiveDaysLockup && inputValue.bond_modal_period) {
          const gasEstimate =
            await BondDepositoryProxy_CONTRACT.estimateGas.ETHDepositWithSTOS(
              marketId,
              convertToWei(inputAmount),
              minimumTosPrice,
              periodWeeks,
              { value: convertToWei(inputAmount) }
            );
          const subtractedMaxAmount = parseInputAmount
            .sub(gasEstimate)
            .sub(42000);

          return setActualMaxValue(
            ethers.utils.formatUnits(subtractedMaxAmount.toString())
          );
        }
        const gasEstimate =
          await BondDepositoryProxy_CONTRACT.estimateGas.ETHDeposit(
            marketId,
            convertToWei(inputAmount),
            minimumTosPrice,
            { value: convertToWei(inputAmount) }
          );

        const subtractedMaxAmount = parseInputAmount
          .sub(gasEstimate)
          .sub(42000);

        return setActualMaxValue(
          ethers.utils.formatUnits(subtractedMaxAmount.toString())
        );
      }
    }
    fetchActualMaxValue().catch((e) => {
      console.log("**fetchActualMaxValue err**");
      console.log(e);
    });
  }, [
    BondDepositoryProxy_CONTRACT,
    inputValue,
    minimumTosPrice,
    fiveDaysLockup,
    marketId,
    maxValue,
  ]);

  const setMaxValue = useCallback(() => {
    setValue({
      ...inputValue,
      bond_modal_balance: actualMaxValue,
    });
  }, [inputValue, actualMaxValue, setValue]);

  useEffect(() => {
    if (actualMaxValue) {
      setValue({
        ...inputValue,
        bond_modal_balance: actualMaxValue,
      });
    }
  }, [actualMaxValue]);

  console.log(inputBalanceisEmpty);

  return (
    <Flex flexDir={"column"} px={"70px"} rowGap={"10px"}>
      <Flex fontSize={12} fontWeight={"bold"}>
        <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          mr={"9px"}
        >
          Bond Discount
        </Text>
        <Text color={isMinusDiscount ? "red.100" : "blue.200"} fontWeight={600}>
          {bondDiscount}%
        </Text>
      </Flex>
      <Flex
        borderWidth={"1px"}
        borderColor={
          maxValue !== undefined &&
          (zeroInputBalance || inputOver || inputBalanceisEmpty)
            ? "#e23738"
            : colorMode === "dark"
            ? "#313442"
            : "#e8edf2"
        }
        w={"460px"}
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
            pageKey={"Bond_screen"}
            recoilKey={"bond_modal"}
            atomKey={"bond_modal_balance"}
            isError={
              actualMaxValue !== undefined &&
              (zeroInputBalance || inputOver || inputBalanceisEmpty)
            }
            errorMsg={
              inputBalanceisEmpty
                ? undefined
                : inputOver
                ? errMsg.bond.bondableAmountIsOver
                : zeroInputBalance
                ? errMsg.bond.inputIsZero
                : errMsg.bond.balanceIsOver
            }
            fontSize={18}
            inputContainerStyle={{
              borderRadius: 0,
              borderWidth: 0,
              margin: 0,
              fontWeight: 600,
              height: "25px",
            }}
            inputFieldStyle={{ padding: 0 }}
          ></BalanceInput>
          {tokenImage}
        </Flex>
        <Flex fontSize={12} columnGap={"9px"} alignItems={"center"}>
          <Text>
            Balance: {balacne} {name}
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
        </Flex>
      </Flex>
    </Flex>
  );
}
