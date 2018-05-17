/* Modulo JS independiente que se puede ejecutar fuera del interprete de html
    Creo un nuevo objecto (Dni), con sus propiedades (cifras y letra),
    Cre un metodo especifico de ese nuevo objeto: calculaLetra()
*/

function Dni(numero){
    //constructor de un tipo nuevo llamado Dni
    // las funciones constructoras sulen empezar por mayuscula
    this.cifras = numero;           //Defino un atributo llamado cifras que es el igual al parametro entrado al constructor
    this.letra = this.calcularLetra();   //Defino un atributo llamado letra que es el resultado de un metodo de Dni creado por mi
}

Dni.prototype={
    calcularLetra: function() {
        var letra="";
        // Tabla de letras definida por el DNI, la defino como constante
        var secuencia = ["T", "R", "W", "A", "G", "M", "Y", "F", "P", "D", "X", "B", "N", "J", "Z", "S", "Q", "V", "H", "L", "C", "K", "E", "T"];
                
        // Cojo el DNI introducido y calculo el indice
        var dato = this.cifras;  //Cojo las cifras del DNI
        var modulo = dato % 23;
        
        if (isNaN(modulo)) {
            letra = NaN;
        } 
        else {
            letra = secuencia[modulo];                 
        }    
        return letra;
    }
}

// Presento por linea de comandos el resultado de crear una entidad de ese objeto, 
// y ver sus propiedades

var miDni = new Dni(26022033);
console.log("cifras es: " + miDni.cifras);
console.log("calculaLetra es: " + miDni.calcularLetra());
console.log("letra es: " + miDni.letra);
console.log("__proto__ es: " + miDni.__proto__);
console.log("__proto__ de Dni es: " + Dni.__proto__);