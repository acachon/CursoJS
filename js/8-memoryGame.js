//Variables globales

    // imgVisibles lleva el contador de imagenes destapadas, cartas boca arriba
    var imgVisibles = 0;
    var miTabla;            //Almacena el objecto tabla donde esta el tablero de juego
    var miObjeto = new Image;   //Creo un objeto imagen por defecto
    
    
    //Imagenes que reparto por el tablero
    const imgSrc1="./images/obeso.png"; 
    const imgSrc2="./images/delgado.png";
    const imgSrc3="./images/desnutrido.png";
    const parejas = [imgSrc1,imgSrc2,imgSrc3]; //Array con las parejas posibles

    //Inicializao el objeto por defecto con una de las imagenes
    miObjeto.src = imgSrc1;
    miObjeto.style.visibility = "visible";

// Funciones locales

    function inicia() {
    // Inicializo el tablero y barajo las imagenes entre las casillas
        //Creo una tabla de la dimension indicada
        var dimension = document.getElementById("input1").value;
        var miTabla = document.getElementById("nuevaTabla");
        creaTabla(miTabla,dimension,dimension,miObjeto);
        
        //0. Creo un listener para cada div
        var lista_divs = document.querySelectorAll("div");
        for (var i = 0; i < lista_divs.length; i++) {
            lista_divs[i].addEventListener('click', cambiaVisibilidad);
        }
        //1. Oculto todas las imagenes
        ocultaImagenes();
        //2. Cambio aleatoriamente las imagenes de cada casilla
        barajaDivs(lista_divs);   
    }

    function barajaDivs(Divs){
    // Asigno una de las dos imagenes aleatoriamente a cada casilla
        //Genero un nuevo array aleatorio
            console.log("2. Barajo las imagenes");
        var nuevaDivs= [];
        var inputDivs= [];
            //Creo un array ya que Divs es una lista                    
        for (var i=0; i<Divs.length; i++){
            inputDivs[i]=Divs[i];
        }
        arrayRandom(inputDivs,nuevaDivs);
        
        //Asigno una foto alternativamente a cada div 
        //TODO: meter mas fotos al menos hasta 4 parejas
        var imgSrc="";
        for (var i=0; i<nuevaDivs.length; i++){
            //Elijo una carta aleatoria como src de la img de cada casilla cada 2 casilla
            //ASi siempre asigno la misma a 2 casillas, es decir, por parejas 
            if (i%2==0){    //Cada 2 casillas saco otra carta
                var aleatorio = Math.floor(Math.random() * (parejas.length));    //Indice aleatorio dentro del tama;o del array de cartas
                imgSrc = parejas[aleatorio];
            }
            nuevaDivs[i].firstElementChild.src=imgSrc;
                console.log("2. Imagen(" + i + ") : " + imgSrc);
        }
    } 

    function ocultaImagenes(){
    // Pongo todas las imagenes en oculto. Todas las cartas boca abajo.
        var lista_divs = document.querySelectorAll("div");
        for (var i = 0; i < lista_divs.length; i++) {
            lista_divs[i].firstElementChild.style.visibility="hidden";
        }
        document.getElementById("p1").innerHTML="Cartas ocultadas !!" + "<br>";
            console.log("1. Oculto las imagenes");
    }        

    function cambiaVisibilidad(evento) {
    //target, es el elemento tocado
    //currentTarget, es el elemento contenedor del elemento tocado
    // Si no lo hago as'i, y cojo directamente target (elemento img), 
    //al ponerlo en hidden luego no puedo volver a clickar sobre el porque ya no esta
    //haciendo esto, el objeto div sigue existiendo, aunque su hijo img este hidden
        var img_tocado = evento.currentTarget.firstElementChild;
        var estilo = img_tocado.style.visibility;
        if (estilo == 'visible' || estilo == '') {
            img_tocado.style.visibility = 'hidden';
            imgVisibles -= 1;
        }
        else {
            img_tocado.style.visibility = 'visible';
            imgVisibles += 1;
            //sleep(2000);
            compruebaPareja();
        }
    }

    function compruebaPareja(){
    // Aqui esta la logica del juego. determino si las dos cartas boca arriba son iguales
    // Si no son iguales o es otro el numero de cartas levantadas, sigo jugando
    // Ojo con los alert porque pasan el control a window y no se actualizan las propiedades
    // como visibility, al igual que si meto un setTimeout
    //TODO: cambiar la logica de juego aqui para que tenga que encontrar todas las parejas 

        if (imgVisibles==1){
            //alert("Encuentra su pareja");
            document.getElementById("p1").innerHTML = "Encuentra su pareja!!";

        } else if (imgVisibles==2){
            var ganador = sonIguales();
            if (ganador){
                //alert("Enhorabuena, juega otra vez");
                document.getElementById("p1").innerHTML = "Enhorabuena, has encontrado la pareja !!";
            } 
            else{
                document.getElementById("p1").innerHTML = "Mala suerte, intentalo de nuevo !!";
                //alert("Mala suerte, juega otra vez");
            }                  
        } else if (imgVisibles==3){
            imgVisibles=0;
            ocultaImagenes();
        }
    }

    function sonIguales(){
    // Determino si las imagenes levantadas, visibles, son iguales
    // Precondicion: solo hay dos imagenes levantadas    
        var pareja=[];
        var lista_imgs = document.querySelectorAll("img");
        for (var i = 0; i < lista_imgs.length; i++) {
            if (lista_imgs[i].style.visibility=="visible"){
                pareja.push (lista_imgs[i].src);
            }   
        }
        if (pareja[1]==pareja[0]){
            return(true);
        } 
        else {
            return(false);
        }                
    }
        
    function arrayRandom (arrayEntrada, arraySalida){
    // Devuelve arraySalida, con los elementos del arrayEntrada ordenados aleatoriamente
    // arraySalida: es un array vacio o vaciable, donde devolvere el array barajado
    // Precond: el array salida debe estar vacio
    // Algoritmo: elijo un elemento del arrayEntrada al azar y lo llevo al de salida (inicialmente vacio)
    //  copio el ultimo de Entrada en la posicion al azar elegida y elimino el ultimo
    //  con ese nuevo array con una posicion menos, vuelvo a hacer lo mismo.
    
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
        arrayRandom (arrayEntrada, arraySalida);    
    }

    function creaTabla (inputTabla, filas, columnas, objeto){
    //CRea una tabla con un numero de filas y columnas
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
      