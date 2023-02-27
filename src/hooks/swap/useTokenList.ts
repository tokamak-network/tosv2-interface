import { fetchTokensURL } from "constants/index";
import useStakeId from "hooks/contract/useStakeId";
import { TokensData } from "types/tokens";
import { useEffect, useState, useMemo, useCallback } from "react";

function useTokenList() {
  const [tokenList, setTokenList] = useState<TokensData[] | undefined>(
    undefined
  );

  const fetTokenData = useCallback(async () => {
    try {
      const tokensReq = await fetch(fetchTokensURL)
        .then((res) => res.json())
        .then((result) => result);
      const tokensData: TokensData[] = await tokensReq.datas;

      if (tokensData !== undefined) {
        setTokenList(tokensData);
      }
    } catch (e) {
      console.log(e);
      return undefined;
    }
  }, []);


  useEffect(() => {
      fetTokenData().then((e) => {
    if (e !== undefined) {
      console.log("**fetchTokens err**");
      console.log(e);
    }
  });
  },[fetTokenData])
//   fetTokenData().then((e) => {
//     if (e !== undefined) {
//       console.log("**fetchTokens err**");
//       console.log(e);
//     }
//   });

//   useEffect(() => {
//       async function fetTokenData() {
//           try {
//               const tokensReq = await fetch(fetchTokensURL)
//                   .then((res) => res.json())
//                   .then((result) => result)
//               const tokensData: TokensData[] = await tokensReq.datas;

//               if (tokensData !== undefined) {
//                   setTokenList(tokensData)
//               }
//           } catch (e) {
//               console.log(e)
//               return undefined
//           }
//       }
//       fetTokenData().then((e) => {
//           if (e !== undefined) {
//               console.log("**fetchTokens err**");
//               console.log(e);
//           }
//       });
//   }, [])

  return tokenList;
}

export default useTokenList;
