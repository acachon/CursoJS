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

    ////////////////////////////////////////////////////////////////////////////////////