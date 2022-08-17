import moment from "moment";

function convertTimeStamp(timeStamp: number, format?: string): string {
  const date = moment.unix(timeStamp).format(format || "YYYY.MM.D");
  return date;
}

function getNowTimeStamp() {
  return moment().unix();
}

// function getTimeDiff(timeStampA: number, timeStampB: number, format?: string) {
//   const timeA = moment.unix(timeStampA);
//   const timeB = moment.unix(timeStampB);
//   return timeA.diff(timeB, "YYYY.MM.D");
// }

export { convertTimeStamp, getNowTimeStamp };
