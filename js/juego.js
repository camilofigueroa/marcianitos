
var tanque_x = 0;
var marcianos_left = 10;
var marcianos_top = 30;
var contenedor_juego = "";
var sentido_movimiento = 1;
var balas = [];
var n_balas = 0;
const n_marcianos = 900; //Es el intervalo sobre el cual se generan. No es el número de marcianos.
var movimiento_vertical = 20;
var puntaje = 0;

/************************* C A R G U E ***********************************************/
window.onload = function()
{
    /*var pp = "400px";
    console.log( pp.replace( "px", "" ) );*/

    console.log( "Iniciando." );
    contenedor_juego = document.getElementById( "contenedor-juego" );
    organizadora_marcianitos();
    setInterval( jugar, 1000 );
}

/****************************** J U G A D O R *********************************************/
function jugar()
{
    //console.log( Math.random() );
    mover_marcianitos();
    mover_bala();
}

function izquierda()
{   
    var tanque = document.getElementById( "tanque" );
    tanque_x -= 10;
    tanque.style.left = tanque_x + "px";
    //console.log( "Izquierda" );
}


function derecha()
{
    var tanque = document.getElementById( "tanque" );
    tanque_x += 10;
    tanque.style.left = tanque_x + "px";
    //console.log( "Derecha" );
}

function disparar()
{
    //contenedor_juego
    //console.log( "Disparo" );

    balas.push( [ tanque_x, 450, "bala" + n_balas, 1 ] );

    document.getElementById( "bala" + n_balas ).style.left = balas[ n_balas ][ 0 ];
    document.getElementById( "bala" + n_balas ).style.top = balas[ n_balas ][ 1 ];
    //contenedor_juego.innerHTML += "<div id='bala0' style='position: absolute; left: 30px; top: 450px;'>|</div>";
    
    n_balas ++;

    //console.log( balas );
}

/******************************** M A Q U I N A *********************************/
function mover_bala()
{
    //console.log( balas.length );

    //Hay balas en el juego.
    if( balas.length > 0 )
    {
        //console.log( ":::::::::" );
        
        for( var i = 0; i < balas.length; i ++ )
        {
            balas[ i ][ 1 ] -= 20;
            document.getElementById( "bala" + i ).style.top = balas[ i ][ 1 ] + "px";
        }        

        comprobacion_colision();
    }
}


function mover_marcianitos()
{
    //var marcianos_left = 10;
    //var marcianos_top = 30;
    var contenedor_marcianitos = document.getElementById( "contenedor-marcianitos" );
    //var tmp_txt = contenedor_marcianitos.style.left;
    //tmp_txt = tmp_txt.replace( "px", "" );
    //tmp_txt = parseInt( tmp_txt );
    
    //Avanzando.
    marcianos_left += 5 * sentido_movimiento;
    contenedor_marcianitos.style.left = marcianos_left + "px";
    contenedor_marcianitos.style.top = marcianos_top + "px";

    //console.log( marcianos_left + 920 );

    //Si excede la margen derecha, devuelvase.
    if( marcianos_left + 920 >= 996 )
    {
        //console.log( "Devolver." );
        sentido_movimiento = -1;
        marcianos_top += movimiento_vertical;
    }

    //Si excede la margen izquierda, devuelvase.
    if( marcianos_left <= 0 )
    {
        //console.log( "Devolver." );
        sentido_movimiento = 1;
        marcianos_top += movimiento_vertical;
    }

    //console.log( contenedor_marcianitos.style.left );
    //console.log( contenedor_marcianitos.style.height );
    //console.log( tmp_txt );
}

function comprobacion_colision()
{
    var texto_puntaje = document.getElementById( "texto-puntaje" );
    var txt_bala = "";

    //Ciclo marcianos
    for( var i = 0; i <= n_marcianos; i = i + 20 )
    {
        //Ciclo balas.
        for( var j = 0; j < balas.length; j ++ )
        {
            if( i + marcianos_left >= balas[ j ][ 0 ] - 5 && i + marcianos_left <= balas[ j ][ 0 ] + 5 )
            {
                if( marcianos_top >= balas[ j ][ 1 ] && marcianos_top <= balas[ j ][ 0 ] + 10 )
                {
                    //Una bala activa, colisiona.
                    if( balas[ j ][ 3 ] == 1 )
                    {
                        //console.log( "Le dimos al marciano " + i );
                        document.getElementById( "m" + i ).style.visibility  = "hidden";
                        balas[ j ][ 3 ] = 0;
                        document.getElementById( balas[ j ][ 2 ] ).style.visibility = "hidden";
                        puntaje ++;
                        //console.log( puntaje );
                        texto_puntaje.value = puntaje;   
                        //Puntaje.
                    }
                }
                
            }
        }        
    }

    //for( var i = 0; i <= n_marcianos; i = i + 20 )
    //console.log( "-> " + marcianos_left );

    /*txt_bala += "<div style='position: absolute; left: " + balas[ 0 ][ 0 ] + "px;"; 
    txt_bala += " top: " + balas[ 0 ][ 1 ] + "px; border: 1px solid; ";
    txt_bala += " width: 10px; height: 20px; '>.";
    txt_bala += "</div>";

    contenedor_juego.innerHTML += txt_bala;*/
    
}

/********************************************************************************/

function organizadora_marcianitos()
{
    var marcianos = "";    
    var estilo = "";
    var tipo_marciano = "";  
    var contenedor_marcianitos = document.getElementById( "contenedor-marcianitos" );
    
    for( var i = 0; i <= n_marcianos; i = i + 20 )
    {
        if( Math.random() <= 0.5 ){ tipo_marciano = "X"; }
        else{ tipo_marciano = "O"; }

        estilo = "style='position: absolute; left: " + i + "px;";
        //marcianos += "<div id='m" + i + "' " + estilo + "'>" + tipo_marciano + "</div>";
        marcianos += "<div id='m" + i + "' " + estilo + "'>" + ( i / 10 ) + "</div>";
    }    
    
    contenedor_marcianitos.innerHTML = marcianos;
    contenedor_marcianitos.style.left = marcianos_left + "px";
    contenedor_marcianitos.style.top = marcianos_top + "px";

    contenedor_marcianitos.innerHTML += "<div style='position: absolute; left: 920px'>*</div>";   

}