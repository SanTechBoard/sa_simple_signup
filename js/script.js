document.addEventListener("DOMContentLoaded", function() {
    let fname, lname, email, gender;

    let sub = document.getElementById("sub");
    let passcheck = document.getElementById("passcheck");
    let checkp = document.getElementById("checkp");

    document.getElementById("jscheck").innerHTML = '<br>';

    // Add event listeners to clear error messages when typing into input fields
    document.getElementById("fname").addEventListener("input", function() {
        document.getElementById("fnamep").textContent = '';
    });
    document.getElementById("lname").addEventListener("input", function() {
        document.getElementById("lnamep").textContent = '';
    });
    document.getElementById("email").addEventListener("input", function() {
        document.getElementById("emailp").textContent = '';
    });
    document.getElementById("pass").addEventListener("input", function() {
        document.getElementById("passp").textContent = '';
    });
    document.getElementById("cpass").addEventListener("input", function() {
        document.getElementById("cpassp").textContent = '';
    });
    document.getElementById("check").addEventListener("input", function() {
        document.getElementById("checkp").textContent = '';
    });

    let genderInputs = document.querySelectorAll('input[name="gender"]');
    genderInputs.forEach(function(input) {
        input.addEventListener("change", function() {
            document.getElementById("genderp").textContent = '';
        });
    });

    sub.onclick = async function() {
        fname = document.getElementById("fname").value;
        lname = document.getElementById("lname").value;
        email = document.getElementById("email").value;
        let pass = document.getElementById("pass").value;
        let cpass = document.getElementById("cpass").value;
        let male = document.getElementById("male").checked;
        let female = document.getElementById("female").checked;
        let other = document.getElementById("other").checked;
        let pnts = document.getElementById("pnts").checked;
        let check = document.getElementById("check").checked;

        passcheck.textContent = '';
        checkp.textContent = '';
        if (fname && lname && email && pass && cpass && check) {
            if (pass === cpass) {
                if (male) {
                    gender = "Male";
                } else if (female) {
                    gender = "Female";
                } else if (other) {
                    gender = "Other";
                } else if (pnts) {
                    gender = "Prefer not to say";
                } else {
                    gender = "Undefined";
                }
                const userData = {
                    firstName: fname,
                    lastName: lname,
                    email: email,
                    password: pass,
                    gender: gender,
                };

                try {
                    const response = await postData(userData);
                    console.log('Data sent to server:', response);
                    
                    // Redirect to logged.html with query parameters after successful response
                    setTimeout(() => {
                        window.location.href = `logged.html?fname=${encodeURIComponent(fname)}&lname=${encodeURIComponent(lname)}&gender=${encodeURIComponent(gender)}&email=${encodeURIComponent(email)}`;
                    }, 2000);
                } catch (error) {
                    console.error('Error sending data to server:', error);
                    alert('Error signing up. Please try again later.');
                }
                //hi test
            } else {
                passcheck.textContent = '* Passwords don\'t match';
            }
        } else {
            if (!fname) {
                document.getElementById("fnamep").textContent = 'First Name is required';
            }
            if (!lname) {
                document.getElementById("lnamep").textContent = 'Last Name is required';
            }
            if (!email) {
                document.getElementById("emailp").textContent = 'Email is required';
            }
            if (!pass) {
                document.getElementById("passp").textContent = 'Password is required';
            }
            if (!cpass) {
                document.getElementById("cpassp").textContent = 'Confirm Password is required';
            }
            if (!check) {
                document.getElementById("checkp").textContent = 'Checkbox is required';
            }
            if (!male && !female && !other && !pnts) {
                document.getElementById("genderp").textContent = 'Gender is required';
            }
        }
    };

    async function postData(userData) {
        try {
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error sending data to server:', error);
            throw error; // Rethrow error to be caught elsewhere if needed
        }
    }
});
