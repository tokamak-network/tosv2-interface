import { Flex } from "@chakra-ui/react";
import useBondModal from "hooks/bond/useBondModal";
import useLtosIndex from "hooks/gql/useLtosIndex";
import ITopContent from "pages/components/common/modal/ITopContent";
import { ITopContentProps } from "types/common/modal";

function BondModal_TopContent() {
  const { ltosIndex } = useLtosIndex();
  const { bondModalData } = useBondModal();

  const topContentList: ITopContentProps[] = [
    {
      title: "Discount",
      content: "",
      tooltip: "Discount for bonding.",
    },
    {
      title: "Max Bond",
      content: bondModalData?.maxBond || "-",
      tooltip:
        "The maximum bondable amount based on the current bond market capacity.",
      symbol: "ETH",
    },
    {
      title: "LTOS Index",
      content: ltosIndex,
      tooltip:
        "Number of TOS you get when you unstake 1 LTOS. LTOS index increases every 8 hours.",
      symbol: "TOS",
    },
  ];

  return (
    <Flex mb={"9px"} w={"100%"} justifyContent="center">
      <ITopContent contentList={topContentList}></ITopContent>
    </Flex>
  );
}

export default BondModal_TopContent;
