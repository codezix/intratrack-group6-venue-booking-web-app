$(document).ready(() => {
  timePickerInit();

  const date = $("#selectDate");
  const timeStart = $(".timepicker-start");
  const timeEnd = $(".timepicker-end");

  timeStart.timepicker({});
  timeEnd.timepicker({});

  date.datepicker({
    language: "en",
    minDate: new Date(),
    dateFormat: "dd-mm-yyyy"
  });

  const timePickerInit = $(".timepicker").timepicker({
    timeFormat: "HH:mm ",
    interval: 60,
    minTime: "12:00am",
    maxTime: "11:00 pm",
    defaultTime: "6",
    dynamic: false,
    dropdown: true,
    scrollbar: true
  });
});
