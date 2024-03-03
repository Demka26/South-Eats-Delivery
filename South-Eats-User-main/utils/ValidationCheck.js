// checks if the email is valid
function isValidEmail(value) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
    if (value == "") {
        setEmailError("")
    }
    else if (isValidEmail(value)) {
        setEmailError("")
    }
    else {
        setEmailError("Invalid Email")
    }
}
// checks if the password is 9 characters
function validatePassword(value, setPasswordError) {
    if (value.length < 10) {
        setPasswordError("Password must be 9 characters")
    } else {
        setPasswordError("")
    }
}
// checks if the input is at least ___ length - which we decide later in the code
function validateInput(value, minLength, setError) {
    if (value.length < minLength) {
        setError("Invalid Input")
    } else {
            setError("")
        }
           
   
}


const validationCheck = {
    isValidEmail,
    validateEmail,
    validatePassword,
    validateInput
};


export default validationCheck;