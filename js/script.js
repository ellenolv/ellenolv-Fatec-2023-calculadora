/**SELEÇÃO DE ELEMNTOS **/
//ex: codigo busca na pagina o elemento HTML que tenha o id igual a 'previus-operation' e o armazena em uma constante chamada previousOperationText
const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");


/** LOGICA DE APLICAÇÃO DA CALCULADORA**/
class Calculator {
  constructor(previousOperationText, currentOperationText) {//iniciar com os valores padrão
    //valores que são impressos na tela
    this.previousOperationText = previousOperationText;
    this.currentOperationText = currentOperationText;
    //valores que estão sendo digitados no momento 
    this.currentOperation = "";
  }//para n ter que acessar as constantes do dom repetidas vezes, eu transformo isso em propriedades do objeto. 

  // adiciona os digitos na tela da calculadora
  addDigit(digit) {
    console.log(digit);
    // Verifica se já tem um ponto 
    if (digit === "." && this.currentOperationText.innerText.includes(".")) {
      return;
    }

    this.currentOperation = digit;
    this.updateScreen();
  }

  // processa todas as operações da calculadora 
  processOperation(operation) {
    // verifica se o current value está vazio
    if (this.currentOperationText.innerText === "" && operation !== "C") {
      // Muda a operação
      if (this.previousOperationText.innerText !== "") {
        this.changeOperation(operation);
      }
      return;
    }

    // Pega valores anteriores e que estão sendo digitados
    let operationValue;
    let previous = +this.previousOperationText.innerText.split(" ")[0];
    let current = +this.currentOperationText.innerText;

    switch (operation) {
      case "+":
        operationValue = previous + current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "-":
        operationValue = previous - current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "*":
        operationValue = previous * current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "/":
        operationValue = previous / current;
        this.updateScreen(operationValue, operation, current, previous);
        break;
      case "DEL":
        this.processDelOperator();
        break;
      case "CE":
        this.processClearCurrentOperator();
        break;
      case "C":
        this.processClearOperator();
        break;
      case "=":
        this.processEqualOperator();
        break;
      default:
        return;
    }
  }

  // Muda os valores na tela da calculadora 
  updateScreen(
    operationValue = null,
    operation = null, //É o que o usuário envia qnd acesso o metodo  processOperation(operation)

    //os seguintes valores, estão sendo reconhidos das linhas 42 e 43
    current = null,
    previous = null

  ) {
    if (operationValue === null) {
      // Adicionar número ao valor atual 
      this.currentOperationText.innerText += this.currentOperation;
    } else {
      // verificar se o valor é 0, se for é só adicionar o valor
      if (previous === 0) {
        operationValue = current;
      }
      // adicionar o valor atual para o que campo de precious
      this.previousOperationText.innerText = `${operationValue} ${operation}`;
      this.currentOperationText.innerText = "";
    }
  }

  // Muda a operação matemática 
  changeOperation(operation) {
    const mathOperations = ["*", "-", "+", "/"];

    if (!mathOperations.includes(operation)) {
      return;
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation;
  }

  // Deletar um digito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1);
  }

  // Limpar a operação atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = "";
  }

  // Limpar todas as operações
  processClearOperator() {
    this.currentOperationText.innerText = "";
    this.previousOperationText.innerText = "";
  }

  // Processar operação
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(" ")[1];

    this.processOperation(operation);
  }
}

const calc = new Calculator(previousOperationText, currentOperationText);

/*EVENTOS*/
buttons.forEach((btn) => { //para todo btn vamos criar um evento
  btn.addEventListener("click", (e) => { //o evento será de click
    const value = e.target.innerText;

    if (+value >= 0 || value === ".") {
      console.log(value);
      calc.addDigit(value);
    } else {
      calc.processOperation(value);
    }
  });
});