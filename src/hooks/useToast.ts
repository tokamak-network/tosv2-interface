import { useToast } from "@chakra-ui/react";
import toastConfig from "constants/toast";

type ToastPayload = {
  status: "success" | "error";
  title: string;
  description: string;
  duration?: number;
  isClosable?: boolean;
};

function useCustomToast(props: ToastPayload) {
  const toast = useToast();

  // \function setTx<T>(contract: Promise<T>) {
  //   try {
  //     const receipt = await contract;

  //   } catch (err) {
  //     store.dispatch(setTxPending({ tx: false }));
  //     store.dispatch(
  //       //@ts-ignore
  //       openToast({
  //         payload: {
  //           status: "error",
  //           title: "Tx fail to send",
  //           description: `something went wrong`,
  //           duration: 5000,
  //           isClosable: true,
  //         },
  //       })
  //     );
  //   }
  // }

  return {
    toast: () =>
      toast({
        ...toastConfig,
        ...props,
      }),
  };
}

export default useCustomToast;
