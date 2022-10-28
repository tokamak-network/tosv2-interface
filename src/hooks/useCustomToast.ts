import { Flex, useToast } from "@chakra-ui/react";
import { selectedTxState, txInfo, txInfoState } from "atom/global/tx";
import { toastConfig } from "constants/toast";
import { useRecoilState } from "recoil";
import { Contract } from "@ethersproject/contracts";
import CustomToast from "common/toast/CustomToast";
import { ToastType } from "types/toast";
import idGenerator from "@/components/idGenerator";

type ToastPayload = {
  description?: string;
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
          message: "Tx is successfully pending!",
          type: "success",
        });
        const wait = await receipt.wait();
        if (wait) {
          const id = idGenerator();
          setTxInfos({
            id,
            message: "Tx is successfully confirmed!",
            type: "confirmed",
          });
          return setTxPending(false);
        }
      }
    } catch (err) {
      setTxPending(false);
      const id = idGenerator();
      setTxInfos({
        id,
        message: "Something went wrong",
        type: "error",
      });
    }
  }

  return {
    setTx,
  };
}

export default useCustomToast;
