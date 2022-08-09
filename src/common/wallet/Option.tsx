import {Box, Text, Flex,useColorMode} from '@chakra-ui/react';
import {FC} from 'react';
import Image from "next/image";
type WalletOptionProps = {
  onClick?: () => void;
  id: string;
  active?: boolean;
  clickable?: boolean;
  color: string;
  link?: string | null;
  header: string;
  subheader: string | null;
  icon: string;
};

export const WalletOption: FC<WalletOptionProps> = ({
  onClick,
  id,
  header,
  subheader,
  icon,
}) => {
  console.log(icon);
  
  const { colorMode } = useColorMode();
  return (
    <Box
      id={id}
      onClick={onClick}
      cursor="pointer"
      borderWidth={1}
      borderColor={colorMode=='dark'? '#8a8a98':'#7e7e8f'}
      rounded={5}
      px={5}
      py={3}
      mb={3}>
      <Flex align="center" color={colorMode==='dark'? '#8b8b93' :'#07070c'}>
        <Flex h={5} w={5}>
        <Image src={icon} alt={header} />
        </Flex>
       
        <Text fontSize="md" fontWeight={600}>{header}</Text>
      </Flex>
      <Text fontSize="sm">{subheader}</Text>
    </Box>
  );
};
