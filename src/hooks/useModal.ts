import { modalData, modalState } from "atom/global/modal";
import { useRecoilState } from "recoil";

function useModal<T extends U>(modalType?: string, modalDataObj?: {}) {
  const [selectedModal, setSelectedModal] = useRecoilState(modalState);
  const [selectedModalData, setSelectedModalData] = useRecoilState(modalData);

  const openModal = () => {
    if (modalType) {
      setSelectedModal(modalType);
    }
    if (modalDataObj) {
      console.log(modalDataObj);
      setSelectedModalData(modalDataObj);
    }
  };

  const closeModal = () => {
    setSelectedModal("");
    setSelectedModalData({});
  };

  return { openModal, closeModal, selectedModal, selectedModalData };
}

export default useModal;
