let checkBoxList = document.querySelectorAll(".custom-checkbox");
let inputField = document.querySelectorAll(".goal-input");
let errorContainer = document.querySelector(".error-container");
let progressValue = document.querySelector(".progress-value");
let progressLabel=document.querySelector(".progress-label");
let lastQuote=document.querySelector(".quote");

let lastQuotes=["“Move one step ahead, today!”","“Keep Going, You’re making great progress!”"]
let allQuotes=["Raise the bar by completing your goals!","Completed One Don't be Lazy","Yeahh Lets Do It","wow You Are Amazing"]
let allGoals = JSON.parse(localStorage.getItem('allGoals')) || {
    first:{name:"",completed:false},
    second:{name:"",completed:false},
    third:{name:"",completed:false},
};


// Populate input fields and checkboxes on page load
inputField.forEach((input) => {
    if (allGoals[input.id]) {
        input.value = allGoals[input.id].name; // Set the input value
        if (allGoals[input.id].completed) {
            input.parentElement.classList.add('completed'); // Mark as completed
        }
    }

    input.addEventListener('focus', () => {
        errorContainer.classList.remove('error-wrapper');
    });

    input.addEventListener("input", (e) => {
        if(allGoals[input.id].completed){
            input.value=allGoals[input.id].name
            return
        }


        allGoals[input.id] = { name: input.value, completed: false }; // Update the goal
        localStorage.setItem('allGoals', JSON.stringify(allGoals));
    });
});

checkBoxList.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
        const allFieldInputFilled = [...inputField].every(input => input.value);

        if (allFieldInputFilled) {
            checkbox.parentElement.classList.toggle('completed');
            const inputId = checkbox.nextElementSibling.id;

            if (allGoals[inputId]) {
                allGoals[inputId].completed = !allGoals[inputId].completed; // Toggle completed state
                completedGoalsCount=Object.values(allGoals).filter((goal)=>goal.completed).length
                progressValue.style.width = `${completedGoalsCount/3 *100}%`
                progressValue.firstElementChild.innerText=`${completedGoalsCount}/3 completed`
                progressLabel.innerText=allQuotes[completedGoalsCount]
                if(completedGoalsCount==3){
                    lastQuote.innerText=lastQuotes[1]
                }else{
                    lastQuote.innerText=lastQuotes[0]
                }
                localStorage.setItem('allGoals', JSON.stringify(allGoals));
            }
        } else {
            errorContainer.classList.add('error-wrapper');
        }
    });
});
