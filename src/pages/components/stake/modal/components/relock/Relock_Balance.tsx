import { Container, Flex, Grid, Text, useColorMode } from "@chakra-ui/react";
import { StakeRelockModalInput } from "atom/stake/input";
import CustomCheckBox from "common/input/CustomCheckBox";
import BasicTooltip from "common/tooltip";
import useRelockModalCondition from "hooks/stake/useRelockModalCondition";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import useUserBalance from "hooks/useUserBalance";
import StakeModal_Input from "../StakeModal_Input";

export default function Relock_Balance() {
  const { colorMode } = useColorMode();
  const { inputValue, setValue } = useInput<StakeRelockModalInput>(
    "Stake_screen",
    "relock_modal"
  );

  const addTos = inputValue?.stake_relockModal_addTos;
  const setAddTos = () => {
    setValue && setValue({ ...inputValue, stake_relockModal_addTos: !addTos });
  };

  const { userTokenBalance } = useUserBalance();

  const { selectedModalData, selectedModal, modalSectionMtValue } = useModal<{
    stakeId: string;
    ltosAmount: string;
    ltosWei: string;
  }>();
  const ltosCommified = selectedModalData?.ltosAmount;
  const ltosWei = selectedModalData?.ltosWei;

  const {
    inputOver,
    zeroInputBalance,
    inputLtosBalanceIsEmpty,
    inputTosBalanceIsEmpty,
  } = useRelockModalCondition(Number(ltosWei));

  return (
    <Grid w={"100%"} p={0} gridRowGap={"6px"}>
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDir={"column"}
        rowGap={"9px"}
      >
        <Flex w={"100%"} justifyContent={"space-between"}>
          <Text
            fontSize={12}
            color={colorMode === "light" ? "gray.800" : "white.200"}
          >
            Relock LTOS
          </Text>
          <Flex alignItems={"center"}>
            <CustomCheckBox
              state={addTos}
              setState={setAddTos}
            ></CustomCheckBox>
            <Text
              ml={"14px"}
              fontSize={12}
              mr="6px"
              color={colorMode === "dark" ? "#8b8b93" : "gray.1000"}
            >
              Lock additional TOS
            </Text>
            <BasicTooltip
              label={
                "If you want more sTOS, you can lock TOS in addition to restaking your LTOS. "
              }
            />
          </Flex>
        </Flex>
        <Flex w={"100%"}>
          <StakeModal_Input
            atomKey={"stake_relockModal_ltos_balance"}
            pageKey={"Stake_screen"}
            recoilKey={"relock_modal"}
            defaultValue={undefined}
            inputTokenType="LTOS"
            err={{
              inputBalanceIsEmpty: addTos ? false : inputLtosBalanceIsEmpty,
              inputOver: addTos ? false : inputOver,
              zeroInputBalance: addTos ? false : zeroInputBalance,
            }}
            maxValue={ltosWei}
            tokenBalance={ltosCommified}
            buyMoreButton={!addTos}
          ></StakeModal_Input>
        </Flex>
      </Flex>
      {addTos && (
        <Flex mb={"12px"} flexDir={"column"}>
          <Flex mb={"9px"}>
            <StakeModal_Input
              pageKey={"Stake_screen"}
              recoilKey={"relock_modal"}
              atomKey={"stake_relockModal_tos_balance"}
              defaultValue={undefined}
              inputTokenType="TOS"
              err={{
                inputBalanceIsEmpty: addTos ? inputTosBalanceIsEmpty : false,
                inputOver: false,
                zeroInputBalance: false,
              }}
              maxValue={userTokenBalance?.TOS?.balanceWei}
              tokenBalance={userTokenBalance?.TOS?.balanceCommified}
            ></StakeModal_Input>
          </Flex>
        </Flex>
      )}
    </Grid>
  );
}
