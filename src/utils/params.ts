import CONTRACT_ADDRESS from "services/addresses/contract";

const { TON_ADDRESS, WTON_ADDRESS, AURA_ADDRESS, LYDA_ADDRESS, DOC_ADDRESS, TOS_ADDRESS, WETH_ADDRESS } = CONTRACT_ADDRESS;
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const FeeAmount = {
    LOW: 500,
    MEDIUM: 3000,
    HIGH: 10000,
  };
  const FEE_SIZE = 3;
  const encodePath = (path: any, fees: any) => {
    if (path.length !== fees.length + 1) {
      throw new Error("path/fee lengths do not match");
    }
    let encoded = "0x";
    for (let i = 0; i < fees.length; i++) {
      encoded += path[i].slice(2);
      encoded += fees[i].toString(16).padStart(2 * FEE_SIZE, "0");
    }
    encoded += path[path.length - 1].slice(2);
    return encoded.toLowerCase();
  };


const getPool = (array1: string[], array2: string[]) => {
    const equal = array1.length === array2.length && array1.every(function (value, index) { return value === array2[index] })       
    return equal
  }

export const getParams = (address0: string, address1: string) => {    
    const wtonTos = [WTON_ADDRESS.toLowerCase(), TOS_ADDRESS.toLowerCase()];
    const tosWton = [TOS_ADDRESS.toLowerCase(), WTON_ADDRESS.toLowerCase()]
  
    const auraTos = [AURA_ADDRESS.toLowerCase(), TOS_ADDRESS.toLowerCase()]
    const tosAura = [TOS_ADDRESS.toLowerCase(), AURA_ADDRESS.toLowerCase()]
  
    const docTos = [DOC_ADDRESS.toLowerCase(), TOS_ADDRESS.toLowerCase()]
    const tosDoc = [TOS_ADDRESS.toLowerCase(), DOC_ADDRESS.toLowerCase()]
  
    const lydaTos = [LYDA_ADDRESS.toLowerCase(), TOS_ADDRESS.toLowerCase()]
    const tosLyda = [TOS_ADDRESS.toLowerCase(), LYDA_ADDRESS.toLowerCase()]
  
    const ethTos = [ZERO_ADDRESS, TOS_ADDRESS.toLowerCase()]
    const tosEth = [TOS_ADDRESS.toLowerCase(), ZERO_ADDRESS]
  
    const wethTos = [WETH_ADDRESS.toLowerCase(), TOS_ADDRESS.toLowerCase()];
    const tosWeth = [TOS_ADDRESS.toLowerCase(), WETH_ADDRESS.toLowerCase()]
  
    const tosTon = [TOS_ADDRESS.toLowerCase(), TON_ADDRESS.toLowerCase()]
    const tonTos = [TON_ADDRESS.toLowerCase(), TOS_ADDRESS.toLowerCase()]
  
    const wtonDoc = [WTON_ADDRESS.toLowerCase(), DOC_ADDRESS.toLowerCase()]
    const docWton = [DOC_ADDRESS.toLowerCase(), WTON_ADDRESS.toLowerCase()]
  
    const wtonAura = [WTON_ADDRESS.toLowerCase(), AURA_ADDRESS.toLowerCase()]
    const auraWton = [AURA_ADDRESS.toLowerCase(), WTON_ADDRESS.toLowerCase()]
  
    const wtonLyda = [WTON_ADDRESS.toLowerCase(), LYDA_ADDRESS.toLowerCase()]
    const LydaWton = [LYDA_ADDRESS.toLowerCase(), WTON_ADDRESS.toLowerCase()]
  
    const wtonWeth = [WTON_ADDRESS.toLowerCase(), WETH_ADDRESS.toLowerCase()]
    const wethWton = [WETH_ADDRESS.toLowerCase(), WTON_ADDRESS.toLowerCase()]
  
    const wtonEth = [WTON_ADDRESS.toLowerCase(), ZERO_ADDRESS]
    const ethWton = [ZERO_ADDRESS, WTON_ADDRESS.toLowerCase()]
  
    const docAura = [DOC_ADDRESS.toLowerCase(), AURA_ADDRESS.toLowerCase()]
    const auraDoc = [AURA_ADDRESS.toLowerCase(), DOC_ADDRESS.toLowerCase()]
  
    const docLyda = [DOC_ADDRESS.toLowerCase(), LYDA_ADDRESS.toLowerCase()]
    const lydaDoc = [LYDA_ADDRESS.toLowerCase(), DOC_ADDRESS.toLowerCase()]
  
    const lydaAura = [LYDA_ADDRESS.toLowerCase(), AURA_ADDRESS.toLowerCase()]
    const auraLyda = [AURA_ADDRESS.toLowerCase(), LYDA_ADDRESS.toLowerCase()]
  
    const docWeth = [DOC_ADDRESS.toLowerCase(), WETH_ADDRESS.toLowerCase()]
    const wethDoc = [WETH_ADDRESS.toLowerCase(), DOC_ADDRESS.toLowerCase()]
  
    const docTon = [DOC_ADDRESS.toLowerCase(), TON_ADDRESS.toLowerCase()]
    const tonDoc = [TON_ADDRESS.toLowerCase(), DOC_ADDRESS.toLowerCase()]
  
    const docEth = [DOC_ADDRESS.toLowerCase(), ZERO_ADDRESS]
    const ethDoc = [ZERO_ADDRESS, DOC_ADDRESS.toLowerCase()]
  
    const auraWeth = [AURA_ADDRESS.toLowerCase(), WETH_ADDRESS.toLowerCase()]
    const wethAura = [WETH_ADDRESS.toLowerCase(), AURA_ADDRESS.toLowerCase()]
  
    const auraTon = [AURA_ADDRESS.toLowerCase(), TON_ADDRESS.toLowerCase()]
    const tonAura = [TON_ADDRESS.toLowerCase(), AURA_ADDRESS.toLowerCase()]
  
    const auraEth = [AURA_ADDRESS.toLowerCase(), ZERO_ADDRESS]
    const ethAura = [ZERO_ADDRESS, AURA_ADDRESS.toLowerCase()]
  
    const lydaWeth = [LYDA_ADDRESS.toLowerCase(), WETH_ADDRESS.toLowerCase()]
    const wethLyda = [WETH_ADDRESS.toLowerCase(), LYDA_ADDRESS.toLowerCase()]
  
    const lydaTon = [LYDA_ADDRESS.toLowerCase(), TON_ADDRESS.toLowerCase()]
    const tonLyda = [TON_ADDRESS.toLowerCase(), LYDA_ADDRESS.toLowerCase()]
  
    const lydaEth = [LYDA_ADDRESS.toLowerCase(), ZERO_ADDRESS]
    const ethLyda = [ZERO_ADDRESS, LYDA_ADDRESS.toLowerCase()]
  
    const wethTon = [WETH_ADDRESS.toLowerCase(), TON_ADDRESS.toLowerCase()]
    const tonWeth = [TON_ADDRESS.toLowerCase(), WETH_ADDRESS.toLowerCase()]
  
    const tonEth = [TON_ADDRESS.toLowerCase(), ZERO_ADDRESS]
    const ethTon = [ZERO_ADDRESS, TON_ADDRESS.toLowerCase()]
  
    const pool = [address0.toLowerCase(), address1.toLowerCase()]

    
    switch (true) {
      case getPool(ethTon, pool):  
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM]),
          wrapEth: true,
          inputWrapWTON: false,
          outputUnwrapTON: true,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      case getPool(tonEth, pool):
  
        return {
          path: encodePath([ WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: true,
          outputUnwrapTON: false,
          outputUnwrapEth: true,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      //////////////////////////////// ////////////////////////////////
  
      case getPool(wethTon, pool):
  
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: true,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      case getPool(tonWeth, pool):
  
        return {
          path: encodePath([ WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: true,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      //////////////////////////////// ////////////////////////////////
  
      case getPool(lydaEth, pool):
  
        return {
          path: encodePath([LYDA_ADDRESS, TOS_ADDRESS, WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: true,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(ethLyda, pool):
  
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS, TOS_ADDRESS, LYDA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: true,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      //////////////////////////////// ////////////////////////////////
  
      case getPool(lydaTon, pool):
        return {
          path: encodePath([LYDA_ADDRESS, TOS_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: true,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(tonLyda, pool):
        return {
          path: encodePath([WTON_ADDRESS, TOS_ADDRESS, LYDA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: true,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      ///////////////////// ////////////////////////////////
  
  
      case getPool(lydaWeth, pool):
        return {
          path: encodePath([LYDA_ADDRESS, TOS_ADDRESS, WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(wethLyda, pool):
  
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS, TOS_ADDRESS, LYDA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      //////////////////////////////// ////////////////////////////////
  
  
      case getPool(auraEth, pool):        
        return {
          path: encodePath([AURA_ADDRESS, TOS_ADDRESS, WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: true,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(ethAura, pool):
  
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS, TOS_ADDRESS, AURA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: true,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      //////////////////////////////// ////////////////////////////////
  
      case getPool(auraTon, pool):
  
        return {
          path: encodePath([AURA_ADDRESS, TOS_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: true,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(tonAura, pool):
  
        return {
          path: encodePath([WTON_ADDRESS, TOS_ADDRESS, AURA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: true,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      //////////////////////////////// ////////////////////////////////
  
      case getPool(auraWeth, pool):
  
        return {
          path: encodePath([AURA_ADDRESS, TOS_ADDRESS, WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(wethAura, pool):
  
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS, TOS_ADDRESS, AURA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      //////////////////////////////// ////////////////////////////////
  
      case getPool(docEth, pool):
  
        return {
          path: encodePath([DOC_ADDRESS, TOS_ADDRESS, WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: true,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(ethDoc, pool):
  
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS, TOS_ADDRESS, DOC_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: true,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      //////////////////////////////// ////////////////////////////////
      case getPool(docTon, pool):
        
        return {
          path: encodePath([DOC_ADDRESS, TOS_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: true,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(tonDoc, pool):             
        return {
          path: encodePath([WTON_ADDRESS, TOS_ADDRESS, DOC_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: true,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      ///////////////////// ////////////////////////////////
  
      case getPool(docWeth, pool):
  
        return {
          path: encodePath([DOC_ADDRESS, TOS_ADDRESS, WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(wethDoc, pool):
  
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS, TOS_ADDRESS, DOC_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      ///////////////////// ////////////////////////////////
  
      case getPool(lydaAura, pool):
        return {
          path: encodePath([LYDA_ADDRESS, TOS_ADDRESS, AURA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(auraLyda, pool):
  
        return {
          path: encodePath([AURA_ADDRESS, TOS_ADDRESS, LYDA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      ///////////////////// ////////////////////////////////
      case getPool(docLyda, pool):
  
        return {
          path: encodePath([DOC_ADDRESS, TOS_ADDRESS, LYDA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(lydaDoc, pool):
  
        return {
          path: encodePath([LYDA_ADDRESS, TOS_ADDRESS, DOC_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      ///////////////////// ////////////////////////////////
      case getPool(docAura, pool):
  
        return {
          path: encodePath([DOC_ADDRESS, TOS_ADDRESS, AURA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(auraDoc, pool):
  
        return {
          path: encodePath([AURA_ADDRESS, TOS_ADDRESS, DOC_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      ///////////////////// ////////////////////////////////
      case getPool(wtonEth, pool):
  
        return {
          path: encodePath([WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: true,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      case getPool(ethWton, pool):      
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM]),
          wrapEth: true,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      ///////////////////// ////////////////////////////////
      case getPool(wtonWeth, pool):
  
        return {
          path: encodePath([WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      case getPool(wethWton, pool):
  
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      ///////////////////// ////////////////////////////////
      case getPool(wtonLyda, pool):
  
        return {
          path: encodePath([WTON_ADDRESS, TOS_ADDRESS, LYDA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(LydaWton, pool):
  
        return {
          path: encodePath([LYDA_ADDRESS, TOS_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      /////////////////////  ////////////////////////////////
      case getPool(wtonAura, pool):
  
  
        return {
          path: encodePath([WTON_ADDRESS, TOS_ADDRESS, AURA_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(auraWton, pool):
  
  
        return {
          path: encodePath([AURA_ADDRESS, TOS_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      ///////////////////// ////////////////////////////////
      case getPool(wtonDoc, pool):
  
        return {
          path: encodePath([WTON_ADDRESS, TOS_ADDRESS, DOC_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(docWton, pool):
  
  
        return {
          path: encodePath([DOC_ADDRESS, TOS_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      /////////////////////
      case getPool(tosTon, pool):        
        return {
          path: encodePath([TOS_ADDRESS, WTON_ADDRESS], [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: true,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }

      case getPool(tonTos, pool):        
        return {
          path: encodePath([WTON_ADDRESS, TOS_ADDRESS], [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: true,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      ///////////////////// ////////////////////////////////
  
      case getPool(wethTos, pool):
  
  
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS, TOS_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(tosWeth, pool):
  
  
        return {
          path: encodePath([TOS_ADDRESS, WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      ///////////////////// ////////////////////////////////
  
      case getPool(wtonTos, pool):
  
  
        return {
          path: encodePath(wtonTos, [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }

      case getPool(tosWton, pool):
        return {
          path: encodePath(tosWton, [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      //////////////////////////// ////////////////////////////////
      case getPool(auraTos, pool):
  
  
        return {
          path: encodePath(auraTos, [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      case getPool(tosAura, pool):
  
  
        return {
          path: encodePath(tosAura, [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      //////////////////////////// ////////////////////////////////
      case getPool(docTos, pool):
  
  
        return {
          path: encodePath(docTos, [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      case getPool(tosDoc, pool):  
        return {
          path: encodePath(tosDoc, [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      //////////////////////// ////////////////////////////////
      case getPool(lydaTos, pool):
  
  
        return {
          path: encodePath(lydaTos, [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      case getPool(tosLyda, pool):
  
  
        return {
          path: encodePath(tosLyda, [FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: true
        }
      ///////////////////////////////// ////////////////////////////////
      case getPool(ethTos, pool):
        return {
          path: encodePath([WETH_ADDRESS, WTON_ADDRESS, TOS_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: true,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: false,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
      case getPool(tosEth, pool):
  
  
        return {
          path: encodePath([TOS_ADDRESS, WTON_ADDRESS, WETH_ADDRESS], [FeeAmount.MEDIUM, FeeAmount.MEDIUM]),
          wrapEth: false,
          inputWrapWTON: false,
          outputUnwrapTON: false,
          outputUnwrapEth: true,
          fee: FeeAmount.MEDIUM,
          quoteExactInputSingle: false
        }
  
    }
  }
  