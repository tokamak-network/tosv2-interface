import { Flex, useToast } from "@chakra-ui/react";
import { selectedTxState } from "atom/global/tx";
import { toastConfig } from "constants/toast";
import { useRecoilState } from "recoil";
import { Contract } from "@ethersproject/contracts";
import CustomToast from "common/toast/CustomToast";

type ToastPayload = {
  status: "success" | "error";
  title: string;
  description: string;
  duration?: number;
  isClosable?: boolean;
};

function useCustomToast(props?: ToastPayload) {
  const toast = useToast();
  const [txPending, setTxPending] = useRecoilState(selectedTxState);

  async function setTx(contract: Contract) {
    try {
      setTxPending(true);
      const receipt = contract;
      if (receipt) {
        toast({
          status: "success",
          title: "Success",
          description: `Tx is successfully pending!`,
          // render: ()=>(<Flex></Flex>),
          ...toastConfig,
        });
        const wait = await receipt.wait();
        if (wait) {
          return setTxPending(false);
        }
      }
    } catch (err) {
      setTxPending(false);
      return toast({
        status: "error",
        title: "Tx fail to send",
        description: `something went wrong`,
        ...toastConfig,
      });
    }
  }

  return {
    sendToast: () =>
      toast({
        ...toastConfig,
        ...props,
      }),
    setTx,
  };
}

export default useCustomToast;
