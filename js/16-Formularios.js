//Arranca el script
    console.log("Arranca el script 16-Formularios");

//Variables y constantes globales
    //const CONSTANTE_PI=Math.PI;

    //var arrayGlobal = [];
    //var varGlobal = 0;


//Funciones locales

    function validaCampo(evento, etiquetaError) {
    //Compruebo el formato del login
            console.log("Valido el campo: "+ evento.id);
        const campo = ["login","email","password","passwordRepeat"];
        const EXPREG = [
            /^\w{6,12}$/,                                       //login: al menos 6 caracteres
            /^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, //email: email valido
            /^\w{6,15}$/,                                       //password: entre 6 y 15 caracteres
            /^\w{6,15}$/                                        //Este patron no se usa porque aqui reviso que sea igual al password
        ];
        //const campoError = ["errorLogin", "errorEmail", "errorPassword", "errorPasswordRepeat"];

        indiceCampo = campo.indexOf(evento.id);

        //Valido contra el patron y muestro el texto oculto si no valida
        if (!RegExp(EXPREG[indiceCampo]).test(evento.value) && evento.id != "passwordRepeat"){
            etiquetaError.style.display="inline";
                console.log("Validacion del campo erronea: "+ evento.id);
        } else{
            etiquetaError.style.display="none";
        }

        //Valido la contraseña repetida
        if (evento.id == "passwordRepeat"){
            if (evento.value != document.getElementById("password").value) {
                etiquetaError.style.display="inline";
                console.log("Validacion del campo erronea: "+ evento.id);
            }
        }
    }
    
    function enviarFormulario() {
    //Recojo los datos del formulario y lo envio al servidor

        //Construyo el objeto que contiene los datos
        var objetoDatos ={
            nombre: document.getElementById("login").value,
            email: document.getElementById("email").value,
            contraseña: document.getElementById("password").value
        };
        var objetoJSON = JSON.stringify(objetoDatos);

        miAjaxPOST("http://10.1.2.10:8080/appwebprofe/Login", objetoJSON,formularioEnviado)
    }

    function formularioEnviado(respuesta){
    //Espero la respuesta del servidor confirmando que se ha enviado con exito
        console.log ("readyStatus: " + respuesta.readyState);
        console.log ("status: " + respuesta.status);   
    }

    function miAjaxPOST(miUrl, miJSON, miCallback) {
    //Llamada POST asincrona a un servidor (miUrl) y llamando a miCallback pasandole la respuesta al request
    //La funcion miCallback recibe la respuesta recibida con sus propiedades: this.status, this.responseText, ...    //La funcion es llamada con un -1 en caso de error
    //La funcion es llamada con un -1 en caso de error
    //Ejemplo de llamada a esta funcion:
    //miAjaxPost("http://10.1.2.10:8080/appwebprofe/Comprar", miJSON, function(respuesta){
    //console.log("La respuesta es " + respuesta.responseText); });
    
        var request = new XMLHttpRequest(); 
        request.open("POST", miUrl, true);              //Asincrona = true
        
        //Creo el listener que llama a 'miCallback'
        request.onreadystatechange= function() {
            if (this.readyState==4){                    // Cuando readyState es 4 ya se ha recibido la respuesta por parte del servidor
                miCallback(this)
            }
        };

        //CReo el listener que gestiona los errores 
        request.addEventListener("error", function(){
            miCallback(-1);                                         //Devuelve -1 en caso de error 
            console.error("miAjaxPOST error: error de conexión");   //La llamada al servidor a fallado
        });

        //Finalmente lanzo la peticion al servidor
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        request.send(miJSON);
    }
