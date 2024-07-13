document.addEventListener("DOMContentLoaded", function() {
    // Parse query parameters to retrieve fname and lname
    const urlParams = new URLSearchParams(window.location.search);
    const fname = urlParams.get('fname');
    const lname = urlParams.get('lname');
    const email = urlParams.get('email');
    const gender = urlParams.get('gender');
    document.getElementById("jscheck").innerHTML = `<br>`;
    if (fname && lname && email && gender) {
        let name_ = fname + ' ' + lname;
        console.log(name_);

        // Accessing name_ inside the DOMContentLoaded event listener
        console.log(`Name: ${name_}`);

        // This line might throw an error if the element with id "name" doesn't exist yet
        let nameElement = document.getElementById("name");
        if (nameElement) {
            nameElement.textContent = name_;
        } else {
            console.error("Element with id 'name' not found.");
        }
        document.getElementById("emailt").textContent = `Email : ${email}`
        document.getElementById("gendert").textContent = `Gender : ${gender}`
    } 
    else {
        console.error("First name, last name, email, gender not found in query parameters.");
    }
});
