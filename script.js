const currencyOne = document.getElementById("currency-one");
const currencyTwo = document.getElementById("currency-two");

const currencyAmountOne = document.getElementById("amount-one");
const currencyAmountTwo = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swapElement = document.getElementById("swap");

/* Fetch Echange Rate From API and Update the DOM */

async function exchangeRateCalculate(){
    
    const currencyOneFromDropDown = currencyOne.value;
    const currencyTwoFromDropDown = currencyTwo.value;
    /* Fetch data from API */
    const proxyURL = "https://cors-anywhere.herokuapp.com/";
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currencyOneFromDropDown}`;
    try{
        const response = await fetch(proxyURL + apiUrl);
        const data = await response.json();
        const rate = data.rates[currencyTwoFromDropDown];
        console.log(rate)
        rateElement.innerText = `1 ${currencyOneFromDropDown} = ${rate} ${currencyTwoFromDropDown}`
        
        currencyAmountTwo.value = currencyAmountOne.value * rate
    }
    catch (e){
        console.error(e);
    }
}

/* Swap Currency */

function swapCurrency(){
    const temp = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = temp;
    exchangeRateCalculate();
}

/* Event Listner */
currencyOne.addEventListener("change",exchangeRateCalculate);
currencyTwo.addEventListener("change",exchangeRateCalculate); 

currencyAmountOne.addEventListener("input",exchangeRateCalculate);
currencyAmountTwo.addEventListener("input",exchangeRateCalculate);
swap.addEventListener("click",swapCurrency);

exchangeRateCalculate()