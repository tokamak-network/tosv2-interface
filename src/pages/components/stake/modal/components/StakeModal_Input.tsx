import { Button, Flex, Text, useColorMode } from "@chakra-ui/react";
import { BalanceInput } from "common/input/TextInput";
import constant from "constant";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import { useCallback } from "react";
import { PageKey, SupportedInputTokenTypes } from "types";
import useMediaView from "hooks/useMediaView";
import TokenImageContrainer from "pages/components/common/modal/TokenImageContrainer";
import { InputKey } from "types/atom";

type StakeModalInput = {
  defaultValue: string | number | undefined;
  maxValue: string | number | undefined;
  tokenBalance: string | undefined;
  inputTokenType: SupportedInputTokenTypes;
  pageKey: PageKey;
  recoilKey: InputKey;
  atomKey: string;
  err?: {
    zeroInputBalance?: boolean | undefined;
    inputOver?: boolean | undefined;
    inputBalanceIsEmpty?: boolean | undefined;
  };
  buyMoreButton?: boolean;
  isDisabled?: boolean;
  removeMaxButton?: boolean;
};

export default function StakeModal_Input(props: StakeModalInput) {
  const {
    maxValue,
    tokenBalance,
    inputTokenType,
    pageKey,
    recoilKey,
    atomKey,
    err,
    buyMoreButton,
    isDisabled,
    removeMaxButton,
  } = props;
  const zeroInputBalance = err?.zeroInputBalance;
  const inputOver = err?.inputOver;
  const inputBalanceIsEmpty = err?.inputBalanceIsEmpty;

  const { errMsg } = constant;
  const { inputValue, setValue } = useInput(pageKey, recoilKey);
  const { colorMode } = useColorMode();

  const { bp700px } = useMediaView();

  const { openModal: openSwapModal } = useModal("swap_interface_modal");

  const setMaxValue = useCallback(() => {
    if (maxValue) return setValue({ ...inputValue, [atomKey]: maxValue });
  }, [maxValue, atomKey, inputValue]);

  const maxBtnDisabled =
    inputValue &&
    atomKey &&
    String(inputValue[atomKey])?.replaceAll(",", "") ===
      String(maxValue)?.replaceAll(",", "");

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
        <Flex justifyContent={"space-between"} h={"25px"} alignItems={"center"}>
          <TokenImageContrainer
            tokenTypes={inputTokenType}
            name={inputTokenType}
          ></TokenImageContrainer>
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
              isDisabled={isDisabled}
            ></BalanceInput>
            {removeMaxButton !== true && (
              <Button
                w={"48px"}
                h={"20px"}
                border={
                  colorMode === "dark"
                    ? "1px solid #535353"
                    : "1px solid #e8edf2"
                }
                bgColor={"transparent"}
                fontSize={11}
                color={"blue.200"}
                _hover={{
                  backgroundColor: maxBtnDisabled ? "" : "#257eee",
                  color: maxBtnDisabled ? "" : "#ffffff",
                }}
                isDisabled={maxBtnDisabled}
                onClick={() => setMaxValue()}
              >
                MAX
              </Button>
            )}
          </Flex>
        </Flex>
        <Flex
          fontSize={12}
          columnGap={"9px"}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <Text>
            Balance: {tokenBalance} {inputTokenType}
          </Text>

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
