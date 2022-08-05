import { Button, useColorMode, useTheme } from "@chakra-ui/react";

type BasicButtonProp = {
  name: string;
  w?: number | string;
  h?: number | string;
  isDisabled?: boolean;
  style?: any;
  onClick?: Function;
};

const BasicButton: React.FC<BasicButtonProp> = (props) => {
  const { name, w, h, isDisabled, style, onClick } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  return (
    <Button
      w={w || 150}
      h={h || 33}
      isDisabled={isDisabled}
      _hover={isDisabled ? {} : { borderColor: "blue.100", color: "blue.100" }}
      _focus={{backgroundColor:'transparent'}}
      _disabled={{border: colorMode ==='dark'? '1px solid #535353': '1px solid #c6cbd9', color:colorMode ==='light'? '#c6cbd9':'#5a5a5a', cursor:'not-allowed'}}
     _active={{backgroundColor:'transparent'}}
      fontSize={12}
      {...theme.BUTTON_STYLE.basicButtonStyle(colorMode)}
      color={colorMode==='dark'?'#f1f1f1':'#07070c'}
      {...style}
      //   background={"white.100"}
      onClick={onClick ? () => onClick() : null}
    >
      {name}
    </Button>
  );
};

export default BasicButton;
