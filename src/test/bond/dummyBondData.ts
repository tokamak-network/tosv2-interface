import { BondCardProps, BondPool, BondRawdata } from "types/bond";

export type T_DummyBondData = {
  bondCapacity: string;
  bondingPrice: string;
  discountRate: string;
  endTime: number;
  index: number;
  tokenType: BondPool;
  totalSold: string;
};

export function getDummyServerBondData(): BondRawdata[] {
  const dummyServerBondData = [
    {
      index: 0,
      capacity: 30400,
      quoteToken: "0x0000000000000000000000000000000000000000",
      totalSold: 0,
      tokenLogo: "",
      bondPrice: 3015.716,
      endTime: 1669852800,
      createdAt: "2022-09-22T06:17:34.091Z",
    },
    {
      index: 1,
      capacity: 26003.60044995,
      quoteToken: "0x0000000000000000000000000000000000000000",
      totalSold: 0,
      tokenLogo: "",
      bondPrice: 3500,
      endTime: 1670394842,
      createdAt: "2022-09-22T06:17:34.096Z",
    },
    {
      index: 2,
      capacity: 1238,
      quoteToken: "0x0000000000000000000000000000000000000000",
      totalSold: 0,
      tokenLogo: "",
      bondPrice: 2064,
      endTime: 1677596400,
      createdAt: "2022-09-22T06:17:34.099Z",
    },
    {
      index: 3,
      capacity: 12342.72,
      quoteToken: "0x0000000000000000000000000000000000000000",
      totalSold: 0.579,
      tokenLogo: "",
      bondPrice: 2064,
      endTime: 1677596400,
      createdAt: "2022-09-22T06:17:34.119Z",
    },
    {
      index: 4,
      capacity: 4850.52437451,
      quoteToken: "0x0000000000000000000000000000000000000000",
      totalSold: 0,
      tokenLogo: "",
      bondPrice: 1616.84145817,
      endTime: 1677596400,
      createdAt: "2022-09-22T10:23:15.552Z",
    },
    {
      index: 5,
      capacity: 19402.097498,
      quoteToken: "0x0000000000000000000000000000000000000000",
      totalSold: 400,
      tokenLogo: "",
      bondPrice: 1616.84145817,
      endTime: 1671431913,
      createdAt: "2022-09-22T10:24:30.634Z",
    },
    {
      index: 6,
      capacity: 33492.71,
      quoteToken: "0x0000000000000000000000000000000000000000",
      totalSold: 519.82,
      tokenLogo: "",
      bondPrice: 4700,
      endTime: 1665383477,
      createdAt: "2022-09-22T10:29:46.008Z",
    },
  ];
  return dummyServerBondData;
}
