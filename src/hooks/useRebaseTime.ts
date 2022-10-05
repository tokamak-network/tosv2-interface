import constant from "constant";
import { useEffect, useState } from "react";
import {
  convertTimeStamp,
  getDuration,
  getNowTimeStamp,
  getTimeLeft,
  getTimeZone,
  isTimeOver,
} from "utils/time";

/*
Notion link : https://www.notion.so/onther/rebase-time-403b95c624bc4b888978ff47e1f32df9
*/

function useRebaseTime(format?: ":") {
  const [rebaseTime, setRebaseTime] = useState<string>("-");
  const { epochLength, beginEpochEnd } = constant.rebase;

  useEffect(() => {
    // epoch.length = 600
    // begin_epoch.end = 1660888927
    // 현재시간_서버시간 = unix epoch time
    //time left until next rebase = 600 - (현재시간_서버시간 - (begin_epoch.end-epoch.length))%epoch.length
    setInterval(() => {
      const nowTimeStamp = getNowTimeStamp();
      const nextRebaseTimeStamp =
        epochLength - ((nowTimeStamp - beginEpochEnd) % epochLength);
      const nextRebaseTime = getDuration(nextRebaseTimeStamp, "HH:mm:ss");
      // console.log(nextRebaseTime);
      const { hours, mins, secs } = nextRebaseTime;
      const hour =
        hours.toString().length === 1
          ? `0${nextRebaseTime.hours}`
          : `${nextRebaseTime.hours}`;
      const min =
        mins.toString().length === 1
          ? `0${nextRebaseTime.mins}`
          : `${nextRebaseTime.mins}`;
      const sec =
        secs.toString().length === 1
          ? `0${nextRebaseTime.secs}`
          : `${nextRebaseTime.secs}`;

      getTimeZone();

      if (format) {
        return setRebaseTime(`${hour}${format}${min}${format}${sec}`);
      }
      return setRebaseTime(`${hour}.${min}.${sec}`);
    }, 1000);
  }, []);

  return rebaseTime;
}

export default useRebaseTime;
