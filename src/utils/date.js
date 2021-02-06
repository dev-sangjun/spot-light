export const getDayFromDate = date => ({
  day: date.getDate(),
  month: date.getMonth() + 1,
  year: date.getFullYear(),
});

export const getDayOffset = (day1, day2) => {
  const date1 = getDateFromDay(day1);
  const date2 = getDateFromDay(day2);
  return getDateOffset(date1, date2);
};

export const getDateFromOffset = (date, offset) => {
  const date_ = new Date();
  date.setDate(date_.getDate() + offset);
  return date;
};

export const getDateOffset = (date1, date2) => {
  return Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
};

export const getDateFromDay = day => {
  const date = new Date(`${day.year}-${day.month}-${day.day + 1}`);
  return date;
};

export const getStringFromDay = day => {
  return `${day.month}.${day.day}.${day.year}`;
};
