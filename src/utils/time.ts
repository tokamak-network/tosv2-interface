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
  const timeDiff = nowTimeStamp - timeStamp;
  return timeDiff < 0;
}

function getTimeLeft(timeStamp: number, daysDiff: number, format?: string) {
  const timeLeft = moment(timeStamp)
    .add(daysDiff, "d")
    .format(format || "MM.DD HH:mm:ss");
  return timeLeft;
}

export { convertTimeStamp, getNowTimeStamp, isTimeOver };
