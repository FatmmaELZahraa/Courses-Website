const contents = document.querySelectorAll('.content');
let index = 0;

function showDiv(i) {
    contents.forEach((div, idx) => {
        div.classList.toggle('active', idx === i);
    });
}

document.getElementById('prev2').addEventListener('click', () => {
    index = (index - 1 + contents.length) % contents.length;
    showDiv(index);
});

document.getElementById('next2').addEventListener('click', () => {
    index = (index + 1) % contents.length;
    showDiv(index);
});

function GoToLogout() {
    window.location.href = "Logout.html";
}
function GoToInstructorPage() {
    window.location.href = "ToBeInstructor.html";
}
function GoToHomePage() {
    window.location.href = "Home.html";
}
function GoToCoursesPage() {
    window.location.href = "Courses.html";
}