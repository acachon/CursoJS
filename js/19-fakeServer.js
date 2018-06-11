/*
Creo un servidor ficticio con ayuda de la web https://my-json-server.typicode.com
Solo hay que subir un fichero db.json como el creado aqui en miDb
Originalmente viene con los objetos posts y profile
Yo he creado una clase nueva "personas" con sus atributos a mi discrecion
Luego lo subes aun repositorio en tu Github y listo para llamarlo como sigue:
    GET--> "https://my-json-server.typicode.com/acachon/myServer/personas"
    POST --> "https://my-json-server.typicode.com/acachon/myServer/profile"

*/

//Arranco mi script
    console.log("Arranca el script");

//Declaro mis variables globales
    var persona = {
        nombre:"",
        estatura: "",
        peso: "",
        edad:""
    };

    var miDb =   {
        "posts": [
          {
            "id": 1,
            "title": "hello"
          },
          {
            "id": 2,
            "title": "Adios"
          }
        ],
        "profile": {
          "name": "typicode"
        }, 
        "personas": [
            {
            "nombre": "Jose",
            "estatura": "1.80",
            "peso": 80,
            "edad": 45
            },
            {
            "nombre": "Maria",
            "estatura": "1.60",
            "peso": 55,
            "edad": 19
            },
            {
            "nombre": "Rafa",
            "estatura": "1.70",
            "peso": 75,
            "edad": 30
            }
        ]
    };
    
//Llamo al servidor ficticio
    const miURLGet= "https://my-json-server.typicode.com/acachon/myServer/personas";
    const miURLPost= "https://my-json-server.typicode.com/acachon/myServer/profile";
    
    //Pruebo el POST
    var miDbJson = JSON.stringify(miDb);
    miAjaxPost(miURLPost, miDbJson, miCallbackPost);

    //Pruebo el GET
    miAjaxGet(miURLGet,miCallbackGet);

    function miCallbackGet(respuesta){
        var objeto = JSON.parse(respuesta.responseText); 
            console.log("fakeGET");
            console.log(objeto);
            console.log(respuesta.responseText);
    }

    function miCallbackPost(respuesta){
        var objeto = JSON.parse(respuesta.responseText); 
            console.log("fakePOST");
            console.log(objeto);
            console.log(respuesta.responseText);    
    }


// funciones locales
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

    function miAjaxPost(miUrl, miJSON, miCallback) {
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





