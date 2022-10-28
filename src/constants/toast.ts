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

export { toastConfig };
