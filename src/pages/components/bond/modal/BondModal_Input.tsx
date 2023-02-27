import { Button, Flex, Text } from "@chakra-ui/react";
import { BalanceInput } from "common/input/TextInput";
import TokenSymbol from "common/token/TokenSymol";
import constant from "constant";
import useBondModal from "hooks/bond/useBondModal";
import useBondModalCondition from "hooks/bond/useBondModalCondition";
import { useEffect, useMemo } from "react";
import { TokenTypes } from "types";

let bondTokenType = "ETH";

function TokenImageContrainer(props: { tokenTypes: TokenTypes; name: string }) {
  return (
    <Flex columnGap={"9px"} alignItems={"center"}>
      <TokenSymbol
        tokenType={props.tokenTypes}
        w={"24px"}
        h={"24px"}
        imageW={"8.4px"}
        imageH={"14.4px"}
      ></TokenSymbol>
      <Text>{props.name}</Text>
    </Flex>
  );
}

export default function BondModal_Input() {
  //need to put types
  const { bondModalData } = useBondModal();
  const maxValue: number | undefined = useMemo(() => {
    return undefined;
  }, []);
  const { inputOver, inputPeriodOver, btnDisabled, zeroInputBalance } =
    useBondModalCondition(maxValue);
  const { errMsg } = constant;

  // useEffect(() => {
  //   if (bondModalData && userETHBalance) {
  //     const mValue =
  //       bondModalData &&
  //       Number(bondModalData?.maxBond) > Number(userETHBalance)
  //         ? Number(userETHBalance.replaceAll(",", ""))
  //         : Number(bondModalData?.maxBond.replaceAll(",", ""));

  //     if (Number(bondModalData?.maxBond) === 0) {
  //       return setMaxValue(Number(userETHBalance.replaceAll(",", "")));
  //     }
  //     setMaxValue(mValue);
  //   }
  // }, [bondModalData, userETHBalance]);

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
  }, [bondTokenType]);

  return (
    <Flex flexDir={"column"} px={"70px"} rowGap={"10px"}>
      <Flex fontSize={12} fontWeight={"bold"}>
        <Text color={"white.200"} mr={"9px"}>
          Bond Discount
        </Text>
        <Text color={"blue.200"}>33.0%</Text>
      </Flex>
      <Flex
        border={"1px solid #313442"}
        w={"460px"}
        h={"78px"}
        bgColor={"#1f2128"}
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
            isError={bondModalData && (zeroInputBalance || inputOver)}
            errorMsg={
              zeroInputBalance
                ? errMsg.bondZeroInput
                : "Input has exceeded maximum bondable amount per 1 transaction"
            }
            fontSize={18}
            inputContainerStyle={{
              borderRadius: 0,
              borderWidth: 0,
              margin: 0,
              height: "25px",
            }}
            inputFieldStyle={{ padding: 0 }}
          ></BalanceInput>
          {tokenImage}
        </Flex>
        <Flex fontSize={12} columnGap={"9px"} alignItems={"center"}>
          <Text>Balance: 0.00 ETH</Text>
          <Button
            w={"48px"}
            h={"20px"}
            border={"1px solid #535353"}
            bgColor={"transparent"}
            fontSize={11}
            color={"#5a5a5a"}
          >
            MAX
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
