import { useEffect, useState } from "react";
import {
  convertTimeStamp,
  getNowTimeStamp,
  getTimeLeft,
  isTimeOver,
} from "utils/time";

/*
Notion link : https://www.notion.so/onther/rebase-time-403b95c624bc4b888978ff47e1f32df9
*/

function useRebaseTime() {
  const [rebaseTime, setRebaseTime] = useState<string>("-");

  useEffect(() => {
    // epoch.length = 600
    // begin_epoch.end = 1660888927
    // 현재시간_서버시간 = unix epoch time
    //time left until next rebase = 600 - (현재시간_서버시간 - (begin_epoch.end-epoch.length))%epoch.length
    setInterval(() => {
      const nowTimeStamp = getNowTimeStamp();
      const nextRebaseTimeStamp = 600 - ((nowTimeStamp - 1660888927) % 600);
      const nextRebaseTime = convertTimeStamp(nextRebaseTimeStamp, "HH:mm:ss");
      setRebaseTime(nextRebaseTime);
    }, 1000);
  }, []);

  return rebaseTime;
}

export default useRebaseTime;
