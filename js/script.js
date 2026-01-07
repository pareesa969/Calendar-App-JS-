const monthYear = document.getElementById("monthYear");
const calendarDays = document.getElementById("calendarDays");
const selectedDate = document.getElementById("selectedDate");

const prevMonth = document.getElementById("prevMonth");
const nextMonth = document.getElementById("nextMonth");
const themeToggle = document.getElementById("themeToggle");
const weekdayEls = document.querySelectorAll("#weekdays div");

let currentDate = new Date();


const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

function highlightWeekday(index) {
  weekdayEls.forEach(el => el.classList.remove("active"));
  weekdayEls[index].classList.add("active");
}


function renderCalendar() {
  calendarDays.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  monthYear.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  // Empty slots
  for (let i = 0; i < firstDay; i++) {
    calendarDays.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= lastDate; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;

    const today = new Date();
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
      highlightWeekday(today.getDay());
    }

    dayDiv.addEventListener("click", () => {
      const clickedDate = new Date(year, month, day);
      const dayName = clickedDate.toLocaleString("default", { weekday: "long" });

      selectedDate.textContent =
        `${dayName}, ${day} ${monthYear.textContent}`;

      highlightWeekday(clickedDate.getDay());
    });

    calendarDays.appendChild(dayDiv);
  }
}

prevMonth.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
};

nextMonth.onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
};

renderCalendar();
