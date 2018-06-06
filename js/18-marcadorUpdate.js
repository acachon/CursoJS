//Arranca el script
    console.log("Arranca el script");

//Variables y constantes globales
    const miUrl="http://10.1.2.10:8080/Marcador/ActualizarInfoPartido";
    var miMarcador = {};
    var idSecuencia;
    const SEGUNDOS=5;
    
    window.onload = actualizaAuto;

//Funciones locales

    function actualizaAuto(){
    //Actualiza periodicamente la pagina
        idSecuencia = setInterval(actualizaMarcador,SEGUNDOS*1000);
    }

    function actualizaMarcador() {
    //Recupera la informacion actualizada del servidor
            console.log("Solicito informacion actualizada al servidor");
        
        //Hago la peticion AJAX al servidor del profesor
        miAjaxGet(miUrl,rellenaCampos);
    }

    function rellenaCampos(request){
    //Actualiza cada campo con la informacion recibida y actualizada
        if (request.status !==200 || request == -1){
            console.log("Servidor devuelve un error: " + request.statusText);
        }else {
            miMarcador =  JSON.parse(request.responseText);
            
            //Actualizo la foto
            document.getElementById("foto1").src = "http://10.1.2.10:8080/Marcador/" + miMarcador.fotopartido;
            
            //Actualizado goles
            document.getElementById("marcador1").innerHTML=miMarcador.marcador.goles_local;
            document.getElementById("marcador2").innerHTML=miMarcador.marcador.goles_visitante;
            
            //Actualizo los comentarios
            var minuto;
            var texto;
            var nuevoComentario;

            //Vario los comentarios pre-existentes
            document.getElementById("comentarios").innerHTML="";

            for (var i=0; i<miMarcador.listacomentarios.length; i++){
                minuto = miMarcador.listacomentarios[i].minuto;
                texto = miMarcador.listacomentarios[i].comentario;
                //Creo un nuevo comentario
                nuevoComentario = document.createElement("option");
                nuevoComentario.id="min"+minuto;
                nuevoComentario.innerHTML   =   "Minuto " + minuto + ": " + texto;
                document.getElementById("comentarios").appendChild(nuevoComentario);
            }
        }
    }

    function compartir(){
    //Muestra un alert con el mensaje a compartir que se ha seleccionado del listado
        //Mato el proceso de actualizacion automatica (se reactiva con el refresh de la html) 
        clearInterval(idSecuencia);
        
        //Comparto el comantario
        var indice = document.getElementById("comentarios").selectedIndex;
            console.log("Indice elegido: " + indice);
        if (indice<0){
            alert("Debes elegir uno de los comentarios para compartir !!");
        } else{
            alert("Gracias por compartir \n" + document.getElementById("comentarios").options[indice].value);
        }
    }

//Bibliotecas
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
