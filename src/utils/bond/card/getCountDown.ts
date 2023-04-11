import { getDuration, getNowTimeStamp } from "@/utils/time";

export function getCountDown(refTime: number) {
  const timeDiff = refTime - getNowTimeStamp();
  const countDown = getDuration(timeDiff);
  return countDown;
}
