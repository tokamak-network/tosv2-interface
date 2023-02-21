import {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import {
  Text,
  Flex,
  Input,
  Box,
  Button,
  Avatar,
  Link,
  useTheme,
  useColorMode,
} from "@chakra-ui/react";
import icon_arrow from "assets/icon_arrow.png";
import ETH_symbol from "assets/ETH_symbol.png";
import useTokenList from "hooks/swap/useTokenList";
import { useRecoilValue, useRecoilState } from "recoil";
import { useWeb3React } from "@web3-react/core";
import { DEFAULT_NETWORK } from "constants/index";
import Image from "next/image";
import useCallContract from "hooks/useCallContract";
import CONTRACT_ADDRESS from "services/addresses/contract";
import { selectedToken0, selectedToken1 } from "atom/swap";
import ArrowDownImg from "assets/icons/arrow-Down.svg";
import ArrowDownD from 'assets/icons/arrow-DownDark.svg'
import ArrowDownL from 'assets/icons/arrow-DownLight.svg'
import {ZERO_ADDRESS} from 'constants/index'
function SelectToken(props: { tokenType: Number }) {
  const { tokenType } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const tokenList = useTokenList();
  const [token0, setToken0] = useRecoilState(selectedToken0);
  const [token1, setToken1] = useRecoilState(selectedToken1);
  const [validAddress, setValidAddress] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const { TON_CONTRACT, WTON_CONTRACT } = useCallContract();
  const { account, library } = useWeb3React();
  const wrapperRef = useRef(null);
  const [expanded, setExpanded] = useState<boolean>(false);
  const [tokensFromAPI, setTokensFromAPI] = useState<any>([]);
  const [selected, setSelected] = useState({ name: "", img: "" });
  const [searchToken, setSearchToken] = useState({
    name: "",
    address: "",
    symbol: "",
  });
  
  useEffect(() => {
    if (tokenList !== undefined) {
      const tokensOrdered: any[] = [];
      const Eth = {
        token: {
          address: ZERO_ADDRESS,
          symbol: "ETH",
          name: "Ether",
        },
        tokenAddress: ZERO_ADDRESS,
        tokenImage: "",
      };
      Number(DEFAULT_NETWORK) === 1
        ? tokensOrdered.push(
            Eth,
            tokenList[7],
            tokenList[4],
            tokenList[2],
            tokenList[1],
            tokenList[0],
            tokenList[3],
            tokenList[6]
          )
        : tokensOrdered.push(
            Eth,
            tokenList[5],
            tokenList[6],
            tokenList[0],
            tokenList[2],
            tokenList[1],
            tokenList[3],
            tokenList[4]
          );

      setTokensFromAPI(tokensOrdered);
      setSelected(tokenType === 0 ? token0 : token1);
    }
  }, [tokenList, token0, token1, tokenType]);

  const TokenComp = (props: { img: any; name: string; address: string }) => {
    const { img, name, address } = props;
    const { TON_ADDRESS, WTON_ADDRESS } = CONTRACT_ADDRESS;
    const addToken = useCallback(async () => {
      if (TON_CONTRACT && WTON_CONTRACT && account) {
        if (address.toLocaleLowerCase() === WTON_ADDRESS.toLocaleLowerCase()) {
          const tokenSymbol = await WTON_CONTRACT.symbol();
          const tokenDecimals = await WTON_CONTRACT.decimals();
          try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            //@ts-ignore
            const wasAdded = await window?.ethereum?.request({
              method: "wallet_watchAsset",
              params: {
                type: "ERC20", // Initially only supports ERC20, but eventually more!
                options: {
                  address: address, // The address that the token is at.
                  symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                  decimals: tokenDecimals, // The number of decimals in the token
                  image: img, // A string url of the token logo
                },
              },
            });
            if (wasAdded) {
            } else {
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          const tokenSymbol = await TON_CONTRACT.symbol();
          const tokenDecimals = await TON_CONTRACT.decimals();
          try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            //@ts-ignore
            const wasAdded = await window?.ethereum?.request({
              method: "wallet_watchAsset",
              params: {
                type: "ERC20", // Initially only supports ERC20, but eventually more!
                options: {
                  address: address, // The address that the token is at.
                  symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
                  decimals: tokenDecimals, // The number of decimals in the token
                  image: img, // A string url of the token logo
                },
              },
            });
            if (wasAdded) {
            } else {
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
    }, [address, WTON_ADDRESS, img]);
    return (
      <Flex
        h="44px"
        alignItems={"center"}
        zIndex={1000}
        justifyContent="space-between"
        onClick={() => {
          setSelected({ name: name, img: img });
          setExpanded(false);
          tokenType === 0
            ? setToken0({ name: name, address: address, img: img })
            : setToken1({ name: name, address: address, img: img });
        }}
        _hover={{ cursor: "pointer" }}
      >
        <Flex alignItems={"center"}>
          <Flex
            border="1px solid"
            borderColor={colorMode === "dark" ? "#313442" : "#e7edf3"}
            h="32px"
            w="32px"
            mr="9px"
            borderRadius={"50%"}
          >
            <Image
              loader={myLoader}
              src={img !== undefined && img !== "" ? img : ETH_symbol}
              height={"32px"}
              width={"32px"}
              alt={'token avatar'}
              style={{ borderRadius: "50%" }}
            />
          </Flex>

          <Text
            color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}
            fontWeight={"bold"}
          >
            {name}
          </Text>
        </Flex>

        {address.toLocaleLowerCase() !== ZERO_ADDRESS && (
          <Text
            fontSize={"10px"}
            _hover={{ textDecor: "underline" }}
            onClick={() => {
              addToken();
            }}
          >
            Import
          </Text>
        )}
      </Flex>
    );
  };

  const myLoader = ({ src }: any) => {
    return `${src}`;
  };

  return (
    <Flex
      w={"310px"}
      flexDir="column"
      ref={wrapperRef}
      bg={colorMode === "dark" ? "#121318" : "#ffffff"}
    >
      <Flex
        w="100%"
        h={"56px"}
        border={"solid 1px"}
        borderColor={colorMode === "dark" ? "#313442" : "#dfe4ee"}
        borderRadius="28px"
        p="8px"
        bg={colorMode === "dark" ? "#121318" : "#ffffff"}
        alignItems="center"
        onClick={() => setExpanded(!expanded)}
        _hover={{ cursor: "pointer" }}
        zIndex={expanded ? 1000 : 0}
      >
        <Flex
          alignItems="center"
          justifyContent={"space-between"}
          w="100%"
          bg={colorMode === "dark" ? "#121318" : "#ffffff"}
        >
          {selected.name === "" ? (
            <Flex alignItems="center">
              <Box w="40px" h="40px" borderRadius={"50%"} bg={colorMode === 'dark'? "#1e1e24": "#e9edf1"}></Box>
              <Text
                color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}
                fontSize="18px"
                ml="10px"
                fontWeight={"normal"}
              >
                Select a token
              </Text>
            </Flex>
          ) : (
            <Flex
              alignItems="center"
              bg={colorMode === "dark" ? "#121318" : "#ffffff"}
            >
              {selected.img === "" || !selected.img ? (
                selected.name === "ETH" || selected.name === "WETH" ? (
                  <Flex w="40px" h="40px" borderRadius={"50%"}>
                    <Image
                      src={ETH_symbol}
                      height={40}
                      alt={'token avatar'}
                      width={40}
                      style={{ borderRadius: "50%" }}
                    ></Image>
                  </Flex>
                ) : (
                  <Avatar name={selected.name} w="40px" h="40px" />
                )
              ) : (
                <Flex
                  w="40px"
                  h="40px"
                  borderRadius={"50%"}
                  border={"1px solid"}
                  borderColor={colorMode === "dark" ? "#313442" : "#e7edf3"}
                >
                  <Image
                    loader={myLoader}
                    src={selected.img}
                    alt={'token avatar'}
                    height={40}
                    width={40}
                    style={{ borderRadius: "50%" }}
                  ></Image>
                </Flex>
              )}

              <Text
                color={colorMode === "dark" ? "#8b8b93" : "#3d495d"}
                fontSize="18px"
                ml="10px"
                fontWeight={"normal"}
              >
                {selected.name}
              </Text>
            </Flex>
          )}
          <Flex h="14px" w="14px" mr="16px" transform={'rotate(270deg)'}>
            <Image src={colorMode === 'dark'? ArrowDownD: ArrowDownL}  alt='arrow'/>
          </Flex>
        </Flex>
      </Flex>
      {expanded && (
        <Flex
          flexDir={"column"}
          w="310px"
          position={"absolute"}
          bg={colorMode === "dark" ? "#121318" : "#ffffff"}
          mt="28px"
          zIndex={100}
          borderX={"solid 1px"}
          borderBottom="solid 1px"
          borderColor={colorMode === "dark" ? "#1f2128" : "#dfe4ee"}
          borderBottomRadius={"28px"}
          px="15px"
          pt={"42px"}
          pb={"10px"}
        >
          {tokensFromAPI.map((token: any, index: number) => (
            <TokenComp
              img={token.tokenImage}
              name={token.token.symbol}
              address={token.tokenAddress}
              key={index}
            />
          ))}
        </Flex>
      )}
    </Flex>
  );
}

export default SelectToken;
