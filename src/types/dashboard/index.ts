export type Dashboard_SmallCardType = {
  price: string | number;
  priceUnit: string;
  priceChangePercent?: number;
  title: string;
  tooltip?: boolean;
  tooltipMessage: string;
  style?: {};
  switchButton?: boolean;
  switchPrice?: string | number;
  switchPriceUnit?: string;
};
export type Dashboard_SmallCardArrType = Dashboard_SmallCardType[];
