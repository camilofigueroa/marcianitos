<html>
    <head>
        <title></title>
        
        <link rel="stylesheet" type="text/css" href="css/estilo.css">
        
    </head>
    
    <body>
        
        <div id="contenedor-juego">
            
            <div id="contenedor-marcianitos"></div>
            
            <div id="tanque">M|M</div>
            
            <div id="bala0" class="bala">|</div>
            <div id="bala1" class="bala">|</div>
            <div id="bala2" class="bala">|</div>
            <div id="bala3" class="bala">|</div>
            <div id="bala4" class="bala">|</div>
            <div id="bala5" class="bala">|</div>
            <div id="bala6" class="bala">|</div>
            <div id="bala7" class="bala">|</div>
            <div id="bala8" class="bala">|</div>
            <div id="bala9" class="bala">|</div>
            
            <a href="#" onclick="izquierda();">Izquierda.</a>
            <a href="#" onclick="disparar();">Disparar.</a>
            <a href="#" onclick="derecha();">Derecha.</a>
            
        </div>        
      
        <br>
        
        <div id="formulario-puntaje">
            <form action="guardar.php" method="get">

                <?php 

                    include( "modelo/Datos.php" );
                    echo Datos::escribir_lista();
                
                ?>

                <input type="text" id="texto-puntaje" name="puntaje" value="0">
                <input type="submit" value="Enviar">
            </form>
        </div>
        
        <script src="js/juego.js"></script>
        
    </body>
</html>