const convertDate = (date: string) => {
  //let dateArray = date.split('T');
  let convertedDate = new Date(date);
  let newDate = new Date();
  let final = newDate.getTime() - convertedDate.getTime();

  let seconds = final / 1000;

  if (seconds < 60) {
    return 'just now';
  } else {
    let minutes = Math.round(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else {
      let hours = Math.round(minutes / 60);
      if (hours < 24) {
        return `${hours} hours ago`;
      } else {
        let days = Math.floor(hours / 24);
        return `${days} days ago`;
      }
    }
  }
};

export default convertDate;
