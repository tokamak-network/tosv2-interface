import JSBI from "jsbi";
import { BigNumber, ethers } from "ethers";

const calculateCompound = async ({
  tosValuation,
  rebasePerEpoch,
  n,
}: {
  tosValuation: BigNumber;
  rebasePerEpoch: BigNumber;
  n: BigNumber;
}) => {
  const bigIntEther = JSBI.BigInt("1000000000000000000");
  const bigIntN = JSBI.BigInt(n.toString());
  let bnAmountCompound = JSBI.BigInt("0");

  if (n.gt(ethers.BigNumber.from("2"))) {
    bnAmountCompound = JSBI.divide(
      JSBI.multiply(
        JSBI.BigInt(tosValuation.toString()),
        JSBI.divide(
          JSBI.exponentiate(
            JSBI.add(bigIntEther, JSBI.BigInt(rebasePerEpoch.toString())),
            bigIntN
          ),
          JSBI.exponentiate(
            bigIntEther,
            JSBI.subtract(bigIntN, JSBI.BigInt("2"))
          )
        )
      ),
      JSBI.exponentiate(bigIntEther, JSBI.BigInt("2"))
    );
  } else {
    bnAmountCompound = JSBI.divide(
      JSBI.multiply(
        JSBI.BigInt(tosValuation.toString()),
        JSBI.divide(
          JSBI.exponentiate(
            JSBI.add(bigIntEther, JSBI.BigInt(rebasePerEpoch.toString())),
            bigIntN
          ),
          JSBI.exponentiate(
            bigIntEther,
            JSBI.subtract(bigIntN, JSBI.BigInt("1"))
          )
        )
      ),
      JSBI.exponentiate(bigIntEther, JSBI.BigInt("1"))
    );
  }
  return bnAmountCompound;
};

export default calculateCompound;
