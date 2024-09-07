function showForm() {
    document.getElementById("registrationForm").style.display = "block";
    document.getElementById("startButton").style.display = "none";
}

document.getElementById("startButton").onclick = showForm;


document.getElementById("submitBtn").onclick = function () {
    var name = document.getElementById("name").value.trim();
    var course = document.getElementById("course").value.trim();
    var email = document.getElementById("email").value.trim();
    var phone = document.getElementById("phone").value.trim();


    if (!name || !course || !email || !phone) {
        alert("Please fill in all fields before submitting.");
        return;
    }

    alert("We will send you a message!");
    document.getElementById("registrationForm").style.display = "none";
};
function GoToLogout() {
    window.location.href = "Logout.html";
}
function GoToHomePage() {
    window.location.href = "Home.html";
}
function GoToCoursesPage() {
    window.location.href = "Courses.html";
}

