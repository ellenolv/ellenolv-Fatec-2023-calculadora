function Resolver(val) {
    var v = document.getElementById('res');
    v.value += val;
 }
 function Resultado() {
    var num1 = document.getElementById('res').value;
    var num2 = eval(num1);
    document.getElementById('res').value = num2;
 }
 function Limpar() {
    var inp = document.getElementById('res');
    inp.value = '';
 }
 function Voltar() {
    var ev = document.getElementById('res');
    ev.value = ev.value.slice(0,-1);
 }