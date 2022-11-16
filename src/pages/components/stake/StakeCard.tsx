import { Flex, Text, useMediaQuery, useColorMode } from "@chakra-ui/react";
import BasicButton from "common/button/BasicButton";
import CustomCheckBox from "common/input/CustomCheckBox";
import TokenSymbol from "common/token/TokenSymol";
import useModal from "hooks/useModal";
import { useState } from "react";
import { BondCardProps } from "types/bond";
import { StakeCardProps } from "types/stake";
import BondIcon from "assets/icons/bond.svg";
import Image from "next/image";
import { selectedTxState } from "atom/global/tx";
import { useRecoilValue } from "recoil";

function ContentComponent(props: {
  title: string;
  content: string;
  style?: any;
}) {
  const { title, content, style } = props;
  const { colorMode } = useColorMode();

  return (
    <Flex justifyContent={"space-between"} fontSize={14} h={"20px"} {...style}>
      <Text color={colorMode === "dark" ? "gray.100" : "gray.1000"}>
        {title}
      </Text>
      {content.includes("/") ? (
        <Flex>
          <Text
            color={colorMode === "dark" ? "white.200" : "gray.800"}
            fontWeight={600}
          >
            {content.split("/")[0]}
          </Text>
          <Text color={"#64646f"} mx={"3px"} fontWeight={600}>
            /
          </Text>
          <Text
            color={colorMode === "dark" ? "white.200" : "gray.800"}
            fontWeight={600}
          >
            {content.split("/")[1]}
          </Text>
        </Flex>
      ) : (
        <Text
          color={colorMode === "dark" ? "white.200" : "gray.800"}
          fontWeight={600}
        >
          {content}
        </Text>
      )}
    </Flex>
  );
}

function StakeCard(props: { cardData: StakeCardProps }) {
  const { cardData } = props;
  const { openModal: openUnstakeModal } = useModal(
    "stake_unstake_modal",
    cardData && cardData.stakedType === "LTOS Staking"
      ? { hasInput: true, stakedId: cardData.stakedId }
      : { hasInput: false, stakedId: cardData?.stakedId }
  );
  const { openModal } = useModal("stake_stake_modal", cardData);
  const { openModal: openUpdateModal } = useModal("stake_update_modal", {
    stakeId: cardData?.stakedId,
    ltosAmount: cardData?.staked.ltos.replaceAll("LTOS", ""),
    principal: cardData?.principal.replaceAll("TOS", "").replaceAll(" ", ""),
  });
  const { openModal: openUpdateAfterEndTimeModal } = useModal(
    "stake_updateAfterEndTime_modal",
    {
      stakeId: cardData?.stakedId,
      ltosAmount: cardData?.staked.ltos.replaceAll("LTOS", ""),
    }
  );
  const [smallerThan1040] = useMediaQuery("(max-width: 1040px)");
  const [smallerThan1440] = useMediaQuery("(max-width: 1440px)");
  const { colorMode } = useColorMode();
  const txPending = useRecoilValue(selectedTxState);

  if (!cardData) {
    return null;
  }

  const { isOver, stakedType, tokenType } = cardData;
  const isDisabled =
    stakedType === "LTOS Staking" ? cardData.staked.ltos === "0.00" : isOver;
  const unstakeDisabled =
    stakedType === "LTOS Staking"
      ? Number(cardData.staked.ltos.replaceAll("LTOS", "")) === 0
      : !isDisabled;

  const buttonName =
    stakedType === "LTOS Staking" ? "Stake" : isOver ? "Relock" : "Manage";

  return (
    <Flex
      flexDir={"column"}
      w={smallerThan1040 ? "100%" : "31.9%"}
      h={smallerThan1040 ? "" : "273px"}
      minW={["336px", "310px", "362px"]}
      bg={colorMode === "light" ? "white.100" : "#1f2128"}
      borderWidth={1}
      borderColor={colorMode === "dark" ? "gray.300" : "gray.900"}
      borderRadius={10}
      pt={"18px"}
      px={"20px"}
      pb={"21px"}
    >
      <Flex mb={"18px"} justifyContent={"space-between"}>
        <Flex>
          <TokenSymbol tokenType={tokenType}></TokenSymbol>
          <Text
            fontSize={20}
            fontWeight={600}
            textAlign={"center"}
            lineHeight={"46px"}
            color={colorMode === "dark" ? "white.200" : "gray.800"}
            ml={"12px"}
          >
            {stakedType === "LTOS Staking"
              ? "Staked"
              : stakedType === "Bond"
              ? `${tokenType} Bond`
              : "Locked"}
          </Text>
        </Flex>
        <Flex>
          {stakedType === "Bond" && (
            <Image src={BondIcon} alt={"BondIcon"}></Image>
          )}
          <Flex
            fontSize={12}
            color={
              stakedType === "LTOS Staking"
                ? "green.100"
                : isDisabled
                ? "blue.200"
                : "red.100"
            }
            textAlign={"center"}
            alignItems="center"
            justifyContent={"center"}
            ml={"9px"}
          >
            <Text>
              {stakedType === "LTOS Staking"
                ? "No Lock-up"
                : isDisabled
                ? "Unlocked"
                : "Locked"}
            </Text>
          </Flex>
        </Flex>
      </Flex>

      <ContentComponent
        title="Staked"
        content={
          // stakedType === "LTOS Staking"
          //   ? `${cardData.staked.ltos}`
          //   :
          `${cardData.staked.ltos} / ${cardData.staked.stos}`
        }
        style={{ marginBottom: "9px" }}
      ></ContentComponent>
      <ContentComponent
        title="Principal"
        content={`${cardData.principal}`}
        style={{ marginBottom: "9px" }}
      ></ContentComponent>
      {stakedType !== "LTOS Staking" && (
        <ContentComponent
          title="End Time"
          content={cardData.endTime}
        ></ContentComponent>
      )}
      <Flex
        alignItems="center"
        justifyContent={smallerThan1440 ? "flex-end" : "center"}
        flexDir={"column"}
        mt={"auto"}
      >
        {isDisabled && (
          <Flex w={"100%"} justifyContent={"center"} mb={"21px"}>
            {/* <CustomCheckBox
              valueKey={""}
              pageKey={"Stake_screen"}
              params={cardData}
              belongToSelectAll={true}
            ></CustomCheckBox>
            <Text
              ml={"9px"}
              fontSize={12}
              color={colorMode === "dark" ? "white.200" : "gray.800"}
            >
              Unstake Select
            </Text> */}
          </Flex>
        )}
        <Flex justifyContent={"space-between"} w={"100%"}>
          <BasicButton
            name={buttonName}
            h={"33px"}
            onClick={
              stakedType === "LTOS Staking"
                ? openModal
                : isOver
                ? openUpdateAfterEndTimeModal
                : openUpdateModal
            }
            isDisabled={cardData.isWithoutLockup && !isOver}
            isLoading={txPending}
            style={smallerThan1040 ? { width: "100%" } : {}}
            tooltip={
              "You can increase sTOS by using “Manage” function. This costs less gas than using the “Stake” function."
            }
          ></BasicButton>
          <BasicButton
            isDisabled={unstakeDisabled || txPending}
            isLoading={txPending}
            name={"Unstake"}
            h={"33px"}
            onClick={openUnstakeModal}
            style={smallerThan1040 ? { width: "100%" } : {}}
          ></BasicButton>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default StakeCard;
