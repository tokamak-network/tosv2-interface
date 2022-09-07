type ToastConfig = {
  duration: number;
  isClosable: boolean;
  position:
    | "top"
    | "top-right"
    | "top-left"
    | "bottom"
    | "bottom-right"
    | "bottom-left";
};

const toastConfig: ToastConfig = {
  duration: 5000,
  isClosable: true,
  position: "top",
};

const successContainerStyle = {
  backgroundColor: "#50d1b2",
};

const errorContainerStyle = {
  backgroundColor: "#e23738",
};

//  const receipt = await tx.wait();
//  const { logs } = receipt;

export { toastConfig, successContainerStyle, errorContainerStyle };
