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
    var indexFoto = 0;              //Indece de la foto activa

//Funciones locales

    function activaCarrusel (intervalo){
        //CRea una secuencia para cambiar la imagen de entre las contenidas en la lista
        //Toma el intervalo como input de la casilla input1
        var intervalo = document.getElementById("input1").value;
        
        if (idCarrusel!=0) {
            clearInterval(idCarrusel);
        }
        
        idCarrusel = setInterval(cambiaFoto, intervalo);    //Identificador del intervalo es global
    }

    function cambiaFoto(){
        //Cojo el siguiente elemento que sigue al indiceActual, salvo si es el ultimo y me vuelvo a cero
        imagen.src = listaImagenes[(indexFoto + 1) % listaImagenes.length ];
        indexFoto ++;         
    }

    function muestraImg(idImg) {
        //Muestro la imgagen correspondiente al boton pulsado
            console.log("Indice: "+ idImg);

        //Desactivo si existe el carrusel
            clearInterval(idCarrusel);
            idCarrusel=0;

        //Actualizo el contenido de la imagen segun el boton pulsado
        imagen = document.getElementById("img1");
        imagen.src = listaImagenes[idImg-1];
        indexFoto = idImg-1;
    }
        