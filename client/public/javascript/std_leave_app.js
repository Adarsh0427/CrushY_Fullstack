

document.getElementById("postCommentBtn").addEventListener("click", saveData);

function saveData() {
  // Prevent potential default behavior

  const startDate = document.getElementById("startdate").value;
  const endDate = document.getElementById("enddate").value;

  const leaveType = document.getElementById("leave_type").value;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffInTime = end.getTime() - start.getTime();
  let diffInDays = diffInTime / (1000 * 3600 * 24);
  const totalDays = diffInDays + 1;

  // Gather other form data
  const reason = document.getElementById("reason-for-leave").value;
  // ... (Add code to gather startDate and endDate based on Flowbite datepicker)

  // Package data
  const leaveRequestData = {
    // ... (other fields like startDate, endDate)
    startDate: startDate,
    endDate: endDate,
    leaveType: leaveType,
    totalDays: totalDays,
    reason: reason,
  };
  console.log(leaveRequestData);
}

function calculateDays() {
  const startDate = document.getElementById("startdate").value;
  const endDate = document.getElementById("enddate").value;

  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffInTime = end.getTime() - start.getTime();
  let diffInDays = diffInTime / (1000 * 3600 * 24);

  if (isNaN(diffInDays) || diffInDays < 0) {
    diffInDays = -1;
  }
  document.getElementById("no_days").innerText = diffInDays + 1;
  const total_days_aval = document.getElementById(
    "Total_Available_days"
  ).innerText;
  document.getElementById("remaining_days").innerHTML =
    total_days_aval - diffInDays - 1;
}

document.getElementById("startdate").addEventListener("change", calculateDays);
document.getElementById("enddate").addEventListener("change", calculateDays);
