//Arranca el script
    console.log("Arranca el script 17-forumlarioSelect");
    window.onload = actualizaBaseDatos;

//Variables y constantes globales
//----------------------------------------------//

//Funciones locales
//----------------------------------------------//

    function actualizaBaseDatos (){
    //Recupero del servidor la ista de departamentos y actualizo el desplegable
    //Los ID de departamento se guardan en option.value, y el nombre en option.innerHTML
        const miUrl = "http://10.1.2.10:8080/appwebprofe/CargaMenuSelect";  //Direccion del servidor con la Base de Datos
        var miBaseDatos={};                                                 //Almacena los datos de la base de datos

        miAjaxGet(miUrl, function (request){
            if (request.status==200){
                miBaseDatos=JSON.parse(request.responseText)
                
                //Actualizo el desplegable
                var miSelect = document.getElementById("lista1");
                miSelect.innerHTML="";                              //Vacio la lista pre-existente
                for (var i=0; i < miBaseDatos.length;i++ ){
                    var nuevaOpcion= document.createElement("option");
                    nuevaOpcion.innerHTML = miBaseDatos[i].nombre;
                    nuevaOpcion.value = miBaseDatos[i].numero;          //Guardo aqui el numero de departamento que uso para buscar en su BBDD
                    miSelect.appendChild(nuevaOpcion);
                }
            } 
        });
    }

    function actualizaEmpleados(departamentoID) {
    //Recupero la lista de empleados cuando se cambia la seleccion
        const miUrl = "http://10.1.2.10:8080/appwebprofe/CargarTrabajadores?dpto=" + departamentoID;  //Direccion del servidor con la Base de Datos
        var respuesta;

        miAjaxGet(miUrl, function (request){
            if (request.status==200){
                respuesta=JSON.parse(request.responseText)
                
                //Actualizo la caja de texto con los nombre de los empleados
                var miTexto = document.getElementById("texto1");
                miTexto.innerHTML="";                              //Vacio la lista pre-existente
                for (var i=0; i < respuesta.length;i++ ){
                   miTexto.innerHTML += respuesta[i].nombre + "\n";
                }
            } 
        });        
    }

    function inicia() {
    //Inicializo la pagina html (cuando se pulsa el boton en esta plantilla)
        console.log("Arranco la inicializacion");
        //var arrayLocal = [];
        //var varLocal = 0;   
    }

    function miAjaxGet(miUrl, miCallback) {
    //Llamada GET asincrona a un servidor (miUrl) y llamando a miCallback cuando corresponda
    //La funcion es llamada con un -1 en caso de error
    //La funcion miCallback recibe la respuesta recibida con sus propiedades: this.status, this.responseText, ...
    //Ejemplo de llamada a esta funcion:
    //miAjaxGet("http://localhostx:3000/imagenes", function(respuesta){
    //console.log("La respuesta es " + respuesta); });
    
        var request = new XMLHttpRequest(); 
        request.open("GET", miUrl, true);                       //Asincrona = true
        
        //Creo el listener que llama a 'miCallback'
        request.addEventListener("load", function() {
        if (request.status >= 200 && request.status < 400) {    //Status ha ido bien
            miCallback(request);                                //Llamo a miCallback con la respuesta    
        } else {
            miCallback(-1);                                     //Devuelve -1 en caso de error 
            console.error("miAjaxGET error: " + request.status + "- " + request.statusText); //Error de servidor
        }
        });

        //Creo el listener que gestiona los errores 
        request.addEventListener("error", function(){
            miCallback(-1);                                         //Devuelve -1 en caso de error 
            console.error("miAjaxGET error: error de conexión");        //La llamada al servidor ha fallado
        });

        //Finalmente lanzo la peticion al servidor
        request.send(null);
    }
