import { useWindowDimensions } from "hooks/useWindowDimensions";
import { useMemo } from "react";

export function useModalStyle() {
  const [width, height] = useWindowDimensions();
  const refHeight = 905.7 + 135;

  const modalSectionMtValue = useMemo(() => {
    if (height > refHeight) {
      return 0;
    }
    const basicTopValue = refHeight - height;
    return basicTopValue;
  }, [height, refHeight]);

  return { modalSectionMtValue };
}
