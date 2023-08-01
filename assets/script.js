// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  const firstHour = 0;
  const lastHour = 17;
  
  function displayCurrentDate() {
    const currentDateElement = document.getElementById("currentDay");
    const currentDate = dayjs().format("dddd, MMMM D, YYYY,");
    currentDateElement.textContent = currentDate;
  }

  function updateTime() {
    const currentTimeElement = document.getElementById("currentTime");
    const currentTime = dayjs().format("HH:mm:ss");
    currentTimeElement.textContent = ("Current Time (MST): " + currentTime);
  }

  function currentTimeBlockColor() {
    const currentHour = dayjs().hour();

    $(".time-block").each(function () {
      const timeBlockHour = parseInt($(this).attr("id").split("-")[1]);

      if (timeBlockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (timeBlockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }
  
  function saveData() {
    $(".time-block").each(function () {
      const timeBlockId = $(this).attr("id");
      const description = $(this).find(".description").val();
      localStorage.setItem(timeBlockId, description);
      $(".saveBtn").on("click", function () {
        saveData();
      });
    });
  }

  function retainData() {
    $(".time-block").each(function () {
      const timeBlockId = $(this).attr("id");
      const savedText = localStorage.getItem(timeBlockId);
      if (savedText) {
        $(this).find(".description").val(savedDescription);
      }
    });
  }

  retainData();
  saveData();
  displayCurrentDate();
  updateTime();
  setInterval(updateTime, 1000);
  currentTimeBlockColor();
});
