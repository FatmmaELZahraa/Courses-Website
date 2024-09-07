document.addEventListener('DOMContentLoaded', function () {
    loadCourses();
});

function loadCourses() {
    var courses = getCoursesFromStorage();
    var coursesContainer = document.getElementById('coursesContainer');
    coursesContainer.innerHTML = '';

    courses.forEach(function (course) {
        var courseDiv = document.createElement('div');
        courseDiv.className = 'course';
        courseDiv.id = course.id;
        courseDiv.innerHTML = `
            <img src="${course.image}" alt="${course.name} Icon">
            <div>
                <h2>${course.name}</h2>
                <p>Instructor: ${course.instructor}</p>
                <p>$${course.price}</p>
                <button onclick="showFunFact('${course.id}', '${course.funFact}')">Go to the Course</button>
            </div>
        `;
        coursesContainer.appendChild(courseDiv);
    });
}

function getCoursesFromStorage() {
    var courses = localStorage.getItem('courses');
    return courses ? parseCourses(courses) : [];
}

// Convert string format to courses
function parseCourses(coursesStr) {
    return coursesStr.split(';').map(function (courseStr) {
        var parts = courseStr.split('|');
        return {
            id: parts[0],
            name: parts[1],
            image: parts[2],
            instructor: parts[3],
            description: parts[4],
            funFact: parts[5],
            price: parts[6]
        };
    });
}

function showFunFact(courseId, fact) {
    var courseElement = document.getElementById(courseId);
    var factElement = document.createElement('p');
    factElement.className = 'fun-fact';
    factElement.textContent = fact;
    courseElement.appendChild(factElement);

    setTimeout(function () {
        factElement.remove();
        goToCourse(courseId);
    }, 2000);
}

function goToCourse(courseId) {
    // Redirect to the single course page with the courseId as a query parameter
    var courseUrl = ` CourseDetails.html?id=${courseId}`;
    window.location.href = courseUrl;
}

function GoToLogout() {
    window.location.href = "Logout.html";
}
function GoToHomePage() {
    window.location.href = "Home.html";
}
function GoToCoursesPage() {
    window.location.href = "Courses.html";
}
