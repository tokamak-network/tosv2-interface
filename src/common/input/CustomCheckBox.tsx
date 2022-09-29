import { Box, Checkbox, Input, useColorMode, useTheme } from "@chakra-ui/react";
import {
  checkboxAll,
  checkboxsState,
  selectedCheckboxState,
} from "atom/global/checkbox";
import usePathName from "hooks/usePathName";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { PageKey, Pages } from "types";

type CheckBoxProp = {
  placeHolder?: string;
  w?: number;
  h?: number;
  isDisabled?: boolean;
  value?: any;
  valueKey?: any;
  pageKey?: PageKey;
  isError?: boolean;
  isChecked?: boolean;
  state?: boolean;
  setState?: React.Dispatch<SetStateAction<boolean>>;
  action?: () => void;
  elseAction?: () => void;
  checkAll?: boolean;
  params?: any;
  belongToSelectAll?: boolean;
};

const CustomCheckBox: React.FC<CheckBoxProp> = (props) => {
  const {
    placeHolder,
    w,
    h,
    isDisabled,
    value,
    valueKey,
    pageKey,
    isError,
    isChecked,
    state,
    setState,
    action,
    elseAction,
    checkAll,
    params,
    belongToSelectAll,
  } = props;
  const theme = useTheme();
  const { colorMode } = useColorMode();
  const { pathName } = usePathName();
  const [isCheckdAll, setIsCheckdAll] = useRecoilState(checkboxAll);
  const [checkboxState, setCheckboxState] = useRecoilState(checkboxsState);
  const resetCheckBoxValue = useResetRecoilState(checkboxsState);

  const [checkThisBox, setCheckThisBox] = useState<boolean>(state || false);

  useEffect(() => {
    if (belongToSelectAll) {
      if (pageKey && isCheckdAll === pageKey) {
        setCheckThisBox(true);
      } else {
        setCheckThisBox(false);
      }
    }
  }, [isCheckdAll, pageKey, setState, belongToSelectAll]);

  useEffect(() => {
    if (checkThisBox && checkboxState && params) {
      const isExist = checkboxState?.filter((data) => {
        if (data?.stakedId) return data.stakedId === params.stakedId;
      });

      if (isExist.length === 0) {
        const value = [...checkboxState, params];
        return setCheckboxState(value);
      }
    }
  }, [params, checkThisBox, checkboxState, setCheckboxState]);

  useEffect(() => {
    if (checkThisBox === false && checkboxState && params) {
      const isExist = checkboxState?.filter((data) => {
        if (data?.stakedId) return data.stakedId === params.stakedId;
      });
      if (isExist.length === 1) {
        const newValue = checkboxState?.filter((data) => {
          if (data?.stakedId) return data.stakedId !== params.stakedId;
        });
        setCheckboxState(newValue);
      }
    }
  }, [checkThisBox, checkboxState, params, setCheckboxState]);

  return (
    <Checkbox
      size={"lg"}
      style={{
        borderRadius: "4px",
        borderColor: colorMode === "dark" ? "#535353" : "#c6cbd9",
      }}
      isChecked={belongToSelectAll ? checkThisBox : state}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (setState) {
          setState(isChecked);
        } else {
          setCheckThisBox(isChecked);
        }
        if (checkAll && pageKey) {
          if (isChecked) {
            setIsCheckdAll(pageKey);
          } else {
            resetCheckBoxValue();
            // setIsCheckdAll(undefined);
          }
        }
      }}
    ></Checkbox>
  );
};

export default CustomCheckBox;
