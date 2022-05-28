const InvestedAmountInput=document.querySelector(".loan-amount");
const TenureInput=document.querySelector(".loan-tenure");

const TotalInvestedvalue=document.querySelector(".loan-emi .value");
const EstimatedReturnValue=document.querySelector(".total-interest .value");
const TotalAmountValue=document.querySelector(".total-amount .value");

const calculateBtn=document.querySelector(".btn");

let investedAmount=parseFloat(InvestedAmountInput.value);
let Tenure=parseFloat(TenureInput.value);
let myChart;

const checkvalues=()=>{
    let invrestedAmountValue=InvestedAmountInput.value;
    let TenureVlaue=TenureInput.value;
    let regexnumber=/^[0-9]+$/;
    if(!invrestedAmountValue.match(regexnumber)){
        InvestedAmountInput.value="10000";
    }
    if(!TenureVlaue.match(regexnumber)){
        TenureInput.value="15";
    }
}

const displayChart=(investedTotalAmount,returnReceive)=>{
const ctx = document.getElementById('myChart').getContext('2d');
 myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ['Total Invested Amount', 'Estimated Returns'],
        datasets: [{
            data: [investedTotalAmount,returnReceive],
            backgroundColor: ["#F83292","#814096"],
            borderWidth: 1,
        },],
    },
});
};

const updateChart=(investedTotalAmount,returnReceive)=>{
    myChart.data.datasets[0].data[0]=investedTotalAmount;
    myChart.data.datasets[0].data[1]=returnReceive;
    myChart.update();
}

const calculateTotalAmount=()=>{
    checkvalues();
    refreshInputValues();
    let maturity=investedAmount *((Math.pow(1.071,Tenure) - 1)/0.071);

    return maturity;
};

const update=(maturity)=>{
    let y = Math.round(Tenure*investedAmount);
    TotalInvestedvalue.innerHTML = y;
    let TotalAmount = Math.round(maturity);
    TotalAmountValue.innerHTML=TotalAmount;
    let returnReceive=Math.round(maturity - y);
    EstimatedReturnValue.innerHTML=returnReceive;

    if(myChart){
        updateChart(y,returnReceive);
    }
    else{
        displayChart(y,returnReceive);
    }
};

const refreshInputValues=()=>{
    investedAmount=parseFloat(InvestedAmountInput.value);
    Tenure=parseFloat(TenureInput.value);
};

const init=()=>{
    refreshInputValues();
    let maturity=calculateTotalAmount();
    update(maturity);
};
init();

calculateBtn.addEventListener("click",()=>{
    refreshInputValues();
    let maturity=calculateTotalAmount();
    update(maturity);
});