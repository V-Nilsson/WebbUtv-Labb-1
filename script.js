const jsonRequest = new Request("courses.json");

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

function showCart(array) {
    document.getElementById("showCart").innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const courseInCart = array[i];
        let innerHTML = `
            <div class="row">
            <p class="text-center">${courseInCart.courseTitle}</p>
            <button class="btn" onclick="removeFromCart(${courseInCart.courseNumber})"><i class="bi bi-trash"></i></button>
            </div>
        `;
        document.getElementById("showCart").innerHTML += innerHTML;
    }
} 
// Function to display top 3 courses
function displayPopularCourses(array) {
    for (let i = 0; i < 3; i++) {
        const course = array[i];
        let innerHTML = `
            <div class="col-lg-3 col-8">
            <div class="card border-2">
              <div class="card-body text-center py-4">
              <h4 class="card-title">
                ${course.courseTitle}
              </h4>
              <p class="lead card-subtitle">
                ${course.description}
              </p>
              <p class="card-text">
                 Betyg: ${course.rating} / 10
                </p>
                <button class="btn" onclick="addToCart(${course.courseNumber});showCart(cart)">Köp</button>
              </div>
            </div>
            `
        document.getElementById("popularCourses").innerHTML += innerHTML;
    }
};
// Function to show all available courses
function displayCards(array) {
    for (let i = 0; i < array.length; i++) {
        const course = array[i];
        let innerHTML = `
            <div class="card border-3">
            <div class="card-body text-center py-4" >
            <h4 id="${course.courseTitle}">${course.courseTitle}</h4>
            <p>${course.description}</p>
            <button class="btn mt-3" onclick="addToCart(${course.courseNumber});showCart(cart)">Köp</button>`;
        document.getElementById("courseTitle").innerHTML += innerHTML;
    }
}

// Get info from json file
fetch(jsonRequest)
    .then((response) => response.json())
    .then((data) => {
        for (let i = 0; i < data.length; i++) {
            const course = new Course(data[i]);
            courses.push(course);
        }
        courses.sort((a, b) => a.rating < b.rating);
        displayPopularCourses(courses);
        displayCards(courses)
    })
    .catch(console.error);

function addToCart(courseNumber) {
    let courseToAdd;
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].courseNumber == courseNumber ) {
            courseToAdd = courses[i];
        }
    }

    for (let i = 0; i < cart.length; i++) {
        if (courseToAdd.courseNumber == cart[i].courseNumber)
        {
            window.alert("Denna kursen finns redan i din kundvagn!");
            return;
        }
    }
    cart.push(courseToAdd);
}

function removeFromCart(courseNumber) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].courseNumber == courseNumber) {
            cart.splice(i, 1)
        }
    }
    showCart(cart);
}

function checkout() {
    cart.splice(0, cart.length);
    showCart(cart);
}

// Get data from modal inputs and create a new course
function addCourse() {
    let number = document.getElementById("modal-courseNumber").value
    let title = document.getElementById("modal-courseTitle").value
    let description = document.getElementById("modal-description").value
    let length = document.getElementById("modal-lengthInMinutes").value
    
    var correctInput = validateInput();
    if (!correctInput) {
        return;
    }
    const newCourse = {
        "courseNumber": number,
        "courseTitle": title,
        "description": description,
        "lengthInMinutes": length,
        "rating": null
    }
    const course = new Course(newCourse);
    courses.push(course);

    document.getElementById("modal-courseNumber").value = "";
    document.getElementById("modal-courseTitle").value = "";
    document.getElementById("modal-description").value = "";
    document.getElementById("modal-lengthInMinutes").value = "";

    displayCards(courses);
}

// Validate input to add course
function validateInput() {
    let number = document.getElementById("modal-courseNumber").value
    let title = document.getElementById("modal-courseTitle").value
    let description = document.getElementById("modal-description").value
    let length = document.getElementById("modal-lengthInMinutes").value

    // Courses cant have the same number
    for (let i = 0; i < courses.length; i++) {
        if (courses[i].courseNumber == number) {
            alert("En kurs med detta nummer finns redan, försök igen")
            return false;
        }
        
    }

    if (isNaN(number) || number == "") {
        alert("Felaktigt format på kursens nummer, försök igen");
        return false;
    }

    if (title == "" || description == "") {
        alert("Fyll i alla uppgifter");
        return false;
    }

    if (isNaN(length) || length == "" ) {
        alert("Längden saknas eller är i fel format, försök igen");
        return false;
    }
    
    return true;
}