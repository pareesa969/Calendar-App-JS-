const monthYear = document.getElementById('monthYear');
const calendarDays = document.getElementById('calendarDays');
const selectedDate = document.getElementById('selectedDate');

const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

let currentDate = new Date();

const renderCalendar = () => {
    calendarDays.innerHTML = '';

    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const firstDay = new Date(year, month, 1).getDate();
    const lastDay = new Date(year, month + 1, 0).getDate();

    monthYear.textContent = currentDate.toLocaleString("default", {
        month: 'long',
        year: 'numeric'
    });

    for (let i = 0; i < firstDay; i++){
        calendarDays.appendChild(document.createElement('div'));
    }

    for (let day = 1; day <= lastDay; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.textContent = day;

        const today = new Date();
        if(
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
        ) {
            dayDiv.classList.add('today');
        }
        
        dayDiv.addEventListener('click', () => {
            const clickedDate = new Date(year, month, day);
            const dayName = clickedDate.toLocaleString("default", { weekday: 'long' });
            selectedDate.textContent = `${dayName}, ${day} ${monthYear.textContent}`;
        });
        calendarDays.appendChild(dayDiv);
    }

};

prevMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

nextMonth.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

renderCalendar();