import commafy from "@/utils/commafy";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import useInput from "hooks/useInput";
import useMediaView from "hooks/useMediaView";
import useModal from "hooks/useModal";
import IBottomContent from "pages/components/common/modal/IBottomContent";
import { useRecoilState, useRecoilValue } from "recoil";
import { BondCardProps } from "types/bond";
import { IBottomContentProps } from "types/common/modal";
import useBondModalInputData from "hooks/bond/useBondModalInputData";

function BondModal_BottomContent(props: {
  fiveDaysLockup: boolean;
  fiveDaysLockupEndTime: string;
}) {
  const { fiveDaysLockup, fiveDaysLockupEndTime } = props;
  const { bp700px } = useMediaView();

  const { inputValue, setResetValue, setValue } = useInput(
    "Bond_screen",
    "bond_modal"
  );
  const { selectedModalData, selectedModal, closeModal } =
    useModal<BondCardProps>();
  const marketId = selectedModalData?.index;

  const {
    youWillGet,
    endTime,
    stosReward,
    originalTosAmount,
    bondDiscount,
    isMinusDiscount,
  } = useBondModalInputData();

  const contentList: IBottomContentProps[] = [
    {
      title: "You Give",
      content: `${inputValue.bond_modal_balance || "-"} ETH`,
      tooltip: "",
    },
    {
      title: "You Will Get",
      content: `${youWillGet ?? "-"} LTOS`,
      secondContent: `${fiveDaysLockup ? "0" : stosReward} sTOS`,
      thirdContent: `(${bondDiscount}% discount)`,
      tooltip:
        "You get LTOS based on what you gi  ve and sTOS is also based on the lock-up period.",
      secondTooltip: `Currently worth ${originalTosAmount} TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
      // thirdTooltip:
      //   "sTOS’s lock-up period is calculated relative to Thursday 00:00 (UTC+0).",
      isPlus: true,
      noSign: true,
      style: { color: isMinusDiscount ? "red.100" : "blue.200" },
    },
    {
      title: "End Time",
      content: fiveDaysLockup ? fiveDaysLockupEndTime : endTime || "-",
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

export default BondModal_BottomContent;
