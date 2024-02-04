export const convertToFormatDateString = (dates?: string) => {
  // Split the date strings using ","
  const datesArray = dates?.split(",") ?? [];

  // Convert each date string to the desired format
  const formattedDates = datesArray.map((dateString) => {
    const [date, time] = dateString?.split(" ");
    const [month, day, year] = date.split("/");
    const [hour, minute, second] = time.split(":");

    // Create a new Date object using the extracted values
    const formattedDate = new Date(
      `${year}-${month}-${day}T${hour}:${minute}:${second}.000Z`,
    );

    // Return the formatted date string
    return formattedDate.toISOString();
  });
  return formattedDates;
};
