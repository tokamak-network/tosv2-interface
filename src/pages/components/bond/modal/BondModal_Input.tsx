import { Button, Flex, Text } from "@chakra-ui/react";
import { BalanceInput } from "common/input/TextInput";
import TokenSymbol from "common/token/TokenSymol";
import constant from "constant";
import useBondModal from "hooks/bond/useBondModal";
import useBondModalCondition from "hooks/bond/useBondModalCondition";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import useInput from "hooks/useInput";
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
  const { errMsg } = constant;
  const { modalCondition, userTokenBalance } = useBondModal();
  const { zeroInputBalance, inputOver } = modalCondition;
  const { maxValue, balacne, balanceNum, name } = userTokenBalance;
  const { inputValue, setValue } = useInput("Bond_screen", "bond_modal");
  const { bondDiscount, isMinusDiscount } = useBondModalInputData();

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

  return (
    <Flex flexDir={"column"} px={"70px"} rowGap={"10px"}>
      <Flex fontSize={12} fontWeight={"bold"}>
        <Text color={"white.200"} mr={"9px"}>
          Bond Discount
        </Text>
        <Text color={isMinusDiscount ? "red.100" : "blue.200"} fontWeight={600}>
          {bondDiscount}%
        </Text>
      </Flex>
      <Flex
        borderWidth={"1px"}
        borderColor={
          maxValue !== undefined && (zeroInputBalance || inputOver)
            ? "#e23738"
            : "#313442"
        }
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
            isError={maxValue !== undefined && (zeroInputBalance || inputOver)}
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
          <Text>
            Balance: {balacne} {name}
          </Text>
          <Button
            w={"48px"}
            h={"20px"}
            border={"1px solid #535353"}
            bgColor={"transparent"}
            fontSize={11}
            color={"blue.200"}
            onClick={() => {
              setValue({
                ...inputValue,
                bond_modal_balance: maxValue,
              });
            }}
          >
            MAX
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
