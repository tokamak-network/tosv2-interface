import { Flex, useToast } from "@chakra-ui/react";
import { selectedTxState, txInfo, txInfoState } from "atom/global/tx";
import { toastConfig } from "constants/toast";
import { useRecoilState } from "recoil";
import { Contract } from "@ethersproject/contracts";
import CustomToast from "common/toast/CustomToast";
import { ToastType } from "types/toast";
import idGenerator from "@/components/idGenerator";
import { PageKey } from "types";

type ToastPayload = {
  submittedMessage?: string;
  confirmedMessage?: string;
  errorMessage?: string;
  submittedLink?: PageKey;
  confirmedLink?: PageKey;
  errorLink?: PageKey;
};

function useCustomToast(props?: ToastPayload) {
  const toast = useToast();
  const [txPending, setTxPending] = useRecoilState(selectedTxState);
  const [txInfos, setTxInfos] = useRecoilState(txInfo);

  async function setTx(contract: Contract) {
    try {
      setTxPending(true);
      const receipt = contract;
      if (receipt) {
        // toast({
        //   status: "success",
        //   title: "Success",
        //   description: `Tx is successfully pending!`,
        //   variant: "solid",
        //   ...toastConfig,
        // });
        const id = idGenerator();
        setTxInfos({
          id,
          message: props?.submittedMessage ?? "Tx is successfully submmited!",
          type: "success",
          link: props?.submittedLink,
        });
        const wait = await receipt.wait();
        if (wait) {
          const id = idGenerator();
          setTxInfos({
            id,
            message: props?.confirmedMessage ?? "Tx is successfully confirmed!",
            type: "confirmed",
            link: props?.confirmedLink,
          });
          return setTxPending(false);
        }
      }
    } catch (err) {
      setTxPending(false);
      const id = idGenerator();
      setTxInfos({
        id,
        message: props?.errorMessage ?? "Something went wrong",
        type: "error",
        link: props?.errorLink,
      });
    }
  }

  return {
    setTx,
  };
}

export default useCustomToast;
