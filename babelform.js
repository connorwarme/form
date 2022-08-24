"use strict";

// form validation via js
console.log("working?"); //

var form = document.querySelector("form"); // email
// throws errors for:
// - missing value (empty input field)
// - wrong type (basically, needs @ included)
// - minlength (min 8 characters)

var emailInput = form.children[0].children[1];
var emailError = emailInput.nextElementSibling;
console.log(emailError);

var showEmailError = function showEmailError() {
  if (emailInput.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (emailInput.validity.typeMismatch) {
    emailError.textContent = "Input needs to be a valid email address.";
  } else if (emailInput.validity.tooShort) {
    emailError.textContent = "Email must be at least ".concat(emailInput.minLength, " characters; you entered ").concat(emailInput.value.length, ".");
  }

  emailError.className = "error active";
};

emailInput.addEventListener("input", function () {
  if (emailInput.validity.valid) {
    emailError.textContent = "";
    emailError.className = "error";
  } else {
    showEmailError();
  }
}); // country
// throws errors for:
// - missing value (empty input field)
// - minlength (min 3 characters)

var countryInput = form.children[1].children[1];
var countryError = countryInput.nextElementSibling;

var showCountryError = function showCountryError() {
  if (countryInput.validity.valueMissing) {
    countryError.textContent = "You need to enter your country.";
  } else if (countryInput.validity.tooShort) {
    countryError.textContent = "Country must be at least ".concat(countryInput.minLength, " characters; you entered ").concat(countryInput.value.length, ".");
  }

  countryError.className = "error active";
};

countryInput.addEventListener("input", function () {
  if (countryInput.validity.valid) {
    countryError.textContent = "";
    countryError.className = "error";
  } else {
    showCountryError();
  }
}); // zip code
// throws errors for:
// - missing value (empty input field)
// - doesn't match pattern (5 digit zip, or 5 + 4)

var zipInput = form.children[2].children[1];
var zipError = zipInput.nextElementSibling; // implemented regex as a pattern in the html

var zipRegex = /^\d{5}(-\d{4})?$/;

var showZipError = function showZipError() {
  if (zipInput.validity.valueMissing) {
    zipError.textContent = "You need to enter your zipcode.";
  } else if (zipInput.validity.patternMismatch) {
    zipError.textContent = "Format as standard 5 digit US ZIP code or US ZIP + 4.";
  }

  zipError.className = "error active";
};

zipInput.addEventListener("input", function () {
  if (zipInput.validity.valid) {
    zipError.textContent = "";
    zipError.className = "error";
  } else {
    showZipError();
  }
}); // pw
// throws errors for:
// - missing value (empty input field)
// - minlength (min 8 characters)
// - failing strength test (needs 1 uppercase, 1 lowercase, 1 number, 1 symbol, minimum)

var pwInput = form.children[3].children[1];
var pwError = pwInput.nextElementSibling;
var pwRegex = /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/;

var showPwError = function showPwError() {
  if (pwInput.validity.valueMissing) {
    pwError.textContent = "You must enter a password.";
  } else if (pwInput.validity.tooShort) {
    pwError.textContent = "Password must be as least 8 digits.";
  } else if (!pwRegex.test(pwInput.value)) {
    // had to add a class, to get the styling to match the validity ":invalid" pseudoclass
    pwError.textContent = "Password needs at least: 1 UC, 1 lc, 1 #, 1 sym.";
    pwInput.classList.add("invalid");
  }

  pwError.className = "error active";
};

pwInput.addEventListener("input", function () {
  if (pwInput.validity.valid && pwRegex.test(pwInput.value)) {
    pwError.textContent = "";
    pwError.className = "error";
    pwInput.className = "valid";
  } else {
    showPwError();
  }
}); // password confirmation
// throws errors for:
// - missing value (empty input field)
// - not matching pw.value

var pwconfInput = form.children[4].children[1];
var pwconfError = pwconfInput.nextElementSibling;

var checkPw = function checkPw(i) {
  return pwconfInput.value[i] === pwInput.value[i];
}; // loop through pwConf.value and see if it matches pw.value


var pwLoopCheck = function pwLoopCheck() {
  var value = true;

  for (var i = 0; i < pwconfInput.value.length; i += 1) {
    if (checkPw(i) === false) {
      value = false;
    }
  }

  if (pwconfInput.value.length !== pwInput.value.length) {
    value = false;
  }

  return value;
};

var showPwConfError = function showPwConfError() {
  if (pwconfInput.validity.valueMissing) {
    pwconfError.textContent = "Please confirm your password.";
  } else if (!pwLoopCheck()) {
    pwconfError.textContent = "Your passwords don't match!";
    pwconfInput.classList.add("invalid");
  }

  pwconfError.className = "error active";
};

pwconfInput.addEventListener("input", function () {
  if (pwconfInput.validity.valid && pwLoopCheck()) {
    pwconfError.textContent = "";
    pwconfError.className = "error";
    pwconfInput.className = "valid";
  } else {
    showPwConfError();
  }
}); //

form.addEventListener("submit", function (e) {
  var count = 0;

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
    e.preventDefault(); // reset count value for next time

    count = 0;
  } else {
    console.log("high five, it worked!");
    e.preventDefault();
  }
});
