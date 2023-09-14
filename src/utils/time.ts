import constant from "constant";
import moment from "moment";
import Moment from "moment-timezone";

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
): { days: number; hours: number; mins: number; secs: number } {
  const sec = 60;
  const min = 60;
  const hour = 3600;
  const day = 86400;

  const days = Math.floor(timeStamp / day);
  const hours = Math.floor((timeStamp - day * days) / hour);
  const mins = Math.floor((timeStamp - day * days - hour * hours) / min);
  const secs = timeStamp - day * days - hour * hours - mins * min;

  return {
    days,
    hours,
    mins,
    secs,
  };
}

function getTimeZone() {
  // const timeZone = Moment.tz(Moment.tz.guess()).zoneAbbr();
  const timeZone = Moment.tz(Moment.tz.guess()).format("Z");
  const trimedTimeZone = timeZone?.split(":")[0].replaceAll("0", "");
  return `UTC${trimedTimeZone}`;
}

function getModalTimeleft(params: { currentEndTimeStamp: number }) {
  const { currentEndTimeStamp } = params;
  const { LOCKTOS_epochUnit } = constant;
  const now = getNowTimeStamp();
  const timeDiff = currentEndTimeStamp - now;
  //LOCKTOS_epochUnit = 604800
  const weeksLeft = timeDiff / LOCKTOS_epochUnit;
  const daysLeft = (timeDiff - Math.floor(weeksLeft) * 604800) / 86400;
  const timeLeft =
    timeDiff - Math.floor(weeksLeft) * 604800 - Math.floor(daysLeft) * 86400;

  const hours = getDuration(timeLeft, "HH:mm").hours;
  const mins = getDuration(timeLeft, "HH:mm").mins;
  const hour = hours.toString().length === 1 ? `0${hours}` : `${hours}`;
  const min = mins.toString().length === 1 ? `0${mins}` : `${mins}`;

  const leftWeeks = Math.floor(weeksLeft).toString();
  const leftDays = String(Math.floor(daysLeft));
  const leftHourAndMin = `${hour}:${min}`;

  return { leftWeeks, leftDays, leftHourAndMin };
}

export {
  convertTimeStamp,
  getNowTimeStamp,
  isTimeOver,
  getTimeLeft,
  getDuration,
  getTimeZone,
  getModalTimeleft,
};
