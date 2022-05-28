const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIvalue = document.querySelector(".loan-emi .value");
const TotalInterestValue = document.querySelector(".total-interest .value");
const TotalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);

let interest = interestRate / 12 / 100;
let myChart;

const checkvalues = () => {
    let loanAmountValue = loanAmountInput.value;
    let interestRateValue = interestRateInput.value;
    let loanTenureVlaue = loanTenureInput.value;
    let regexnumber = /^[0-9]+$/;
    if (!loanAmountValue.match(regexnumber)) {
        loanAmountInput.value = "10000";
    }
    if (!loanTenureVlaue.match(regexnumber)) {
        loanTenureInput.value = "12";
    }
    let regexdecimalnumber = /^(\d*\.)?\d+$/;
    if (!interestRateValue.match(regexdecimalnumber)) {
        interestRateInput.value = "7.5";
    }
}

const displayChart = (totalInterestPayableValue) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Total Interest', 'Principal Loan Amount'],
            datasets: [{
                data: [totalInterestPayableValue, loanAmount],
                backgroundColor: ["#F83292", "#814096"],
                borderWidth: 1.5,
            },],
        },
    });
};

const updateChart = (totalInterestPayableValue) => {
    myChart.data.datasets[0].data[0] = totalInterestPayableValue;
    myChart.data.datasets[0].data[1] = loanAmount;
    myChart.update();
}

const calculateEMI = () => {
    checkvalues();
    refreshInputValues();
    let emi = loanAmount * interest * (Math.pow(1 + interest, loanTenure) / (Math.pow(1 + interest, loanTenure) - 1));

    return emi;
};
const update = (emi) => {
    loanEMIvalue.innerHTML = Math.round(emi);

    let TotalAmount = Math.round(loanTenure * emi);
    TotalAmountValue.innerHTML = TotalAmount;

    let totalInterestPayable = Math.round(TotalAmount - loanAmount);
    TotalInterestValue.innerHTML = totalInterestPayable;

    if (myChart) {
        updateChart(totalInterestPayable);
    }
    else {
        displayChart(totalInterestPayable);
    }

};

const refreshInputValues = () => {
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestRateInput.value);
    loanTenure = parseFloat(loanTenureInput.value);
    interest = interestRate / 12 / 100;
};

const init = () => {
    refreshInputValues();
    let emi = calculateEMI();
    update(emi);
};
init();

calculateBtn.addEventListener("click", () => {
    refreshInputValues();
    let emi = calculateEMI();
    update(emi);
});