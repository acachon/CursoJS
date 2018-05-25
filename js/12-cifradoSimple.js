//Arranco mi script
    console.log("Arranca el script");

//Declaro mis variables globales
    var seedCifrado = false;

//LLamo al servidor para pedir la clave de cifrado
    pedirSeed();
 
//Proceso los datos enviados al pulsar el boton
    function cifrar(){
    //Llama a la funcion cifrarTexto y devuelve la salida en la otra caja de texto y la envia al servidor
            console.log("Arranca cifrar");

        //Cojo el input de la caja de texto1
        var inputTexto = document.getElementById("texto1").value;

        //Determino la clave a utilizar
        var clave = isNaN(seedCifrado)? inputTexto : seedCifrado;

        //Obtengo el texto cifrado (es un array)
        var outputTexto = cifrarTexto (inputTexto, clave);
        
        //Formateo la salida como un String
        
        //outputTexto.toString();
        var aux="";
        outputTexto.forEach(function (elemento,indice, cadena) {
            aux += cadena[indice];
        });
        outputTexto = aux;

        //Asigno el texto de salida ya cifrado a la caja de la derecha
        document.getElementById("texto2").value = outputTexto;

        //Envio el texto cifrado tambien al servidor
        //Construyo primero un objeto con los parametros incial, cifrado y clave
        var miObjeto = {
            "mensaje_original":  document.getElementById("texto1").value,
            "mensaje_cifrado":  outputTexto,
            "clave": clave 
        };
        //Ahora si, envio el mensaje al servidor para su correcion
        enviarJSON (miObjeto, "http://10.1.2.10:8080/appwebprofe/EnviarMensaje");

    }

    function cifrarTexto(miTexto, clave){
    //Genero un String que es la serie de cod ASCII del texto introducido
            console.log("Arranca cifrarTexto");
        
        //Declaro variable de salida como array por si proceso luego caracter individuales
        var arrayCifrado = [];
        var desplazamiento = clave;     //Cojo la clave como indice de desplazamiento

        //Genero la cadena de ASCII de salida con un cifrado 
        //Cesar: un simple un desplazamiento (clave) en el codigo de cada caracter
        for (var i=0; i< miTexto.length; i++){
            arrayCifrado[i] = miTexto.charCodeAt(i) + desplazamiento;
        }

        //Devuelvo el texto cifrado
        return arrayCifrado;
    }

    function pedirSeed(){
    //Llamo a un servidor para obtener un fichero JSON con la clave  
            console.log("Lanzo la peticion al servidor de una nueva clave");
        var respuesta = "";
        const DIR_SERVIDOR = "http://10.1.2.10:8080/appwebprofe/";
        const SERVICIO = "ObtenerClave";
        const DIR_SERVICIO = DIR_SERVIDOR + SERVICIO;
        var peticionXHR = new XMLHttpRequest();

        //Programo un evento, "cuando finalice la descarga del request", para lanzar mis acciones    
        function procesarRespuesta (){
            //Recojo el valor devuelto por el servidor
                console.log ("Procesar eventos invocado " + peticionXHR.readyState);
            if (peticionXHR.readyState==4){
                // Cuando readyState es 4 ya se ha recibido la respuesta
                //Actualizo la variable global de cifrado, y cambio el mensaje de la web
                seedCifrado = parseInt(peticionXHR.responseText);
                    console.log ("El servidor ha devuelto: " +seedCifrado);
                document.getElementById("mensaje1").innerHTML="Hay una clave de servidor " + seedCifrado;
            }
            
        }

        //LLamo al servidor de manera asincrona (true)
        peticionXHR.onreadystatechange = procesarRespuesta; //Configuro un listener asincrono segun el estado de la peticion
        peticionXHR.open('GET', DIR_SERVICIO, true);        //Configuro el tipo de peticion (GET), servidor+servicio y asincrono(true)    
        peticionXHR.send(null);                             //Llamo al servidor con el XHR ya configurado
    }

    function enviarJSON (miObjeto, dirServidor){
    //Recibe un objeto javascript y lo envia como un JSON al servidor
            console.log("Lanzo la peticion al servidor enviando mi objeto como un JSON");
        
        //Parametros para configurar el request XHR    
        var ficheroJSON = new String;
        const DIR_SERVIDOR = "http://10.1.2.10:8080/appwebprofe/";
        const SERVICIO = "EnviarMensaje";
        const DIR_SERVICIO = dirServidor;
        var peticionXHR = new XMLHttpRequest();

        //Genero un String a partir del objeto JSON
        ficheroJSON = JSON.stringify(miObjeto); 

        //Programo un listener del estado de envio al servidor, "cuando finalice el request", para lanzar mis acciones    
        function procesarRespuesta (){
        //Listener para cambio de estado de mi peticon XHR
                console.log ("Nuevo estado de mi request: " + peticionXHR.readyState);
            if (peticionXHR.readyState==4){
                // Cuando readyState es 4 ya se ha recibido la respuesta
                //Actualizo la variable global de cifrado, y cambio el mensaje de la web
                    console.log ("El mensaje cifrado se ha enviado. Respuesta: " + peticionXHR.responseText);
                document.getElementById("mensaje1").innerHTML +="<br> El mensaje cifrado se ha enviado.";
                document.getElementById("mensaje1").innerHTML +="<br> La respuesta del servidor es: " + peticionXHR.responseText;
            }
        }

        //LLamo al servidor de manera asincrona (true) y le envio el fichero JSON 
        peticionXHR.onreadystatechange = procesarRespuesta;             //Configuro un listener asincrono segun el estado de la peticion
        peticionXHR.open('POST', DIR_SERVICIO, true);                   //Configuro el tipo de peticion (GET), servidor+servicio y asincrono(true)    
        peticionXHR.setRequestHeader('Content-Type', 'application/json');   //Configuro el tipo de mensaje a enviar
        peticionXHR.send(ficheroJSON);                                  //Envio el fichero          
    }

