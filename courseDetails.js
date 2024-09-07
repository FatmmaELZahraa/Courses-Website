document.addEventListener('DOMContentLoaded', function () {

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    const courses = getCoursesFromStorage();
    const course = courses.find(function(course) {
        return course.id === courseId;
    });

    if (course) {
        document.getElementById('courseName').textContent = course.name;
        document.getElementById('courseDescription').textContent = course.description;
        document.getElementById('coursePrice').textContent = `$${course.price}`;
        document.getElementById('coursePhoto').src = course.image;
        document.getElementById('coursePhoto').alt = `${course.name} Icon`;
        document.getElementById('courseInstructor').textContent = course.instructor; // Display instructor name
    } else {
        document.querySelector('.container').innerHTML = '<p>Course not found!</p>';
    }
});

function goToCheckout() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    const courses = getCoursesFromStorage();
    const course = courses.find(function(course) {
        return course.id === courseId;
    });

    const checkoutUrl = `Checkout.html?id=${courseId}`;
    window.location.href = checkoutUrl;
}

// Function to get courses from local storage
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
            instructor: parts[3] ,// New field
            description: parts[4],
            funFact: parts[5],
            price: parts[6]
        };
    });
}
