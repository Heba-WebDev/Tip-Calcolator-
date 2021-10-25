








// the selected tip 

let defaultCustom = document.getElementsByClassName('default');

// the custom tip

let custom = document.querySelector('.custom');

// the bill

let billinput = document.querySelector('#bill');

//the bill parent div

let billcontainer = document.querySelector('#billcontainer');

// the error message the user gets if the entered number is 0 or negative 

let billmessage = document.querySelector('.hide2');

// the blue border when the user is typing the bill 

billinput.addEventListener("focus",  showborder);

function showborder() {
    billcontainer.classList.add('focused');
}
// the blue border goes away once the user leaves the bill input field 

billinput.addEventListener("blur", hideborder);

function hideborder() {
    billcontainer.classList.remove('focused');
}

// the error message the user gets if he leaves the bill field with invalied number

billinput.addEventListener("blur", errormessage);

function errormessage() {
    
    if(billinput.value <= 0 && billinput.value !== '') {
        billcontainer.style.border = "1px solid red";
        billmessage.style.display = "block";
    } else {
        billcontainer.style.border = "";
        billmessage.style.display = "none";
}
}



// the field where the user entrers the number of people that will pay the bill and tip 

let numOfPeople = document.querySelector('#people');

// the parent element for the number of people field 

let peoplecontainer = document.querySelector('#peoplecontainer');

// the message the user will gets if he enetered less than 1 (0 or negative number)

let peoplemessage = document.querySelector('.hide');


// the blue border that shows while the user is entering the number of people

numOfPeople.addEventListener("focus",  showborder2);

function showborder2() {
    peoplecontainer.classList.add('focused');
}

// the blue border goes away once the user entered the number of people

numOfPeople.addEventListener("blur", hideborder2);


function hideborder2() {
    peoplecontainer.classList.remove('focused');
}


// the error message the user will gets if they leave the input field with a 0 or a negative number

numOfPeople.addEventListener("blur", redflag);

function redflag() {
    if(numOfPeople.value <= 0 && numOfPeople.value !== '') {
        peoplecontainer.style.border = "1px solid red";
        peoplemessage.style.display = "block";
    } else {
        peoplecontainer.style.border = "";
        peoplemessage.style.display = "none";
    }
}



// save all tip buttons in a varaible

let alltips = document.querySelectorAll('.tips');


// looping over the tip buttons to give them a click handler
alltips.forEach(tips => {
    tips.addEventListener('click', highlightClicked)
})

// the click handler function that will highlight the clicked upon tip button
let tipValue = 0.10;

function highlightClicked(event) {
    alltips.forEach(tips => {
        tips.classList.remove('default');

        if(event.target.innerHTML == tips.innerHTML) {
            tips.classList.add('default');
            tipValue = parseFloat(tips.innerHTML.match(/\d+/g))/100;
        } else {
            tips.classList.remove('default');
        }
    })
};

// get the custom tip 

custom.addEventListener('blur', getthecustomtip);

function getthecustomtip() {
    if(custom.value != '' && !custom.value <= 0) {
        tipValue = parseFloat((custom.value)/100);
    }
}



// the blue border the user gets while entering the custom tip value

custom.addEventListener("focus", showborder3);

function showborder3() {
    custom.classList.add('focused');
    
}

// the blue border of the custom tip value field goes away once the user leave it

custom.addEventListener("blur", hideborder3);

function hideborder3() {
    custom.classList.remove('focused');
}


// if the user enters an invaild custom tip amount the field gets highlighted by a red border

custom.addEventListener("blur", errorcustom);

function errorcustom() {
    if(custom.value <= 0 && custom.value !== '') {
        custom.style.border = "1px solid red";
       
    } else {
        custom.style.border = "";
    }
}


// if the user enters a vaild custom tip then the tip buttons stop being highlighted 
let customtip;
custom.addEventListener("blur", changeCustom);

function changeCustom() {
    let tips = document.getElementsByClassName("default")
    if(custom.value != '' && !custom.value <= 0) {
       customtip = parseFloat(custom.value / 100);
        alltips.forEach(tips => {
            tips.classList.remove('default');
        }) 
    }
}


// getting the bill value 1- set a default value

let totalbill = 0.0; 

// set an input event to gett the value the user typed 

bill.addEventListener('input', getbillvalue);

function getbillvalue(){
    if(bill.value != '' && !bill.value <= 0 && bill.value != undefined && bill.value != NaN) {
        totalbill = parseFloat(bill.value);
    }
    sumAll();
}


// get the number of people that will share the bill and the tip

let totalpeople = 1; 

numOfPeople.addEventListener('input', getthepeoplenum);

function getthepeoplenum() {
    if(numOfPeople.value != '' && !numOfPeople.value <= 0 && numOfPeople.value != undefined && numOfPeople.value != NaN) {
        totalpeople = parseFloat(numOfPeople.value);
    }
    sumAll();
}

// write the function that will sum up the bill per person and tip per person
let tipPerPerson = document.querySelector('#tipPerPerson');
let billPerPerson = document.querySelector('#billPerPerson');


function sumAll() {
 
    let whatUTip = (totalbill * tipValue) / totalpeople;
    let whatUPay = (totalbill / totalpeople) + whatUTip;
    tipPerPerson.textContent = `$${whatUPay.toFixed(2)}` ;
    billPerPerson.textContent = `$${whatUTip.toFixed(2)}`;
}


// the button that will rest the page

let restButton = document.querySelector('.btn-rest');

restButton.addEventListener('click', restPage);


function restPage(){
    bill.value = '';
    getbillvalue();

    alltips[1].click();


    numOfPeople.value = ''; 
    getthepeoplenum();
   
    custom.value = '';
    changeCustom();
   
    tipPerPerson.textContent = `$ 0.00` ;
    billPerPerson.textContent = `$ 0.0`;
}


