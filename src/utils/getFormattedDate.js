export function getFormattedDate(date) {
  let dateObj = new Date(date);
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let hours = dateObj.getUTCHours();
  let minutes = dateObj.getUTCMinutes();
  let seconds = dateObj.getUTCSeconds();

  var newdate = hours + ":" + minutes + " - " + day + "/" + month + "/" + year;
  return newdate;
}
