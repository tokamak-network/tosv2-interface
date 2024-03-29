import commafy from "@/utils/commafy";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { modalBottomLoadingState, stosLoadingState } from "atom/global/modal";
import useModalContract from "hooks/contract/useModalContract";
import useStosRelock from "hooks/stake/useStosRelock";
import useUpdateModalAfterEndTime from "hooks/stake/useUpdateModalAfterEndTime";
import useUpdateModalData from "hooks/stake/useUpdateModalData";
import useInput from "hooks/useInput";
import useMediaView from "hooks/useMediaView";
import useModal from "hooks/useModal";
import IBottomContent from "pages/components/common/modal/IBottomContent";
import { useRecoilState, useRecoilValue } from "recoil";
import { IBottomContentProps } from "types/common/modal";

function RelockModal_BottomContent(props: { addTos: boolean }) {
  const { addTos } = props;
  const { bp700px } = useMediaView();

  const { inputValue, setResetValue, setValue } = useInput(
    "Stake_screen",
    "relock_modal"
  );

  const {
    newEndTime,
    tosValue,
    tosBalance,
    allLtosBalance,
    allLtosToTosBalance,
  } = useUpdateModalAfterEndTime(addTos);
  const { newBalanceStos } = useStosRelock(addTos);

  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );
  const stosLoading = useRecoilValue(stosLoadingState);

  const contentList: IBottomContentProps[] = [
    {
      title: "You Give",
      content: `${
        commafy(inputValue.stake_relockModal_ltos_balance) ?? "-"
      } LTOS`,
      secondContent: addTos
        ? `${inputValue.stake_relockModal_tos_balance} TOS`
        : undefined,
      tooltip: "Amount of LTOS and TOS used for staking.",
      secondTooltip: `Currently worth ${
        tosValue || "-"
      } TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
    },
    {
      title: "You Will Get",
      content: `${
        addTos
          ? allLtosBalance
          : commafy(inputValue.stake_relockModal_ltos_balance)
      } LTOS`,
      secondContent: `${commafy(newBalanceStos)} sTOS`,
      thirdContent: addTos ? undefined : `${tosBalance} TOS`,
      tooltip: "Amount of LTOS, sTOS, and TOS you will get after the update. ",
      secondTooltip: `Currently worth ${tosValue} TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
      thirdTooltip:
        "sTOS’s lock-up period is calculated relative to Thursday 00:00 (UTC+0).",
      fourthTooltip: addTos
        ? undefined
        : "Any LTOS that does not get relocked is returned to you in TOS.",
    },
    {
      title: "New End Time",
      content: newEndTime,
      tooltip: "LTOS can be unstaked after this time.",
    },
  ];

  return (
    <Flex
      flexDir={"column"}
      columnGap={"9px"}
      mb={"30px"}
      px={bp700px ? "20px" : "50px"}
    >
      {contentList.map((content) => (
        <IBottomContent {...content} key={content.title}></IBottomContent>
      ))}
    </Flex>
  );
}

export default RelockModal_BottomContent;
