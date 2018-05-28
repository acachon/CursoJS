//Arranca el script
    console.log("Arranca el script buscaCancion");

//Variables y constantes globales
    var listaBuscada;       //Guardo la lista devuelta como resultado de la busqueda
    var opcion;             //Guardo la opcion seleccionada con el desplegable


//Funciones locales

    function buscaListado() {
    //Busco el listado de canciones buscadas en iTunes 
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
            actualizaListado(listaBuscada); });

        //Actualizo el listado mediante un listener de la resuesta de iTunes
        //actualizaListado();
    }

    function actualizaListado(listado){
    //Actualiza el listado de canciones apartir de un JSON con child "title"
        var lista = document.getElementById("lista1");
        
        //Borro cualquier elemento de la lista preexistente
        lista.innerHTML="";

        //Creo una nueva opcion por cada elemento del objeto pasado
        for (var i=0; i<listado.length; i++){
            var elemento = document.createElement("option");
            elemento.innerHTML = listaBuscada[i].trackName;
            lista.appendChild(elemento);
        }

    }

    function actualizaOpcion(valor){
    //Actualizo el valor de la variable global opcion y la ficha mostrada
        opcion = valor;
        
        //Actualizo la ficha con la nueva opcion
        actualizaFicha();
    }

    function actualizaFicha(){
    //Actualiza la ficha una vez elegida la cancion
        var miCancion;
    
        //Busco el titulo en el listado e identifico el objeto concreto, miCancion
        var i=0;
        
        do {
            miCancion = listaBuscada[i];
        } while (listaBuscada[i++].trackName!=opcion)
            
        document.getElementById("img1").src=miCancion.artworkUrl100;
        document.getElementById("titulo1").innerHTML=miCancion.trackName;
        document.getElementById("autor1").innerHTML=miCancion.artistName;
        document.getElementById("precio1").innerHTML=miCancion.trackPrice + "$";
        document.getElementById("audio1").src=miCancion.previewUrl;
    }

    function miAjaxGet(miUrl, miCallback) {
    //Llamada GET asincrona a un servidor (miUrl) y llamando a miCallback cuando corresponda
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