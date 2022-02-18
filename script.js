const jsonRequest = new Request("../courses.json");

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
// function populateCourses(array) {
//     for (let i = 0; i < array.length; i++) {
//         const course = array[i];
//         let innerHTML = `<li>${course.courseNumber} <br>
//             ${course.courseTitle} </li>`;
//         document.getElementById("courses").innerHTML += innerHTML;
//     }
// }
// Function to show all available courses
// Behöver jag tömma något för att det ska bli rätt när efter att en kurs har lagts till??
function displayCards(array) {
    for (let i = 0; i < array.length; i++) {
        const course = array[i];
        let innerHTML = `
            <div class="card border-3">
            <div class="card-body text-center py-4" >
            <h4 id="${course.courseTitle}">${course.courseTitle}</h4>
            <p>${course.description}</p>
            <button href="#" class="btn btn-outline-primary mt-3">Köp</button>`;
        document.getElementById("courseTitle").innerHTML += innerHTML;
    }
}

function showCart(array) {
    document.getElementById("showCart").innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const courseInCart = array[i];
        let innerHTML = `
            <p>${courseInCart.courseTitle}</p>
            <button class="btn" onclick="removeFromCart()"><i class="bi bi-trash"></i></button>
        `;
        document.getElementById("showCart").innerHTML += innerHTML;
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
        displayCards(courses)
    })
    .catch(console.error);

    // ta in en parameter??
function addToCart() {
    // let courseToAdd;
    // for (let i = 0; i < courses.length; i++) {
    //     if (courses[i].courseTitle == ) {
    //         courseToAdd = courses[i];
    //     }
    // }
    cart.push(courses[1]);
}
// document.getElementById("uniquecourseTitle").id

function removeFromCart() {
    
}

function checkout() {
    cart.splice(0, cart.length);
    showCart(cart);
}

//Sort courses on ratings
courses.sort((a, b) => a.rating - b.rating);


// Temporary test of sorting arrays
const students = [
  { name: "Alex",   grade: 15 },
  { name: "Devlin", grade: 15 },
  { name: "Eagle",  grade: 13 },
  { name: "Sam",    grade: 14 },
];

students.sort((firstItem, secondItem) => secondItem.grade - firstItem.grade);