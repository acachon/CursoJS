//Arranca el script
    console.log("Arranca el script");


//Variables y constantes globales
    //Imagenes alternativas
    const imgSrc1="./images/obeso.png"; 
    const imgSrc2="./images/delgado.png";
    const listaImagenes = [imgSrc1,imgSrc2]; 

    //ariable global con el objeto mostrado
    var imagen = new Image;         //Imagen del escaparate
    var idCarrusel=0;               //ID del setIntervalo activo
    var indexFoto = 0;

//Funciones locales

    function activaCarrusel (){
        //Cambia secuencialmente la imagen de entre las contenidas en el la lista
        var intervalo = document.getElementById("input1").value;
        idCarrusel = setInterval(cambiaFoto, intervalo);    //Identificador del intervalo es global
    }

    function cambiaFoto(){
        //Cojo el siguiente elemento que sigue al indiceActual, salvo si es el ultimo y me vuelvo a cero
        imagen.src = listaImagenes[(indexFoto+1) % listaImagenes.length ];
        indexFoto ++;         
    }

    function muestraImg(idImg) {
        //Muestro la imgagen correspondiente al boton pulsado
            console.log("Indice: "+ idImg);

        //Desactivo si existe el carrusel
            clearInterval(idCarrusel);

        //Actualizo el contenido de la imagen segun el boton pulsado
        imagen = document.getElementById("img1");
        imagen.src = listaImagenes[idImg-1];
        indexFoto = idImg-1;
    }
        