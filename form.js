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
    console.log(zipRegex.test(zipInput.value));
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
const pwInput = form.children[7];
const pwconfInput = form.children[9];
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
    if (count > 0) {
        // i.e. if any of the inputs weren't valid, prevent submit
        e.preventDefault();
        // reset count value for next time
        count = 0;
    }

});