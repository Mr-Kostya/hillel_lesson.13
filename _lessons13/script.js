const form = document.getElementById("contactForm");
const table = document.getElementById("table");

const keys = ["name", "surname", "phone"];

const tableRaw = ({ name, surname, phone }) => `
    <td>${name.value}</td>
    <td>${surname.value}</td>
    <td>${phone.value}</td>
`;

const notEmpty = (name, value) => {
    if (!value) {
        alert(`${name} is Required`);
        return false;
    }

    return true;
};

const isNumber = (name, value) => {
    if (!parseInt(value, 10)) {
        alert(`${name} should be the number`);
        return false;
    }

    return true;
};

const formValidation = {
    name: notEmpty,
    surname: notEmpty,
    phone: (name, value) => notEmpty(name, value) && isNumber(name, value)
};

const isFormValid = (form) => keys.every((key) => !!form[key].valid);

function submittingForm(event) {
    event.preventDefault();

    const formInputs = event.target.elements;

    const data = keys.reduce((acc, key) => {
        const input = formInputs[key];

        acc = {
            ...acc,
            [key]: {
                value: input.value,
                valid: formValidation[key](input.name, input.value)
            }
        };
        input.value = "";
        return acc;
    }, {});

    if (!isFormValid(data)) {
        return;
    }

    const newRow = document.createElement("tr");
    newRow.innerHTML = tableRaw(data);
    table.appendChild(newRow);
}

form.addEventListener("submit", submittingForm);