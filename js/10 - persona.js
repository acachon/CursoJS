//Variables globales
    const miPeso = 94;
    const miAltura = 1.80;

//Creo un objeto Persona
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

        if (imc <0) {       ruta="no tienes IMC";   //Si IMC es -1 no tienes IMC     
        }else if (imc <16){ ruta="desnutrido";
        }else if (imc <18){ ruta="delgado";
        }else if (imc <25){ ruta="ideal";
        }else if (imc <31){ ruta="con sobrepeso"; 
        }else if (imc >31){ ruta="obeso"; 
        }

        return ruta;
    }
}

//Creo un objeto Person sin ningun metodo
function Person(altura, peso){
    this.altura=altura;
    this.peso=peso;
}

//Agrego un par de metodos a prototipo de Person
Person.prototype.calculaIMCNum = function() {
    //Calcula el IMC numerico con el peso y altura del objeto
    return this.altura && this.peso ? this.peso/this.altura/this.altura : -1;
};

Person.prototype.calculaIMCLit = function() {
    var imc = this.calculaIMCNum(); //Indice numerico
    var ruta = "";                  //Literal de salida

    if (imc <0) {       ruta="you have no IMC";   //Si IMC es -1 no tienes IMC     
    }else if (imc <16){ ruta="desnutrido";
    }else if (imc <18){ ruta="delgado";
    }else if (imc <25){ ruta="ideal";
    }else if (imc <31){ ruta="con sobrepeso"; 
    }else if (imc >31){ ruta="obeso"; 
    }

    return ruta;
};

//////////////////////////////////////////////////////////
//Compruebo que ha funcionado todo haciendo un ejemplo
var aux = new Persona(miAltura, miPeso);
console.log("Mi IMC es: " + aux.calculaIMCNum());
console.log("Segun tu IMC estas: " + aux.calculaIMCLit());
console.log ("Tu __proto__ es: " + aux.__proto__);
console.log ("Tu __proto__ es: " + Persona.__proto__);

var aux2 = new Person(miAltura, miPeso);
console.log("My IMC is: " + aux2.calculaIMCNum());
console.log("Based on your IMC, you\'re: " + aux.calculaIMCLit());
console.log ("Your (aux2) __proto__ es: " + aux2.__proto__);
console.log ("Your (Person) __proto__ es: " + Person.__proto__);

