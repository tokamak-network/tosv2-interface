import Image from "next/image";
import { useColorMode } from "@chakra-ui/react";
import TOS_BI_ICON from "assets/icons/tos-bi.svg";
import TOS_BIG_BI_ICON from "assets/icons/TOS_bi.svg";
import TOS_BIG_BI_BRIGHT_ICON from 'assets/icons/TOS_bi_bright.svg';
import TOS_BI_BRIGHT_ICON from 'assets/icons/tos-bi_bright.svg';
const Logo = (props: { isExpended: boolean }) => {
  const { colorMode } = useColorMode();
  return (
    <Image
      src={ colorMode === 'dark'? props.isExpended ?   TOS_BIG_BI_ICON :TOS_BI_ICON :  props.isExpended ? TOS_BIG_BI_BRIGHT_ICON : TOS_BI_BRIGHT_ICON}
      alt={"TOS_BI_ICON"}
    ></Image>
  );
};

export default Logo;
