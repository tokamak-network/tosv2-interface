import commafy from "@/utils/commafy";

export function getTosCapacityOnEth(params: {
  tosCapacity: number;
  tosPrice: number;
  ethPrice: number;
}) {
  const { tosCapacity, tosPrice, ethPrice } = params;
  const tosCapaOnPrice = Math.floor(tosCapacity) * tosPrice;
  const tosCapacityOnEth = tosCapaOnPrice / ethPrice;

  return Number(commafy(tosCapacityOnEth));
}
