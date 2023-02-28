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
  
  const { colorMode } = useColorMode();
  return (
    <Box
      id={id}
      onClick={onClick}
      cursor="pointer"
      borderWidth={1}
      bg={colorMode==='dark'?"#1f2128":"#ffffff"}
      borderColor={colorMode=='dark'? '#313442':'#e8edf2'}
      rounded={5}
      px={5}
      py={3}
      mb={3}>
      <Flex align="center" color={colorMode==='dark'? '#8b8b93' :'#07070c'}>
        <Flex h={'43px'} w={'43px'} mr='15px'>
        <Image src={icon} alt={header} />
        </Flex>
       <Flex flexDir={'column'}>

         <Text fontSize="md" fontWeight={600} color={colorMode==='dark'?"#f1f1f1":'#07070c'}>{header}</Text>
        <Text fontSize="sm" color={colorMode==='dark'?"#8b8b93":'#7e7e8f'}>{subheader}</Text>
       </Flex>
       
      </Flex>
      
    </Box>
  );
};
