//Variables globales
    const miPeso = 94;
    const miAltura = 1.80;

//Creo un objeto persona
function Persona(altura, peso){
    this.altura=altura;
    this.peso=peso;
    this.calculaIMCNum = function () {
        //Calcula el IMC numerico con el peso y altura del objeto
        return this.altura && this.peso ? this.peso/this.altura/this.altura : -1;
    }
    this.calculaIMCLit = function () {
        var imc = this.calculaIMCNum(); //Indice numerico
        var ruta = "";                  //Literal de salida

        if (imc <16) {      ruta="desnutrido";     
        }else if (imc <18){ ruta="delgado";
        }else if (imc <25){ ruta="ideal";
        }else if (imc <31){ ruta="con sobrepeso"; 
        }else if (imc >31){ ruta="obeso"; 
        }

        return ruta;
    }
}
var aux = new Persona(miAltura, miPeso);
console.log("Mi IMC es: " + aux.calculaIMCNum());
console.log("Segun tu IMC estas: " + aux.calculaIMCLit());

