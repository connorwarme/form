// form validation via js
console.log("working?");
//
const form = document.querySelector("form");
// email
const emailInput = form.children[1];
emailInput.addEventListener("input", () => {
    if (emailInput.validity.typeMismatch) {
        emailInput.setCustomValidity("Please enter a valid email address.");
        emailInput.reportValidity();
    } else {
        emailInput.setCustomValidity("");
    }
});
// country
const countryInput = form.children[3];
// zip code
const zipInput = form.children[5];
// pw
const pwInput = form.children[7];
const pwconfInput = form.children[9];