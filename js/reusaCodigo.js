    //console.log("Arranca el script");
    //Declaro las variables globales
    var arrayGlobal = [];
    var varGlobal = 0;

    //Construyo una fucion que inicializa al pulsar el boton
    function inicia(){
    //console.log("Pagina inicializada.");
        var arrayLocal = [];
        var varLocal = 0;
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    // Esta es mi coleccion de funciones reutilizables
    function iniciaListener() {
    //Creo un listener para cada div (u otro elemento) de la pagina
        var lista_divs = document.querySelectorAll("div");
        for (var i = 0; i < lista_divs.length; i++) {
            lista_divs[i].addEventListener('click', elementoOnclick);
        }
    }

    function elementoOnclick(evento) {
    //Cambio un atributo del elemento que me ha generado el evento
    //Ejemplo: permuta el estado de visibilidad de la imagen que esta dentro del div
        var elementoTocado = evento.currentTarget.firstElementChild;
        var atributoEstilo = elementoTocado.style.visibility;
        if (atributoEstilo == 'visible' || atributoEstilo == '') {
            elementoTocado.style.visibility = 'hidden';
        }
        else {
            elementoTocado.style.visibility = 'visible';
        }
    }

    function sleep(miliseconds) {
    //Duerme todo el sistema (para la actualizacion de document !!)
        var currentTime = new Date().getTime();
        while (currentTime + miliseconds >= new Date().getTime()) {
            }
    }

    function arrayShuffle (arrayEntrada, arraySalida){
    // Devuelve arraySalida, con los elementos del arrayEntrada ordenados aleatoriamente
    // Precond: el array salida debe estar vacio
        var numAleatorio =0;
        if (arrayEntrada.length==0){
            return arraySalida;
        }
        //Elijo un elemento aleatorio del arrayEntrada y lo incuyo en el de salida
        numAleatorio = Math.floor (Math.random () * (arrayEntrada.length));
        arraySalida.push(arrayEntrada[numAleatorio]);

        //Copio el ultimo elemento de arrayEntrada en la posicion aleatorio elegida, y lo elimino del final de arrayEntrada
        arrayEntrada[numAleatorio]=arrayEntrada[arrayEntrada.length-1];
        arrayEntrada.pop();

        //Vuelvo a llamar a la funcion recursivamente aunque ahora arrayEntrada es un elemento menos y arraySalida uno mas
        arrayShuffle (arrayEntrada, arraySalida);    
    }

    function creaTabla (inputTabla, filas, columnas, objeto){
    //CRea una tabla con un numero de filas y columnas debajo del objeto TABLE (inputTabla)
    //Incluye un div y un objeto dentro de cada casilla (opcional)

        for (var i=0; i<filas; i++){
            //Creo una fila
            var newRow = document.createElement("TR");

            for (var j=0; j<columnas; j++){
                // Creo una nueva casilla, una nueva columna
                var newCol = document.createElement("TD");
                
                if (objeto instanceof Object){  //Objeto es un parametro opcional
                    //Le doy un objecto por defecto dentro de un div
                    var newDiv=document.createElement("div");   
                    var cloneObjeto = objeto.cloneNode(true);     //Creo un nuevo objeto identico al pasado (sin id !!)
                    newDiv.appendChild(cloneObjeto);
                    newCol.appendChild(newDiv);    
                }
                //Meto la nueva columna en esta fila
                newRow.appendChild(newCol);
            }
            //Meto la nueva fila, ya con sus columnas, dentro del div
            inputTabla.appendChild(newRow);
        }
    }

    function walkTree(node) {
    //Recorro los nodos hijos del node raiz que le paso

        if (node == null) //Cuando ya no es un objeto 
            return;
        // hacer alguna cosa con el nodo
        for (var i = 0; i < node.childNodes.length; i++) {
            walkTree(node.childNodes[i]);
        }
    }

    function misArgumentos(a, b = 1) {
    //Valor por defecto del parametro b es 1
    //REviso cuantos argumentos se le pasan y los devuelvo encadenados
        var result="";
        var output=[];

        for (var i = 0; i < arguments.length; i++) {
            result += arguments[i] + ";";
        }
        output[0]=a*b;
        output[1]=results;
        return output;
    }

    Person.prototype.calculaIMCNum = function() {
    //Agrego un metodos al prototipo de Person
    //Calcula el IMC numerico con el peso y altura del objeto
        return this.altura && this.peso ? this.peso/this.altura/this.altura : -1;
    };

    function pedirJSON(dirServicio, miJSON){
    //Llamo a un servidor para obtener un fichero JSON con la clave
    //Actualizo el String miJSON con la respuesta del servidor (JSON)  
            console.log("Lanzo la peticion al servidor de una nueva clave");
        //const DIR_SERVIDOR = "http://10.1.2.10:8080/appwebprofe/";
        //const SERVICIO = "ObtenerClave";
        //const DIR_SERVICIO = DIR_SERVIDOR + SERVICIO;
        const DIR_SERVICIO = dirServicio;
        var peticionXHR = new XMLHttpRequest();

        //Programo un evento, "cuando finalice la descarga del request", para lanzar mis acciones    
        function procesarRespuesta (){
            //Recojo el valor devuelto por el servidor
                console.log ("Procesar eventos invocado " + peticionXHR.readyState);
            if (peticionXHR.readyState==4){
                // Cuando readyState es 4 ya se ha recibido la respuesta
                    console.log ("El servidor ha devuelto: " +seedCifrado);
                miJSON= peticionXHR.responseText;
            } 
        }

        //LLamo al servidor de manera asincrona (true)
        peticionXHR.onreadystatechange = procesarRespuesta; //Configuro un listener asincrono segun el estado de la peticion
        peticionXHR.open('GET', DIR_SERVICIO, true);        //Configuro el tipo de peticion (GET), servidor+servicio y asincrono(true)    
        peticionXHR.send(null);                             //Llamo al servidor con el XHR ya configurado
    }

    function enviarJSON (dirServidor, miObjeto){
    //Recibe un objeto miObjeto y lo envia como un JSON al servidor
    //Actuliza la variable statusSalida con el mensaje devuelto

            console.log("Peticion al servidor miObjeto como un JSON");
        
        //Parametros para configurar el request XHR    
        var ficheroJSON = new String;
        //const DIR_SERVIDOR = "http://10.1.2.10:8080/appwebprofe/";
        //const SERVICIO = "EnviarMensaje";
        //const DIR_SERVICIO = DIR_SERVIDOR + SERVICIO;
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
                    return peticionXHR.responseText;
            }
        }

        //LLamo al servidor de manera asincrona (true) y le envio el fichero JSON 
        peticionXHR.onreadystatechange = procesarRespuesta;             //Configuro un listener asincrono segun el estado de la peticion
        peticionXHR.open('POST', DIR_SERVICIO, true);                   //Configuro el tipo de peticion (GET), servidor+servicio y asincrono(true)    
        peticionXHR.setRequestHeader('Content-Type', 'application/json');   //Configuro el tipo de mensaje a enviar
        peticionXHR.send(ficheroJSON);                                  //Envio el fichero          
    }    

    function miAjaxGet(miUrl, miCallback) {
    //Llamada GET asincrona a un servidor (miUrl) y llamando a miCallback cuando corresponda
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
    

    ////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////
    // Esta es mi coleccion de instrucciones que me seran utiles

    // Escribe en la pagina html en el elemento "p1"
    // document.getElementById("p1").innerHTML;

    // Metodos utiles de window
    //window.onload (inicia); //Llama a la funcion "inicia";
    //console.log ("Mensaje"); //Escribe en la consola un mensaje;
    //alert ("Pop up"); //Escribe en una ventana emergente;
    //var entrada = prompt ("Dame un input");
    //var arrayCadena = "Cadena".split("");
    //window.setTimeout(myFunction, 3000); //Llama la funcion myFunction tras 3000 ms
    //window.location.href = "http://www.elmundo.es"; //Redirige a una pagina distinta
    //var cloneObjeto = objeto.cloneNode(true); //Clona [valor] de un objeto pasado [por referncia]

    //var elementoTocado = evento.currentTarget;
    //elementoTocado.remove();

    //idSecuencia = setInterval(myFnction,3000);
    //clearinterval(idSecuencia);

    //for (var i = 0, j = 10; i <= j && flag==true; i++, j--){}   //Varias condiciones en bucle

    //Returns a new array execution a function on each element 
    //var a1 = ['a', 'b', 'c'];
    //var a2 = a1.map(function(item) { return item.toUpperCase(); });
    //console.log(a2); // logs A,B,C

    //Execution a function for each element 
    //var a1 = ['a', 'b', 'c'];
    //a.forEach(function(element) { console.log(element);} );
    //logs a, b, c

    //CReo una propiedad para todos los objetos o para uno solo
    //Auto.prototype.color = null;  //Nueva propiedad para todo objeto Auto
    //auto1.color = "negro";        //Nuevo valor de una propiedad de un objeto concreto auto1

    //Valor por defecto. Vale name si no es false (ej undefined, etc ...) y si no ""
    //this.name = name || "default";

    //REcorro elementos de un array
    //for(let valor of ["a", "b", "c"]){
    //    console.log(valor)
    //} // "a", "b", "c"

    //window.onload = function(){myFunction(inputA, inputB)};   //Siquiero pasar parametros
    //window.onload = myFunction;   //sin parametros, para definir la llamada y no para llamar       

    //setInterval(funtion(){myFunction(inputA)},3000); //De nuevo, para pasar parametros necesito esto de funtion (){MyFunction(inputA)}    

    //var indexRecurrencias = setInterval(myFunction,3000); //Cada 3sg llamo a myFunction 

    //Peticion GET a un servidor con mi funcion personalizada miAjaxGET(miUrl, miCallback)
    //miAjaxGet("http://localhostx:3000/imagenes", function(respuesta){
    //console.log("La respuesta es " + respuesta);
    //});

    //Borro cualquier elemento de la lista preexistente
    //divPadre.innerHTML="";

    //Do while (con i++ post incremento metido en la condicion)
    //var salida, i=0;
    //do {
    //    salida = miarray[i].value;
    //} while (miArray[i++].value != "FIN")

    //Determino la opcion de un desplegable de lista (<select>)
    //opcionIndice = miLista.selectedIndex;
    //opcionValor = miLista.option[miLista.selectedIndex].value;
    //
    //O directamente lo meto en la llamada html onchange le paso el indice
    //<select id="lista1" name="listado" onchange="actualizaLista(this.selectIndex)">
    


    ////////////////////////////////////////////////////////////////////////////////////
