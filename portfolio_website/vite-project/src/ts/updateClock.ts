function updateClock() {
  const now = new Date();
  const formatted = now.toLocaleDateString() + " " + now.toLocaleTimeString();
  const clock = document.getElementById("time") as HTMLTimeElement;
  if (clock != null) {
    clock.textContent = formatted;
    clock.dateTime = formatted;
  }
}

updateClock();
setInterval(updateClock, 1000);
