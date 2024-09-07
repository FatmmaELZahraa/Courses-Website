document.addEventListener('DOMContentLoaded', function () {
    loadCourses();
});

// Function to add or update a course
function addOrUpdateCourse() {
    var courseId = document.getElementById('course-id').value;
    var courseName = document.getElementById('course-name').value;
    var courseImage = document.getElementById('course-image').value;
    var courseInstructor = document.getElementById('course-instructor').value; // New field
    var courseDescription = document.getElementById('course-description').value;
    var courseFunFact = document.getElementById('course-fun-fact').value;
    var coursePrice = document.getElementById('course-price').value;


    if (!courseName || !courseImage || !courseInstructor || !courseDescription || !courseFunFact || !coursePrice) {
        alert('Please fill in all fields');
        return;
    }

    var courses = getCoursesFromStorage();
    var courseExists = false;

    if (courseId) {
        // Update existing course
        courses = courses.map(function (course) {
            if (course.id === courseId) {
                return {
                    id: courseId,
                    name: courseName,
                    image: courseImage,
                    instructor: courseInstructor, // New field
                    description: courseDescription,
                    funFact: courseFunFact,
                    price: coursePrice,

                };
                courseExists = true;
            }
            return course;
        });
    } else {
        // Add new course
        var newCourse = {
            id: 'course' + Date.now(),
            name: courseName,
            image: courseImage,
            instructor: courseInstructor,// New field
            description: courseDescription,
            funFact: courseFunFact,
            price: coursePrice,

        };
        courses.push(newCourse);
    }

    saveCoursesToStorage(courses);
    loadCourses();
    clearForm();
}


// Update the loadCourses function to display the instructor name
function loadCourses() {
    var courses = getCoursesFromStorage();
    var coursesList = document.getElementById('courses-list');

    coursesList.innerHTML = '';

    courses.forEach(function (course) {
        var courseDiv = document.createElement('div');
        courseDiv.className = 'course';
        courseDiv.id = course.id;
        courseDiv.innerHTML = `
            <img src="${course.image}" alt="${course.name} Icon">
            <div>
                <h2>${course.name}</h2>
                <p class="description" style="display: none;">${course.description}</p>
                <p class="instructor" style="display: none;">Instructor: ${course.instructor}</p>
                <div class="price" style="display: none;">$${course.price}</div>
                <button onclick="showFunFact('${course.id}', '${course.funFact}')">Go to the Course</button>
                <button onclick="editCourse('${course.id}')">Edit</button>
                <button onclick="deleteCourse('${course.id}')">Delete</button>
                <div class="fun-fact"></div>
            </div>
        `;
        coursesList.appendChild(courseDiv);
    });
}

// Function to delete a course
function deleteCourse(courseId) {
    var courses = getCoursesFromStorage();
    courses = courses.filter(function (course) {
        return course.id !== courseId;
    });
    saveCoursesToStorage(courses);
    loadCourses();
}

// Update editCourse function to load instructor name
function editCourse(courseId) {
    var courses = getCoursesFromStorage();
    var course = courses.find(function (course) {
        return course.id === courseId;
    });

    if (course) {
        document.getElementById('course-id').value = course.id;
        document.getElementById('course-name').value = course.name;
        document.getElementById('course-image').value = course.image;
        document.getElementById('course-instructor').value = course.instructor; // New field
        document.getElementById('course-description').value = course.description;
        document.getElementById('course-fun-fact').value = course.funFact;
        document.getElementById('course-price').value = course.price;

    }
}

// Function to clear the form
function clearForm() {
    document.getElementById('course-id').value = '';
    document.getElementById('course-name').value = '';
    document.getElementById('course-image').value = '';
    document.getElementById('course-instructor').value = '';
    document.getElementById('course-description').value = '';
    document.getElementById('course-fun-fact').value = '';
    document.getElementById('course-price').value = '';
}

// Function to get courses from local storage
function getCoursesFromStorage() {
    var courses = localStorage.getItem('courses');
    return courses ? parseCourses(courses) : [];
}

// Function to save courses to local storage
function saveCoursesToStorage(courses) {
    localStorage.setItem('courses', stringifyCourses(courses));
}

// Update stringifyCourses and parseCourses functions to include instructor

// Convert courses to string format
function stringifyCourses(courses) {
    return courses.map(function (course) {
        return `${course.id}|${course.name}|${course.image}|${course.instructor}|${course.description}|${course.funFact}|${course.price}`;
    }).join(';');
}

// Convert string format to courses
function parseCourses(coursesStr) {
    return coursesStr.split(';').map(function (courseStr) {
        var parts = courseStr.split('|');
        return {
            id: parts[0],
            name: parts[1],
            image: parts[2],
            instructor: parts[3],// New field
            description: parts[4],
            funFact: parts[5],
            price: parts[6]

        };
    });
}

// Function to show fun fact
function showFunFact(courseId, fact) {
    var courseElement = document.getElementById(courseId);
    var factElement = courseElement.querySelector('.fun-fact');
    factElement.textContent = fact;
    factElement.classList.add('show-fact');

    setTimeout(function () {
        factElement.classList.remove('show-fact');
        goToCourse(courseId);
    }, 2000);
}
function goToCourse(courseId) {
    // Redirect to the single course page with the courseId as a query parameter
    var courseUrl = `CourseDetails.html?id=${courseId}`;
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