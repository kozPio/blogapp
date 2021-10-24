const convertDate = (date: string) => {
  let dateArray = date.split('T');

  dateArray[1] = dateArray[1].substring(0, 8);

  return dateArray;
};

export default convertDate;
