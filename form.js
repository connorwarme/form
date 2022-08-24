// form validation via js
console.log("working?");
//
const form = document.querySelector("form");
// email
const emailInput = form.children[0].children[1];
const emailError = emailInput.nextElementSibling;
console.log(emailError);
const showEmailError = () => {
    if (emailInput.validity.valueMissing) {
        emailError.textContent = "You need to enter an email address.";
    } else if (emailInput.validity.typeMismatch) {
        emailError.textContent = "Input needs to be a valid email address.";
    } else if (emailInput.validity.tooShort) {
        emailError.textContent = `Email must be at least ${emailInput.minLength} characters; you entered ${emailInput.value.length}.`;
    }
    emailError.className = "error active";
};
emailInput.addEventListener("input", () => {
    if (emailInput.validity.valid) {
        emailError.textContent = "";
        emailError.className = "error";
    } else {
        showEmailError();
    }
});
// country
const countryInput = form.children[1].children[1];
const countryError = countryInput.nextElementSibling;
const showCountryError = () => {
    if (countryInput.validity.valueMissing) {
        countryError.textContent = "You need to enter your country.";
    } else if (countryInput.validity.tooShort) {
        countryError.textContent = `Country must be at least ${countryInput.minLength} characters; you entered ${countryInput.value.length}.`;
    }
    countryError.className = "error active";
};
countryInput.addEventListener("input", () => {
    if (countryInput.validity.valid) {
        countryError.textContent = "";
        countryError.className = "error";
    } else {
        showCountryError();
    }
});
// zip code
const zipInput = form.children[2].children[1];
const zipError = zipInput.nextElementSibling;
const zipRegex = /^\d{5}(-\d{4})?$/;
const showZipError = () => {
    if (zipInput.validity.valueMissing) {
        zipError.textContent = "You need to enter your zipcode.";
    } else if (zipInput.validity.patternMismatch) {
        zipError.textContent = "Format as standard 5 digit US ZIP code or US ZIP + 4.";
    }
    zipError.className = "error active";
};
zipInput.addEventListener("input", () => {
    if (zipInput.validity.valid) {
        zipError.textContent = "";
        zipError.className = "error";
    } else {
        showZipError();
    }
});
// pw
const pwInput = form.children[3].children[1];
const pwError = pwInput.nextElementSibling;
const pwRegex =  /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;
const showPwError = () => {
    if (pwInput.validity.valueMissing) {
        pwError.textContent = "You must enter a password.";
    } else if (pwInput.validity.tooShort) {
        pwError.textContent = "Password must be as least 8 digits.";
    } else if (!pwRegex.test(pwInput.value)) {
        pwError.textContent = "Password needs at least: 1 UC, 1 lc, 1 #, 1 sym.";
        pwInput.classList.add("invalid");
    }
    pwError.className = "error active";
};
pwInput.addEventListener("input", () => {
    if (pwInput.validity.valid && pwRegex.test(pwInput.value)) {
        pwError.textContent = "";
        pwError.className = "error";
        pwInput.className = "valid";
    } else {
        showPwError();
    }
});
// pw conf
const pwconfInput = form.children[4].children[1];
const pwconfError = pwconfInput.nextElementSibling;
const checkPw = (i) => pwconfInput.value[i] === pwInput.value[i];
const pwLoopCheck = () => {
    let value = true;
    for (let i=0; i<pwconfInput.value.length; i +=1) {
        if (checkPw(i) === false) {
            value = false;
        }
    }
    if (pwconfInput.value.length !== pwInput.value.length) {
        value = false;
    }
    return value;
};

const showPwConfError = () => {
    if (pwconfInput.validity.valueMissing) {
        pwconfError.textContent = "Please confirm your password.";
    } else if (!pwLoopCheck()) {
        pwconfError.textContent = "Your passwords don't match!";
        pwconfInput.classList.add("invalid");
    }
    pwconfError.className = "error active";
};
pwconfInput.addEventListener("input", () => {
    if (pwconfInput.validity.valid && pwLoopCheck()) {
        pwconfError.textContent = "";
        pwconfError.className = "error";
        pwconfInput.className = "valid";
    } else {
        showPwConfError();
    }
});
//
form.addEventListener("submit", (e) => {
    let count = 0;
    if (!emailInput.validity.valid) {
        showEmailError();
        count += 1;
    }
    if (!countryInput.validity.valid) {
        showCountryError();
        count += 1;
    }
    if (!zipInput.validity.valid) {
        showZipError();
        count += 1;
    }
    if (!pwInput.validity.valid || !pwRegex.test(pwInput.value)) {
        showPwError();
        count += 1;
    }
    if (!pwconfInput.validity.valid || !pwLoopCheck()) {
        showPwConfError();
        count += 1;
    }
    if (count > 0) {
        // i.e. if any of the inputs weren't valid, prevent submit
        e.preventDefault();
        // reset count value for next time
        count = 0;
    } else {
        console.log("high five, it worked!");
        e.preventDefault();
    }
});