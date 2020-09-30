<?php

    include( "modelo/Datos.php" );

    $puntaje = 0;
    $usuario = "";

    if( isset( $_GET[ 'puntaje' ] ) ) $puntaje = $_GET[ 'puntaje' ];
    if( isset( $_GET[ 'lista-usuarios' ] ) ) $usuario = $_GET[ 'lista-usuarios' ];

    //echo $usuario." ".$puntaje;
    Datos::guardar_puntaje( $usuario, $puntaje );

    echo Datos::ranking();

    echo "<a href='index.php'>Volver</a>";
    
