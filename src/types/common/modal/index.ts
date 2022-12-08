export type ITopContentProps = {
  title: string;
  content: string;
  tooltip?: string;
  symbol?: string;
};

export type IBottomContentProps = {
  title: string;
  content: string | number;
  secondContent?: string | number;
  tooltip?: string;
  secondTooltip?: string;
  thirdTooltip?: string;
};
