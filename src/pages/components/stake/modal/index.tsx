import StakeModal from "@/stakeComponents/StakeModal";
import UnstakeModal from "@/stakeComponents/UnstakeModal";
import ManageModal from "@/stakeComponents/ManageModal";
import MultiUnstakeModal from "@/stakeComponents/MultiUnstakeModal";
import RelockModal from "@/stakeComponents/RelockModal";

export default function StakePageModals() {
  return (
    <>
      <StakeModal></StakeModal>
      <UnstakeModal></UnstakeModal>
      <ManageModal></ManageModal>
      <RelockModal></RelockModal>
      <MultiUnstakeModal></MultiUnstakeModal>
    </>
  );
}
