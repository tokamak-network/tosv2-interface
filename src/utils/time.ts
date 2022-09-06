import moment from "moment";

function convertTimeStamp(timeStamp: number, format?: string): string {
  const date = moment.unix(timeStamp).format(format || "YYYY.MM.D");
  return date;
}

function getNowTimeStamp() {
  return moment().unix();
}

function isTimeOver(timeStamp: number) {
  const nowTimeStamp = getNowTimeStamp();
  const timeDiff = timeStamp - nowTimeStamp;
  return timeDiff < 0;
}

function getTimeLeft(
  timeStamp: number,
  daysDiff: number,
  format?: string,
  diffType?: "d" | "w" | "m" | "y"
): string {
  const timeLeft = moment
    .unix(timeStamp)
    .add(daysDiff, "d")
    .format(format || "MM.DD HH:mm:ss");
  return timeLeft;
}

function getDuration(
  timeStamp: number,
  format?: string
): { days: number; hours: number; mins: number } {
  const min = 60;
  const hour = 3600;
  const day = 86400;

  const days = Math.floor(timeStamp / day);
  const hours = Math.floor((timeStamp - day * days) / hour);
  const mins = Math.floor((timeStamp - day * days - hour * hours) / min);
  return {
    days,
    hours,
    mins,
  };
}

export {
  convertTimeStamp,
  getNowTimeStamp,
  isTimeOver,
  getTimeLeft,
  getDuration,
};
