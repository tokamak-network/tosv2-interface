import { defaultValue, inputState } from "atom/global/input";
import { modalData, modalState } from "atom/global/modal";
import React, { SetStateAction } from "react";
import { useRecoilState } from "recoil";

function useModal(
  modalType?: string,
  modalDataObj?: {} | [],
  setInitialValue?: React.Dispatch<SetStateAction<any>>
) {
  const [selectedModal, setSelectedModal] = useRecoilState(modalState);
  const [selectedModalData, setSelectedModalData] = useRecoilState(modalData);
  const [value, setValue] = useRecoilState(inputState);

  const openModal = () => {
    if (modalType) {
      setSelectedModal(modalType);
    }
    if (modalDataObj) {
      setSelectedModalData(modalDataObj);
    }
  };

  const closeModal = () => {
    setSelectedModal("");
    setSelectedModalData({});
    setValue(defaultValue);
  };

  return { openModal, closeModal, selectedModal, selectedModalData };
}

export default useModal;
