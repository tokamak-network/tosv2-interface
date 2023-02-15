import { atom, selector } from "recoil";

const selectedToken0 = atom ({
    key:'selectedToken0',
    default:{
        name: "",
        address: "",
        img: "",
      }
})

const selectedToken1 = atom ({
    key:'selectedToken1',
    default:{
        name: "",
        address: "",
        img: "",
      }
})


const swapTX = atom({
  key:'swapTX',
  default: {
    tx:false,
    data: {
      name:''
    }
  }
})

const slip = atom({
  key:'slip',
  default: '0'
})

const focus = atom ({
  key:'focus',
  default:'input1'
})

const swapFromAmount = atom ({
  key: 'swapFromAmount',
  default: '0'
})

const swapToAmount = atom ({
  key: 'swapToAmount',
  default: '0'
})

export {selectedToken0,selectedToken1,swapTX,slip,focus,swapFromAmount,swapToAmount}