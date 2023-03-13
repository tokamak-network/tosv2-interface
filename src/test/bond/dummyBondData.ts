import { BondCardProps, BondPool, BondRawdata } from "types/bond";

export function getDummyServerBondData(): BondRawdata[] {
  const dummyServerBondData = [
    {
      index: 8,
      version: "v1.1",
      capacity: 19402.097498,
      quoteToken: "0x0000000000000000000000000000000000000000",
      totalSold: 0,
      bondPrice: 0.23827654118890443,
      endTime: 1677826800,
      updatedTime: 1677569288655,
      startTime: 1677481200,
      maxPayout: 0,
      initialMaxPayout: 2,
      capacityUpdatePeriod: 86400,
      bonusRatesAddress: "0xbe8808548c8e1179435448fB621EC5A7A60c178D",
      bonusRatesId: 1,
      bondType: 1,
      closed: false,
      periodicCapacity: 4850.5243745,
      currentCapacity: 9701.048749,
      createdAt: new Date(),
      ethPrice: 0,
    },
  ];
  return dummyServerBondData;
}
