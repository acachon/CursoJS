//Arranca el script
    console.log("Arranca el script");

//Variables y constantes globales
var arrayGlobal = [];    //Guardo los inputs tambien en este array
//Funciones locales

    function inserta() {
    //Inserta una nueva fila tomando como dato el input de la web
            console.log("Arranco la funcion inserta");
        var arrayGlobal = [];    //Guardo los inputs tambien en este array
        var entrada = "";       //Guardo el campo introducido
        
        //Tomo el dato introducido y lo meto en el array
        entrada = document.getElementById("input1").value;
        arrayGlobal.push(entrada);
            console.log("El dato introducido es " + arrayGlobal[arrayGlobal.length-1]);

        // Borro el valor de la caja de texto de entrada
        document.getElementById("input1").value="";

        //Creo una nueva fila y la completo con el valor entrado
        var nueva_fila = document.createElement ("TR");
        nueva_fila.innerHTML=entrada;
        
        //Incluyo esta nueva fila dentro del div de la tabla
        var div_tabla = document.getElementById ("tabla1");
        div_tabla.appendChild(nueva_fila);

    }