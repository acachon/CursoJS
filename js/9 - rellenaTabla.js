//Arranca el script
    console.log("Arranca el script");

//Variables y constantes globales
var arrayGlobal = [];    //Guardo los inputs tambien en este array
//Funciones locales

    function inserta() {
    //Inserta una nueva fila tomando como dato el input de la web
        var entrada = "";       //Guardo el campo introducido
        
        //Tomo el dato introducido y lo meto en el array
        entrada = document.getElementById("input1").value;
        //arrayGlobal.push(entrada);
        //    console.log("El dato introducido es " + arrayGlobal[arrayGlobal.length-1]);

        // Borro el valor de la caja de texto de entrada
        document.getElementById("input1").value="";

        //Creo una nueva fila, le meto un listener y la etiqueto con un indice
        var nueva_fila = document.createElement ("TR");
        nueva_fila.innerHTML=entrada;
        nueva_fila.id=arrayGlobal.length; //Le asigno como indice el ultimo elemento del array
        nueva_fila.addEventListener("click",eliminaFila);
        
        // Guardo este nuevo TR en mi array de TR
        arrayGlobal.push(nueva_fila);
            console.log("El elemento nuevo es: " + arrayGlobal[arrayGlobal.length-1].innerHTML);
            console.log("El id del TR es:" + nueva_fila.id);
        //Incluyo esta nueva fila dentro del div de la tabla
        var div_tabla = document.getElementById ("miTabla");
        div_tabla.appendChild(nueva_fila);

    }
    function eliminaFila(evento) {
        var elementoTocado = evento.currentTarget;
            console.log("El elemento clickado es: " + elementoTocado.id);
        
        //Elimino ese elemento del array
        arrayGlobal.splice(elementoTocado.id,1);
        
        //Elimno el TR
        elementoTocado.remove();

        //Vuelvo a numerar el resto de los TR
        for(var i= parseInt(elementoTocado.id);i<arrayGlobal.length;i++){
            arrayGlobal[i].id --;
        }

    }