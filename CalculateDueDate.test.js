const CalculateDueDate = require("./CalculateDueDate");

test("due date is correctly calculated when provided submitDate and turnAroundTime", () => {
  const submitDate = "2023-05-19T14:20:20";
  const turnAroundTime = 16; // 16 hours
  const expectedDueDate = new Date("2023-05-22T09:00:00");
  const calculatedDueDate = CalculateDueDate(submitDate, turnAroundTime);
  expect(calculatedDueDate).toEqual(expectedDueDate);
});
