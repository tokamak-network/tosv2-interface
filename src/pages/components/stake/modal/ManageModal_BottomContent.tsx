import commafy from "@/utils/commafy";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { modalBottomLoadingState, stosLoadingState } from "atom/global/modal";
import useModalContract from "hooks/contract/useModalContract";
import useStos from "hooks/stake/useStos";
import useUpdateModalData from "hooks/stake/useUpdateModalData";
import useInput from "hooks/useInput";
import IBottomContent from "pages/components/common/modal/IBottomContent";
import { useRecoilState, useRecoilValue } from "recoil";
import { IBottomContentProps } from "types/common/modal";

function ManageModal_BottomContent() {
  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const { inputValue, setResetValue, setValue } = useInput(
    "Stake_screen",
    "update_modal"
  );

  const {
    currentEndTime,
    newEndTime,
    leftWeeks,
    leftDays,
    leftTime,
    newLtosBalance,
    totalTosAmount,
  } = useUpdateModalData();
  const {} = useStos();
  const modalContractData = useModalContract();
  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );
  const stosLoading = useRecoilValue(stosLoadingState);
  const { newBalanceStos } = useStos();

  const contentList: IBottomContentProps[] = [
    {
      title: "You Give",
      content: `${inputValue.stake_updateModal_tos_balance || "0"} TOS`,
    },
    {
      title: "Current Balance",
      content: `${modalContractData?.ltosBalance || "-"} LTOS`,
      secondContent: `${modalContractData?.stosBalance || "-"} sTOS`,
      tooltip: "Amount of LTOS and sTOS before the update.",
      secondTooltip: `Currently worth ${
        modalContractData?.currentTosAmount || "-"
      } TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
      thirdTooltip:
        "sTOS’s lock-up period is calculated relative to Thursday 0:00 (UTC+0).",
    },
    {
      title: "New Balance",
      content: bottomLoading ? "......" : `${newLtosBalance} LTOS`,

      secondContent: `${commafy(newBalanceStos)} sTOS`,
      // stosLoading
      // ? "......"
      // : `${newBalanceStos ? commafy(newBalanceStos) : "-"} sTOS`,
      tooltip: "Amount of LTOS and sTOS after the update.",
      secondTooltip: `Currently worth ${totalTosAmount} TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
      thirdTooltip:
        "sTOS’s lock-up period is calculated relative to Thursday 00:00 (UTC+0).",
    },
    {
      title: "Current End Time",
      content: currentEndTime,
      tooltip: "Lock-Up period end time before the update before the update.",
    },
    {
      title: "New End Time",
      content: newEndTime,
      tooltip: "Lock-Up period end time after the update before the update.",
    },
  ];

  return (
    <Flex
      flexDir={"column"}
      columnGap={"9px"}
      mb={"30px"}
      px={smallerThan1024 ? "20px" : "50px"}
    >
      {contentList.map((content) => (
        <IBottomContent {...content} key={content.title}></IBottomContent>
      ))}
    </Flex>
  );
}

export default ManageModal_BottomContent;
