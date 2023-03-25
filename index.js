const selectCurrency = document.querySelectorAll(".currency");
const convertCurrency = document.getElementById("convertBtn");
const inputAmount = document.getElementById("amount");
const outputAmount = document.getElementById("output");

fetch("https://api.frankfurter.app/currencies")
    .then((data) => data.json())
    .then((data) => {
        display(data);
    });

function display(data) {
    const entries = Object.entries(data);
    for (var i = 0; i < entries.length; i++) {
        selectCurrency[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        selectCurrency[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
    }
}

convertCurrency.addEventListener("click", () => {
    let inputCurrency = selectCurrency[0].value;
    let outputCurrency = selectCurrency[1].value;
    let value = inputAmount.value;

    if (inputCurrency != outputCurrency) {
        convert(inputCurrency, outputCurrency, value);
    } else {
        alert("Choose Different Currencies");
    }
});

function convert(inputCurrency, outputCurrency, value) {
    const host = "api.frankfurter.app";
    fetch(`https://${host}/latest?amount=${value}&from=${inputCurrency}&to=${outputCurrency}`)
        .then((val) => val.json())
        .then((val) => {
            console.log(Object.values(val.rates)[0]);
            outputAmount.value = Object.values(val.rates)[0];
            outputAmount.innerHTML = value + ' ' + inputCurrency + ' = ' + outputAmount.value + ' ' + outputCurrency;
        });
}

function resetOutput() {
    outputAmount.style.display = "none";
}