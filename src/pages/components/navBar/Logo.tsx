import Image from "next/image";
import { useColorMode } from "@chakra-ui/react";
import TOS_BI_ICON from "assets/icons/tos-bi.svg";
import TOS_BIG_BI_ICON from "assets/icons/TOS_bi.svg";
import TOS_BIG_BI_BRIGHT_ICON from "assets/icons/TOS_bi_bright.svg";
import TOS_BI_BRIGHT_ICON from "assets/icons/tos-bi_bright.svg";
import { useRouter } from "next/router";
import { sidebarState } from "atom/header";
import { useRecoilState } from "recoil";
const Logo = (props: { isExpended: boolean }) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const [isOpen, setIsOpen] = useRecoilState(sidebarState);

  const sendToMain = () => {
    setIsOpen(false);
    router.push("/");
  };
  return (
    <Image
      src={
        colorMode === "dark"
          ? props.isExpended
            ? TOS_BIG_BI_ICON
            : TOS_BI_ICON
          : props.isExpended
          ? TOS_BIG_BI_BRIGHT_ICON
          : TOS_BI_BRIGHT_ICON
      }
      alt={"TOS_BI_ICON"}
      onClick={sendToMain}
      style={{ cursor: "pointer" }}
    ></Image>
  );
};

export default Logo;
