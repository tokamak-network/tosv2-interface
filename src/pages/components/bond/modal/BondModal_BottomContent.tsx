import commafy from "@/utils/commafy";
import { Flex } from "@chakra-ui/react";
import useInput from "hooks/useInput";
import useMediaView from "hooks/useMediaView";
import useModal from "hooks/useModal";
import IBottomContent from "pages/components/common/modal/IBottomContent";
import { BondCardProps } from "types/bond";
import { IBottomContentProps } from "types/common/modal";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import { useMemo } from "react";
import { getNowTimeStamp, getTimeLeft } from "@/utils/time";

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

  const inputWeeks = inputValue?.bond_modal_period;

  const contentList: IBottomContentProps[] = useMemo(() => {
    return [
      {
        title: "You Give",
        content: `${commafy(inputValue.bond_modal_balance) || "-"} ETH`,
        tooltip: "",
        hasTitleStar: true,
      },
      {
        title: "You Will Get",
        content: `${youWillGet ?? "-"} LTOS`,
        secondContent: `${fiveDaysLockup ? "0" : stosReward} sTOS`,
        thirdContent: `(${bondDiscount}% discount)`,
        tooltip:
          "You get LTOS based on what you give and sTOS is also based on the lock-up period.",
        secondTooltip: `Currently worth ${originalTosAmount} TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
        // thirdTooltip:
        //   "sTOS’s lock-up period is calculated relative to Thursday 00:00 (UTC+0).",
        isPlus: true,
        noSign: true,
        style: { color: isMinusDiscount ? "red.100" : "blue.200" },
        hasTitleStar: true,
      },
      {
        title: "End Time",
        content: fiveDaysLockup
          ? getTimeLeft(getNowTimeStamp(), 5, "YYYY. MM.DD. HH:mm")
          : inputWeeks === undefined || inputWeeks === ""
          ? "-"
          : endTime ?? "-",
        tooltip: "LTOS can be unstaked after this time. ",
      },
    ];
  }, [
    inputValue,
    fiveDaysLockup,
    stosReward,
    bondDiscount,
    endTime,
    isMinusDiscount,
    originalTosAmount,
    youWillGet,
    inputWeeks,
  ]);

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
