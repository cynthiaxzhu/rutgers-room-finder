function formatTime(time) {
  time = time.replace(":", "");
  return parseInt(time);
}

export function getStartTimeInt() {
  let start = document.getElementById("start").value;
  if (start === "") start = "00:00";
  start = formatTime(start);
  return start;
}

export function getEndTimeInt() {
  let end = document.getElementById("end").value;
  if (end === "") end = "23:59";
  end = formatTime(end);
  return end;
}

export function isValidTimeRange() {
  return getStartTimeInt() < getEndTimeInt();
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}
