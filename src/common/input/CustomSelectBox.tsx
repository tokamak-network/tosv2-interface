import { Select } from "@chakra-ui/react";

type CustomSelectBoxProps = {
  optionList: { title: string; value: any }[];
  defaultValue: string | number;
};

function CustomSelectBox(props: CustomSelectBoxProps) {
  const { optionList, defaultValue } = props;
  return (
    <Select
      w={"173px"}
      h={"45px"}
      bgColor={"#1f2128"}
      borderWidth={1}
      borderColor={"#313442"}
      defaultValue={defaultValue}
    >
      {optionList.map((option) => {
        return (
          <option key={option.title} value={option.value}>
            {option.title}
          </option>
        );
      })}
    </Select>
  );
}

export default CustomSelectBox;
