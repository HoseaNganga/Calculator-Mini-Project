//SELECT RELEVANT DOM ELEMENTS
const datanumbers=document.querySelectorAll(`[data-number]`);
const dataOperators=document.querySelectorAll(`[data-operator]`);
const previousOutput=document.querySelector(`[data-previous-operand]`);
const currentOutput=document.querySelector(`[data-current-operand]`);
const allClearButton=document.querySelector(`[data-all-clear]`);
const deleteButton=document.querySelector(`[data-delete]`);
const equalsButton=document.querySelector(`.spantwo`);
const toggleButton=document.querySelector(`.toggleMode`);


//CREATE A CLASS FUNCTION THAT WILL TAKE ALL OPERATIONS TO BE PERFOMED

class Calculator{
    constructor(previousOutput,currentOutput){
        this.previousOutput=previousOutput;
        this.currentOutput=currentOutput;
        this.clear();
    }
    //FUNCTION TO CLEAR THE OUTPUT FIELD
    clear(){
        //VARIABLES REPRESENTING THE VALUES UPON THE USER CLICKING A BUTTON
        this.currentOperand='';
        this.previousOperand='';
        this.operator=undefined;
    }
    //FUNCTION TO DELETE A SINGLE CHARACTER
    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);

    }
    //FUNCTION TO ADD A CHARACTER DEPENDING ON THE BUTTON PRESSED
    appendNumber(number){
        //THIS STATEMENT ENSURES THAT ONLY ONE DECIMAL POINT CAN BE APPLIED TO THE CURRENT PERAND 
        if(number==='.' && this.currentOperand.includes('.'))return;
        this.currentOperand=this.currentOperand.toString() + number.toString();

    }
    //FUNCTION THAT ENABLES US TO CHOOSE AN OPERATOR
    chooseOperation(operator){
        //IF STATEMENT THAT CHECKS WHETHER THE CURRENT OPERAND IS EMPTY AND THEREFORE NO ACTION IS TO BE PERFOMED
        if(this.currentOperand==='')return;
        if(this.previousOperand!==''){
            this.compute()
        }
        this.operator=operator;
        //AFTER CHOOSING AN OPERATOR,OUR PREVIOUS OPERAND IS UPDATED TO THE VALUE OF THE CURRENT OPERAND AND THE CURENT OPERAND IS LEFT AS AN EMPTY STRING
        this.previousOperand=this.currentOperand;
        this.currentOperand='';

    }
    //FUNCTION THAT CARRIES OUT THE NECESSARY MATHEMATICAL OPERATIONS
    compute(){
        let computation;
        //CONVERT OUR STRING TO INTEGERS/NUMBERS
        const previousNumber=parseFloat(this.previousOperand);
        const currentNumber=parseFloat(this.currentOperand);
        //STATEMENT THAT CHECKS IF BOTH THE PREVIOUS OPERAND VALUES AND CUREENT OPERAND VALUES ARE NUMBERS
        if(isNaN(previousNumber) || isNaN(currentNumber)) return;
        //SWITCH CASE OPERATOR TO PERFOM ARITHMETIC OPERATIONS
        switch(this.operator){
            case '+':
                computation=previousNumber + currentNumber;
                break;
            case '-':
                computation=previousNumber - currentNumber;
                break;
            case '/':
                computation=previousNumber / currentNumber;
                break;
            case '*':
                computation=previousNumber * currentNumber;
                break;
            case '%':
                computation=previousNumber % currentNumber;
                break;
            default:
                return

        }
        //OUTPUT THE COMPUTATION VALUE
        this.currentOperand=computation;
        //OPERTAOR IS RESET BACK TO DEFAULT
        this.operator=undefined;
        //CLEAR THE PREVIOUS OPERAND FIELD
        this.previousOperand='';
        

    }
    //FUNCTION TO SORT THE DISPLAYED FIGURES USING COMMAS
    sortNumberDisplay(number){
        //CONVERT THE NUMBER TO STRING
        const stringnum=number.toString()
        //GET INTEGERS BEFORE THE DECIMAL
        const integernum=parseFloat(stringnum.split(`.`)[0])
        //GET INTEGERS AFTER THE DECIMAL
        const decimalnum=stringnum.split('.')[1];
        let integerDisplay;
        if(isNaN(integernum)){
            integerDisplay=''
        }else{
            integerDisplay=integernum.toLocaleString(`en`,{maximumFractionDigits:0})
        }

        if(decimalnum!=null){
            return `${integerDisplay}.${decimalnum}`
        }else{
            return integerDisplay;
        }
    }
    //FUNCTION THAT UPDATES THE DISPLAY
    updateDisplay(){
        this.currentOutput.innerText=this.sortNumberDisplay(this.currentOperand);
        //IF STATEMENT THAT CHECKS IF THERE IS AN OPERATOR
        if(this.operator!=null){
            this.previousOutput.innerText=`${this.sortNumberDisplay(this.previousOperand)} ${this.operator}`;
        }else{
            this.previousOutput.innerText='';
        }
        
        
    }
}


const calculator=new Calculator(previousOutput,currentOutput)

datanumbers.forEach((button)=>{
    button.addEventListener(`click`,()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

dataOperators.forEach((button)=>{
    button.addEventListener(`click`,()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
        console.log(button.innerText);
    })
})

equalsButton.addEventListener(`click`,button=>{
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener(`click`,(button)=>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener(`click`,()=>{
    calculator.delete();
    calculator.updateDisplay();
})

//TOGGLE BUTTON
toggleButton.addEventListener(`click`,(e)=>{
    document.body.classList.toggle(`dark`);

    if(document.body.classList.contains(`dark`)){
        toggleButton.innerText=`Light Mode`;
    }else{
        toggleButton.innerText=`Dark Mode`
    }

})