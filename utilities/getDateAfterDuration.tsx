export default function getDateAfter(
  startDate: string,
  addedDurationsInMin: number,
) {
  const sDate = new Date(startDate);
  const MS_IN_MIN = 1000 * 60;
  const durationInMs = MS_IN_MIN * addedDurationsInMin;
  const fDate = new Date(sDate.getTime() + durationInMs);
  return fDate;
}
