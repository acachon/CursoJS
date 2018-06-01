//Arranca el script
    console.log("Arranca el script buscaCancion");

//Variables y constantes globales
    var listaBuscada;       //Guardo la lista devuelta como resultado de la busqueda
    
//Funciones locales

    function buscaListado() {
    //Busco el listado de canciones buscadas en iTunes y llamo (callback) a actualizaListado()
            console.log("Arranco la busqueda en iTunes");

        var cadenaBuscada = document.getElementById("input1").value;
            console.log("Cadena de busqueda: "+ cadenaBuscada);
        
        //Llamo al servicio iTunes con esta cadena de busqueda
        const servicio = "https://itunes.apple.com/search?";
        var busqueda = "";
        var parametros = "term=" + cadenaBuscada + "&media=music&limit=20";
        
        //configuro la url de busqueda, la llamada al API de iTunes
        busqueda= servicio + parametros;

        //Cuando se reciba la respuesta se actualiza el listado
        miAjaxGet(busqueda,function(respuesta){
            var aux = JSON.parse(respuesta);        //Variable intermedia con el resultado de Tunes
            listaBuscada = aux.results;               //El objeto es solo la lista de canciones
            actualizaListado(listaBuscada);         //Callback actualizaListado()
        });

    }

    function actualizaListado(listado){
    //Actualiza el listado de canciones apartir del JSON devuelto por iTunes
        var lista = document.getElementById("lista1");
        
        //Borro cualquier elemento de la lista preexistente
        lista.innerHTML="";

        //Creo una nueva opcion en la lista por cada elemento del objeto pasado
        for (var i=0; i<listado.length; i++){
            var elemento = document.createElement("option");
            elemento.innerHTML = listaBuscada[i].trackName;
            lista.appendChild(elemento);
        }

    }

    function actualizaFicha(miLista){
    //Actualiza la ficha una vez elegida la cancion

        //Determino la opcion elegida
        var miCancion = listaBuscada[miLista.selectedIndex];    
        
        //Actualizo la ficha
        document.getElementById("img1").src=miCancion.artworkUrl100;
        document.getElementById("titulo1").innerHTML=miCancion.trackName;
        document.getElementById("autor1").innerHTML=miCancion.artistName;
        document.getElementById("precio1").innerHTML=miCancion.trackPrice + "$";
        document.getElementById("oculto1").innerHTML=miCancion.trackId;
        document.getElementById("audio1").src=miCancion.previewUrl;
    }

    function enviarPedido(){
    //Enviar el objeto pedido mediante un JSON
        //Compongo el objeto de compra y lo serializo en miJSON
        var miPedido = {
            precio: document.getElementById("precio1").innerHTML,
            listado: [document.getElementById("oculto1").innerHTML]
        };

        //Envio la peticion al sevidor del profe
        //var miURL="http://10.1.2.10:8080/appwebprofe/Comprar";
        //enviarJSON(miURL, miPedido);

        //Pruebo con la nueva funcion a enviar la peticion
        var miJSON = JSON.stringify(miPedido);
        miAjaxPOST("http://10.1.2.10:8080/appwebprofe/Comprar", miJSON, function(respuesta){
            console.log("La nueva respuesta es " + respuesta); 
        });
    }

    function enviarJSON (dirServidor, miObjeto){
    //Recibe un objeto miObjeto y lo envia como un JSON al servidor
    //Hace un alert cuando recibe la respuesta
            console.log("Peticion al servidor miObjeto como un JSON");
        
        //Parametros para configurar el request XHR    
        var ficheroJSON = new String;
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
                    console.log ("Mensaje enviado. Respuesta: " + peticionXHR.responseText);
                    alert( peticionXHR.status);
            }
        }

        //LLamo al servidor de manera asincrona (true) y le envio el fichero JSON 
        peticionXHR.onreadystatechange = procesarRespuesta;             //Configuro un listener asincrono segun el estado de la peticion
        peticionXHR.open('POST', DIR_SERVICIO, true);                   //Configuro el tipo de peticion (GET), servidor+servicio y asincrono(true)    
        peticionXHR.setRequestHeader('Content-Type', 'application/json');   //Configuro el tipo de mensaje a enviar
        peticionXHR.send(ficheroJSON);  
    }

    function miAjaxPOST(miUrl, miJSON, miCallback) {
    //Llamada POST asincrona a un servidor (miUrl) y llamando a miCallback pasandole request.resposeText
    //La funcion miCallback se lama con el parametro responseText devuelto, o -1 si hay error
    //La funcion es llamada con un -1 en caso de error
    //Ejemplo de llamada a esta funcion:
    //miAjaxPost("http://10.1.2.10:8080/appwebprofe/Comprar", miJSON, function(respuesta){
    //console.log("La respuesta es " + respuesta); });
    
        var request = new XMLHttpRequest(); 
        request.open("POST", miUrl, true);                          //Asincrona = true
        
        //Creo el listener que llama a 'miCallback'
        request.onreadystatechange= function() {
                console.log("readyState: " + this.readyState)
            if (this.readyState==4){
                // Cuando readyState es 4 ya se ha recibido la respuesta por parte del servidor
                //Actualizo la variable global de cifrado, y cambio el mensaje de la web
                    console.log ("Mensaje enviado. responseText: " + this.responseText);
                    console.log ("Mensaje enviado. status: " + this.status);
                miCallback(this.responseText)
            }
        };

        //CReo el listener que gestiona los errores 
        request.addEventListener("error", function(){
            miCallback(-1);                                         //Devuelve -1 en caso de error 
            console.error("miAjaxPOST error: network error");            //La llamada al servidor a fallado
        });

        //Finalmente lanzo la peticion al servidor
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(miJSON);
    }

    function miAjaxGet(miUrl, miCallback) {
    //Llamada GET asincrona a un servidor (miUrl) y llamando a miCallback pasandole request.resposeText
    //La funcion es llamada con un -1 en caso de error
    //Ejemplo de llamada a esta funcion:
    //miAjaxGet("http://localhostx:3000/imagenes", function(respuesta){
    //console.log("La respuesta es " + respuesta); });
            
        var request = new XMLHttpRequest(); 
        request.open("GET", miUrl, true);                       //Asincrona = true
        
        //Creo el listener que llama a 'miCallback'
        request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {      //Status ha ideo bien
            miCallback(request.responseText);                       //Llamo a miCallback con la respuesta    
        } else {
            miCallback(-1);                                         //Devuelve -1 en caso de error 
            console.error("miAjaxGET error: " + request.status + "- " + request.statusText); //Error de servidor
        }
        });

        //CReo el listener que gestiona los errores 
        request.addEventListener("error", function(){
            miCallback(-1);                                         //Devuelve -1 en caso de error 
            console.error("miAjaxGET error: network error");            //La llamada al servidor a fallado
        });

        //Finalmente lanzo la peticion al servidor
        request.send(null);
    }
    