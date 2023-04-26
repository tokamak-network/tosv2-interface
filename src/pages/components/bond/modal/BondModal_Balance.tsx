import { convertToWei } from "@/utils/number";
import { Button, Flex, Text } from "@chakra-ui/react";
import { bond_modal } from "atom/bond/modal";
import { BalanceInput } from "common/input/TextInput";
import constant from "constant";
import { BigNumber, ethers } from "ethers";
import useBondModal from "hooks/bond/useBondModal";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import useCallContract from "hooks/useCallContract";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { SupportedBondToken } from "types/bond/index";
import { BondCardProps } from "types/bond";
import { useWeb3React } from "@web3-react/core";
import useMediaView from "hooks/useMediaView";
import TokenImageContrainer from "pages/components/common/modal/TokenImageContrainer";
import commafy from "@/utils/commafy";
import { useCustomColorMode } from "hooks/style/useCustomColorMode";

const bondToken: SupportedBondToken = "ETH";

export default function BondModal_Balance() {
  const { errMsg } = constant;
  const { modalCondition, userTokenBalance } = useBondModal();
  const { zeroInputBalance, inputOver, inputBalanceisEmpty } = modalCondition;
  const { isDark } = useCustomColorMode();
  const { maxValue, balance, balanceNum, name } = userTokenBalance;
  const { inputValue, setValue } = useInput("Bond_screen", "bond_modal");
  const { bondDiscount, isMinusDiscount, minimumTosPrice, roi, isMinusROI } =
    useBondModalInputData();
  const [actualMaxValue, setActualMaxValue] = useState<string | undefined>(
    undefined
  );
  const inputAmount = inputValue?.bond_modal_balance;
  const inputWeeks = inputValue?.bond_modal_period;

  const { BondDepositoryProxy_CONTRACT, BondDepository_CONTRACT } =
    useCallContract();
  const bondModalRecoilValue = useRecoilValue(bond_modal);
  const { fiveDaysLockup } = bondModalRecoilValue;
  const { account } = useWeb3React();
  const { bp500px, bp700px } = useMediaView();

  const { selectedModalData } = useModal<BondCardProps>();
  const marketId = selectedModalData?.index;

  const maxBtnDisabled =
    actualMaxValue === undefined ||
    inputWeeks === undefined ||
    inputWeeks === "" ||
    Number(inputAmount) === Number(actualMaxValue);

  const tokenImage = useMemo(() => {
    switch (bondToken) {
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
      if (
        BondDepositoryProxy_CONTRACT &&
        userTokenBalance &&
        minimumTosPrice &&
        maxValue
      ) {
        const userEthBalanceWei = userTokenBalance.balanceNum;
        const parseInputAmount = ethers.utils.parseUnits(
          String(userEthBalanceWei).replaceAll(",", ""),
          18
        );
        const periodWeeks = inputValue.bond_modal_period + 1;
        const inputToEstimate = convertToWei(String(maxValue));

        const feeData =
          await BondDepositoryProxy_CONTRACT.provider.getFeeData();
        const { maxFeePerGas } = feeData;

        //with lockup period
        if (!fiveDaysLockup && inputValue.bond_modal_period) {
          console.log("params");
          console.log(marketId, inputToEstimate, minimumTosPrice, periodWeeks, {
            value: inputToEstimate,
          });

          const gasEstimate =
            await BondDepositoryProxy_CONTRACT.estimateGas.ETHDepositWithSTOS(
              marketId,
              inputToEstimate,
              minimumTosPrice,
              periodWeeks,
              { value: inputToEstimate }
            );

          if (maxFeePerGas) {
            const gasPriceForContract = gasEstimate.mul(maxFeePerGas);
            const bufferPrice = BigNumber.from(maxFeePerGas).mul(42000);
            const gasPrice = gasEstimate.add(42000).mul(maxFeePerGas);
            console.log("parseInputAmount");
            console.log(parseInputAmount);
            console.log("gasPrice");
            console.log(gasPrice);

            const subtractedMaxAmount = parseInputAmount.sub(gasPrice);

            console.log("maxFeePerGas(wei) : ", maxFeePerGas.toString());
            console.log("gasEstimate : ", gasEstimate.toString());
            console.log("bufferGasFee : ", bufferPrice.toString());

            const result =
              Number(subtractedMaxAmount.toString()) > maxValue
                ? maxValue
                : subtractedMaxAmount;

            return setActualMaxValue(result.toString());
          }
        }

        //5 days lockup
        if (maxFeePerGas) {
          const gasEstimate =
            await BondDepositoryProxy_CONTRACT.estimateGas.ETHDeposit(
              marketId,
              inputToEstimate,
              minimumTosPrice,
              { value: inputToEstimate }
            );

          const gasPriceForContract = gasEstimate.mul(maxFeePerGas);
          const bufferPrice = BigNumber.from(maxFeePerGas).mul(42000);
          const gasPrice = gasEstimate.add(42000).mul(maxFeePerGas);
          const subtractedMaxAmount = parseInputAmount.sub(gasPrice);

          const result =
            Number(subtractedMaxAmount.toString()) > maxValue
              ? maxValue
              : subtractedMaxAmount;

          return setActualMaxValue(ethers.utils.formatUnits(result.toString()));
        }
      }
    }
    fetchActualMaxValue().catch((e) => {
      console.log("**fetchActualMaxValue err**");
      console.log(e);
    });
  }, [
    BondDepositoryProxy_CONTRACT,
    minimumTosPrice,
    fiveDaysLockup,
    marketId,
    maxValue,
  ]);

  useEffect(() => {
    if (actualMaxValue) {
      setValue({
        ...inputValue,
        bond_modal_actualMaxValue: Number(actualMaxValue),
      });
    }
  }, [actualMaxValue]);

  const setMaxValue = useCallback(() => {
    setValue({
      ...inputValue,
      bond_modal_balance: actualMaxValue,
    });
  }, [inputValue, actualMaxValue, setValue]);

  return (
    <Flex flexDir={"column"} px={bp700px ? "0px" : "70px"} rowGap={"10px"}>
      <Flex>
        <Text
          fontSize={12}
          color={isDark ? "white.100" : "black.300"}
          fontWeight={600}
        >
          Bond Amount
        </Text>
      </Flex>
      <Flex
        borderWidth={"1px"}
        borderColor={
          maxValue !== undefined &&
          (zeroInputBalance || inputOver || inputBalanceisEmpty)
            ? "#e23738"
            : isDark
            ? "#313442"
            : "#e8edf2"
        }
        w={bp700px ? "310px" : "460px"}
        h={bp700px ? "94px" : "78px"}
        bgColor={isDark ? "#1f2128" : "white.100"}
        px={"20px"}
        py={"14px"}
        borderRadius={"10px"}
        flexDir={"column"}
        rowGap={"9px"}
      >
        <Flex justifyContent={"space-between"} h={"25px"} alignItems={"center"}>
          {tokenImage}
          <Flex
            w={"100%"}
            ml={"20px"}
            justifyContent={"flex-end"}
            alignItems={"center"}
            columnGap={"9px"}
            h={"22px"}
          >
            <BalanceInput
              w={"100%"}
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
              // w={bp700px ? "190px" : "270px"}
              inputContainerStyle={{
                borderRadius: 0,
                borderWidth: 0,
                margin: 0,
                fontWeight: 600,
                height: "25px",
                w: "100%",
              }}
              inputFieldStyle={{
                padding: 0,
                textAlign: "right",
                width: "100%",
              }}
              style={{ maxHeight: "27px" }}
            ></BalanceInput>
            <Button
              w={"48px"}
              h={"20px"}
              border={
                maxBtnDisabled
                  ? "1px solid #535353"
                  : isDark
                  ? "1px solid #535353"
                  : "1px solid #e8edf2"
              }
              bgColor={"transparent"}
              fontSize={11}
              color={maxBtnDisabled ? "#5a5a5a" : "blue.200"}
              _hover={{
                backgroundColor: maxBtnDisabled ? "" : "#257eee",
                color: maxBtnDisabled ? "" : "#ffffff",
              }}
              isDisabled={maxBtnDisabled}
              onClick={() => setMaxValue()}
            >
              MAX
            </Button>
          </Flex>
        </Flex>
        {bp700px ? (
          <Flex
            w={"100%"}
            fontSize={12}
            justifyContent={"center"}
            alignItems={"flex-end"}
            flexDir={"column"}
          >
            <Text>
              Balance: {balance} {name}
            </Text>
            <Text> Bond Capacity : {commafy(maxValue)} ETH</Text>
          </Flex>
        ) : (
          <Flex
            w={"100%"}
            fontSize={12}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Text>
              Balance: {balance} {name} / Bond Capacity: {commafy(maxValue)} ETH
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}
