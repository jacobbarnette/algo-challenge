function CalculateDueDate(submitDate, turnAroundTime) {
  //define work hours
  const workStartTime = 9;
  const workEndTime = 17;

  //convert submitDate

  submitDate = new Date(submitDate);

  //check time on submitDate, if past 5 move to next day
  if (
    submitDate.getHours() < workStartTime ||
    submitDate.getHours() >= workEndTime
  ) {
    //adjsut submit date
    submitDate = GetNextWorkDay(submitDate);
    submitDate.setHours(workStartTime, 0, 0, 0, 0);
  }

  const dueDate = CalculateDueDateHelper(submitDate, turnAroundTime);
  return dueDate;

  function CalculateDueDateHelper(submitDate, turnAroundTime) {
    const workStartTime = 9;
    const workEndTime = 17;

    const currentTime = submitDate.getHours();
    const timeLeftInDay = workEndTime - currentTime;

    if (turnAroundTime <= timeLeftInDay) {
      //if time falls within workings hours, move date forward 2 days
      submitDate.setDate(submitDate.getDate() + 2);
      GetNextWorkDay(submitDate);
      return submitDate;
    } else {
      //time outside of working hours, adjust due date accordingly
      const remainingTime = turnAroundTime - timeLeftInDay;
      const nextDay = GetNextWorkDay(submitDate);
      nextDay.setHours(workStartTime, 0, 0, 0, 0);
      return CalculateDueDateHelper(nextDay, remainingTime);
    }
  }

  function GetNextWorkDay(date) {
    //if date.getDay() = Sat/Sun then move one day forward until monday
    while (date.getDay() === 0 || date.getDay() === 6) {
      date.setDate(date.getDate() + 1);
    }
    return date;
  }
}

const submitDate = "2023-05-19T14:20:20";
const turnAroundTime = 16; // 16 hours

const dueDate = CalculateDueDate(submitDate, turnAroundTime);
console.log(`Due Date: , ${dueDate}`);
module.exports = CalculateDueDate;
