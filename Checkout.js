document.addEventListener('DOMContentLoaded', function () {

    // Get the course ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    
    // Get courses from local storage
    const courses = getCoursesFromStorage();
    
    // Find the course details based on the course ID
    const course = courses.find(function(course) {
        return course.id === courseId;
    });
    
    // Check if the course exists and populate the HTML elements with the course data 
    if (course) {
        document.getElementById('course-title').textContent = course.name;
        document.getElementById('course-instructor').textContent = course.instructor; // Display instructor name
        document.getElementById('course-image').src = course.image;
        document.getElementById('course-image').alt = `${course.name} Icon`;
        document.getElementById('course-price').textContent = `$${course.price}`;
        
        
    } else {
        // Display an error message if the course is not found
        document.querySelector('.checkout-container').innerHTML = '<p>Course not found!</p>';
    }
});

function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    var cardNumber = document.getElementById('card-number').value;
    var expiryDate = document.getElementById('expiry-date').value;
    var cvv = document.getElementById('cvv').value;
    var cardName = document.getElementById('name-on-card').value;

    if (cardNumber.length !== 16) {
        alert('Card number must be 16 digits.');
        return;
    }
    if (!expiryDate.match(/^\d{2}\/\d{2}$/)) {
        alert('Invalid expiry date format.');
        return;
    }
    if (cvv.length !== 3) {
        alert('CVV must be 3 digits.');
        return;
    }
    if (cardName.trim() === '') {
        alert('Name on card cannot be empty.');
        return;
    }

    alert('Payment successful!');

  // Wait for 3 seconds before redirecting to the home page
  setTimeout(function() {
    window.location.href = 'home.html'; // Correct the redirect URL if needed
}, 2000); // 3000 milliseconds = 3 seconds
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
            instructor: parts[3], // Add instructor field parsing
            description: parts[4],
            funFact: parts[5],
            price: parts[6] 
        };
    });
}
