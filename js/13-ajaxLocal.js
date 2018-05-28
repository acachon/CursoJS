/* Peticion sincrona al servidor local
// Creación de la petición HTTP SINCRONA
var req = new XMLHttpRequest();
// Petición HTTP GET síncrona hacia el archivo fotos.json del servidor
req.open("GET", "http://localhost:3000/imagenes", false);
// Envío de la petición
req.send(null);
// Impresión por la consola de la respuesta recibida desde el servidor
console.log(req.responseText);
*/

/*Sin gestion de errores, Happy path only !!
// Creación de la petición HTTP ASINCRONA
var req = new XMLHttpRequest();
// Petición HTTP GET asíncrona si el tercer parámetro es "true" o no se especifica
req.open("GET", "http://localhost:3000/imagenes", true);
// Gestor del evento que indica el final de la petición (la respuesta se ha recibido)
req.addEventListener("load", function() {
    // Muestra la respuesta recibida
    console.log(req.responseText);
});
// Envío de la petición
req.send(null);
*/

/*
// Creación de la petición HTTP ASINCRONA con gestion de ERRORES
var req = new XMLHttpRequest();
// Petición HTTP GET asíncrona si el tercer parámetro es "true" o no se especifica
req.open("GET", "http://localhostXX:3000/imagenes", true);
// Gestor del evento que indica el final de la petición (la respuesta se ha recibido)
req.addEventListener("load", function() {
  // La petición ha tenido éxito
  if (req.status >= 200 && req.status < 400) {
      console.log(req.responseText);
  } else {
    // Se muestran informaciones sobre el problema ocasionado durante el tratamiento de la petición
    console.error(req.status + " " + req.statusText);
  }
});
// Gestor del evento que indica que la petición no ha podido llegar al servidor
req.addEventListener("error", function(){
  console.error("Error de red"); // Error de conexión
});
// Envío de la petición
req.send(null);
*/

//Hago el GET asincrono mediante mi funcion generica
// Recuerda para arrancar el servidor local desde linea de comandos...
// Vete al directoriodel servidor cd ./server/
// Levanta el servidor con "json-server --watch data/db.json"
//Llamo a mi funcion personalizada con un callback ad hoc
miAjaxGet("http://localhost:3000/imagenes", function(respuesta){
  console.log("La respuesta es " + respuesta);
});

miAjaxGet("http://localhost:3000/imagenes", function(respuesta) {
  // Transformación de formato JSON a un objeto javascript
  var imagenes = JSON.parse(respuesta);

  // Por cada elemento del objeto imagenes creo una nueva img en html y le asocio su fuente
  imagenes.forEach(function(elemento) {
    var nuevaImg = document.createElement("img");
    nuevaImg.src = elemento.thumbnailUrl;
    document.getElementById("imagenes").appendChild(nuevaImg);
  });
});

//Funcion generica 
function miAjaxGet(miUrl, miCallback) {
//Llamada GET asincrona a un servidor (miUrl) y llamando a miCallback cuando corresponda
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

