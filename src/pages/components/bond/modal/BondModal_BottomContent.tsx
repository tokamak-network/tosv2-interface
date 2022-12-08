import { Flex, useMediaQuery } from "@chakra-ui/react";
import { modalBottomLoadingState, stosLoadingState } from "atom/global/modal";
import useBondModalInputData from "hooks/bond/useBondModalInputData";
import useInput from "hooks/useInput";
import useModal from "hooks/useModal";
import IBottomContent from "pages/components/common/modal/IBottomContent";
import { useRecoilValue } from "recoil";
import { BondCardProps } from "types/bond";
import { IBottomContentProps } from "types/common/modal";

function BondModal_BottomContent(props: {
  fiveDaysLockup: boolean;
  fiveDaysLockupEndTime: string;
}) {
  const { fiveDaysLockup, fiveDaysLockupEndTime } = props;
  const { selectedModalData, selectedModal, closeModal } =
    useModal<BondCardProps>();

  const marketId = selectedModalData?.index as number;

  const [smallerThan1024] = useMediaQuery("(max-width: 1024px)");

  const { inputValue, setValue, setResetValue } = useInput(
    "Bond_screen",
    "bond_modal"
  );
  const bottomLoading = useRecoilValue(modalBottomLoadingState);
  const stosLoading = useRecoilValue(stosLoadingState);

  const { youWillGet, endTime, stosReward, originalTosAmount } =
    useBondModalInputData(marketId);

  const contentList: IBottomContentProps[] = [
    {
      title: "You Give",
      content: `${inputValue.bond_modal_balance || "-"} ETH`,
    },
    {
      title: "You Will Get",
      content:
        inputValue.bond_modal_balance === undefined
          ? "-"
          : bottomLoading
          ? "......"
          : youWillGet || "0",
      secondContent: fiveDaysLockup
        ? "0"
        : stosLoading
        ? "......"
        : stosReward || "0",
      tooltip:
        "You get LTOS based on what you give and sTOS is also based on the lock-up period.",
      secondTooltip: `Currently worth ${originalTosAmount} TOS. As LTOS index increases, the number of TOS you can get from unstaking LTOS will also increase.`,
      thirdTooltip:
        "sTOS’s lock-up period is calculated relative to Thursday 00:00 (UTC+0).",
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
      px={smallerThan1024 ? "20px" : "50px"}
    >
      {contentList.map((content) => (
        <IBottomContent {...content} key={content.title}></IBottomContent>
      ))}
    </Flex>
  );
}

export default BondModal_BottomContent;
