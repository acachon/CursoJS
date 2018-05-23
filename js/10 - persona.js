//Creo un objeto persona
function Persona(altura, peso){
    this.altura=altura;
    this.peso=peso;
    this.calculaIMCNum = function () {
        return this.peso/this.altura/this.altura;
    }
}
var aux = new Persona(1.80,94);
console.log("Mi IMC es: " + aux.calculaIMCNum());
