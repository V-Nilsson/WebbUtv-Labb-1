const jsonRequest = new Request("/js/courses.json");

const courses = [];

const cart = [];

class Course{
    constructor(input) {
        this.courseNumber = input.courseNumber;
        this.courseTitle = input.courseTitle;
        this.description = input.description;
        this.lengthInMinutes = input.lengthInMinutes;
        this.rating = input.rating
    }
}

// Function to display courses on page
function populateCourses(array) {
    for (let i = 0; i < array.length; i++) {
        const course = array[i];
        let innerHTML = `<li>${course.courseNumber} <br>
            ${course.courseTitle} </li>`;
        document.getElementById("courses").innerHTML += innerHTML;
    }
}
// Function to show all available courses
function displayCards(array) {
    for (let i = 0; i < array.length; i++) {
        const course = array[i];
        let innerHTML = `
            <div class="card border-3">
            <div class="card-body text-center py-4" >
            <h4>${course.courseTitle}</h4>
            <p>${course.description}</p>
            <a href="#" class="btn btn-outline-primary mt-3">Köp</a>`;
        document.getElementById("courseTitle").innerHTML += innerHTML;
    }
}

// Function to display top 3 courses
// function displayPopularCourses(array) {
//     array.
// }

// Get info from json file
fetch(jsonRequest)
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const course = new Course(data[i]);
            courses.push(course);
        }
        // populateCourses(courses)
        displayCards(courses)
    })
    .catch(console.error);

// function addToCart() {
    
// }

courses.sort((a, b) => a.courseNumber - b.courseNumber);

const students = [
  { name: "Alex",   grade: 15 },
  { name: "Devlin", grade: 15 },
  { name: "Eagle",  grade: 13 },
  { name: "Sam",    grade: 14 },
];

students.sort((firstItem, secondItem) => secondItem.grade - firstItem.grade);