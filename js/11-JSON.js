//Arranco mi script
    console.log("Arranca el script");


//Declaro mis variables globales
    var persona = {
        nombre:"" ,
        edad:""
    };

    


//Proceso los datos enviados al pulsar el boton

    function enviarForm(){
        //Ejecuto una accion al pulsar el boton1
        
        //Cargo los inputs en mi objeto persona
        persona.nombre = document.getElementById("nombre").value;
        persona.edad = document.getElementById("edad").value;
        
        //Lo serializo, lo paso a una cadena de texto, lo paso a un JSON file
        var personaJSON = JSON.stringify(persona);
            console.log(personaJSON);

        //Lo muestro en un pop up
        var mensaje = "Hola, " + persona.nombre + "\n" + "No estas mal para tener " + persona.edad + " tacos";
        alert(mensaje);
        
        //Lo meto en la misma pagina
        document.getElementById("mensaje1").innerHTML=mensaje;
    }
















////////////////////////////////////////////////////////////////////    
//Declaro mis variables globales
    const DIR_SERV = "http://10.1.2.10:8080/appwebprofe/RegistrarPersona";
    const MI_URL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
    var peticionXHR = new XMLHttpRequest();

//Hago el request al servidor 
    peticionXHR.open('GET', MI_URL);    //Abro el canal
    peticionXHR.responseType = 'json';      //Declaro el formato de dicho archivo a traer
    peticionXHR.send();                     //Envio la peticion finalmente al servidor

//Programo un evento, "cuando finalice la descarga del request", para lanzar mis acciones    
    peticionXHR.onload = function() {
        var respuestaXHR = peticionXHR.response;
        usoJSON(respuestaXHR);
        };

//Manejo la informacion recibida
    function usoJSON (miJSON){
    // Ejecuto las acciones que quiera sobre los datos del fichero JSON importado    
        console.log("Arranco el procesado de miJSON");
    }

