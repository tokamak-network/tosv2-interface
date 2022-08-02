import Image from "next/image";
import TOS_BI_ICON from "assets/icons/tos-bi.svg";
import TOS_BIG_BI_ICON from "assets/icons/TOS_bi.svg";

const Logo = (props: { isExpended: boolean }) => {
  return (
    <Image
      src={props.isExpended ? TOS_BIG_BI_ICON : TOS_BI_ICON}
      alt={"TOS_BI_ICON"}
    ></Image>
  );
};

export default Logo;
