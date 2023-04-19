import commafy from "@/utils/commafy";
import { Flex } from "@chakra-ui/react";
import { modalBottomLoadingState, stosLoadingState } from "atom/global/modal";
import useModalContract from "hooks/contract/useModalContract";
import useStakeModaldata from "hooks/stake/useStakeModalData";
import useStosStake from "hooks/stake/useStosStake";
import useUpdateModalData from "hooks/stake/useUpdateModalData";
import useInput from "hooks/useInput";
import useMediaView from "hooks/useMediaView";
import IBottomContent from "pages/components/common/modal/IBottomContent";
import { useRecoilState, useRecoilValue } from "recoil";
import { IBottomContentProps } from "types/common/modal";

function StakeModal_BottomContent(props: { fiveDaysLockup: boolean }) {
  const { fiveDaysLockup } = props;
  const { bp700px } = useMediaView();

  const { inputValue, setResetValue, setValue } = useInput(
    "Stake_screen",
    "stake_modal"
  );
  const modalContractData = useModalContract();
  const [bottomLoading, setBottomLoading] = useRecoilState(
    modalBottomLoadingState
  );
  const stosLoading = useRecoilValue(stosLoadingState);
  const { newBalanceStos } = useStosStake(
    "Stake_screen",
    "stake_modal",
    "stake_modal_balance",
    "stake_modal_period"
  );

  const {
    ltos,
    currentBalance,
    newBalance,
    currentTosValue,
    newBalanceTosValue,
    newEndTime,
  } = useStakeModaldata();

  console.log("inputValue.stake_modal_balance");
  console.log(inputValue.stake_modal_balance);
  console.log(typeof inputValue.stake_modal_balance);

  const contentList: IBottomContentProps[] = fiveDaysLockup
    ? [
        {
          title: "You Give",
          content: `${commafy(inputValue.stake_modal_balance)} TOS`,
        },
        {
          title: "You Will Get",
          content: `${ltos} LTOS`,
          tooltip:
            "You get LTOS based on what you give and sTOS is also based on the lock-up period.",
          secondTooltip: `${
            inputValue.stake_modal_balance ?? "-"
          } TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
        },
        {
          title: "Current Balance",
          content: `${currentBalance ?? "-"} LTOS`,
          tooltip: "Current LTOS balance without Lock-Up period",
          secondTooltip: `${
            currentTosValue ?? "-"
          } TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
        },
        {
          title: "New Balance",
          content: `${newBalance || "-"} LTOS`,
          tooltip: "New LTOS balance without Lock-Up period after staking. ",
          secondTooltip: `${
            newBalanceTosValue ?? "-"
          } TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
        },
      ]
    : [
        {
          title: "You Give",
          content: `${inputValue.stake_modal_balance || "-"} TOS`,
        },
        {
          title: "You Will Get",
          content: `${ltos} LTOS`,
          secondContent: `${commafy(newBalanceStos) ?? "-"} sTOS`,
          tooltip:
            "You get LTOS based on what you give and sTOS is also based on the lock-up period.",
          secondTooltip: `${commafy(
            inputValue.stake_modal_balance
          )} TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
          thirdTooltip:
            "sTOS’s lock-up period is calculated relative to Thursday 00:00 (UTC+0).",
        },
        {
          title: "End Time",
          content: `${
            inputValue.stake_modal_period === undefined ||
            inputValue.stake_modal_period === ""
              ? "-"
              : newEndTime || "-"
          }`,
          tooltip: "LTOS can be unstaked after this time. ",
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

export default StakeModal_BottomContent;
