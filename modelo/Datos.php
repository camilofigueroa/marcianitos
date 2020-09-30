<?php

    class Datos
    {
        static function conectar()
        {
            return mysqli_connect( "localhost", "root", "", "bd_marcianitos" );
        }

        /**
         * Construye una lista de usuarios para grabar los puntajes.
         * @return      texto       Un texto html que representa una lista.
         */
        static function escribir_lista()
        {
            $salida = "";

            $conexion = self::conectar();
            $sql  = " SELECT * FROM tb_usuarios ";
            $resultado = $conexion->query( $sql );

            $salida .= "<SELECT name='lista-usuarios'>";                  

            while( $fila = mysqli_fetch_assoc( $resultado ) )
            {
                //echo $fila[ 'correo' ]; 
                $salida .= "<option value='".$fila[ 'correo' ]."'>".$fila[ 'correo' ]."</option>";
            }

            $salida .= "</SELECT>";

            $conexion->close();

            return $salida;
        }

        static function ranking()
        {
            $salida = "";

            $conexion = self::conectar();
            //$sql  = " SELECT t1.nickname, t2.puntaje ";
            //$sql .= " FROM tb_usuarios t1, tb_sesiones_juego t2 ";
            //$sql .= " WHERE t1.correo = t2.correo ";
             
            $sql  = " SELECT t1.nickname, t2.puntaje, t2.fecha_registro ";
            $sql .= " FROM tb_usuarios t1, tb_sesiones_juego t2 ";
            $sql .= " WHERE t1.correo = t2.correo ";
            $sql .= " AND t2.fecha_registro = ( SELECT MAX( fecha_registro ) ";
            $sql .= "                 FROM tb_sesiones_juego  ";
            $sql .= "                 WHERE correo =  t2.correo ";
            $sql .= "                         ) ";

            $resultado = $conexion->query( $sql );
            
            $salida .= "<table border='1px'>";                  

            while( $fila = mysqli_fetch_assoc( $resultado ) )
            {
                $salida .= "<tr>";


                $salida .= "<td>".$fila[ 'nickname' ]."</td>"; 
                $salida .= "<td>".$fila[ 'puntaje' ]."</td>"; 
                $salida .= "<td>".$fila[ 'fecha_registro' ]."</td>"; 

                $salida .= "</tr>";
                
            }

            $salida .= "</table>";

            $conexion->close();

            return $salida;
        }

        /**
         * Guarda la sesión de juego de un usuario.
         * @param       texto       Usuario 
         * @param       texto       Puntaje
         */
        static function guardar_puntaje( $usuario, $puntaje )
        {
            $conexion = self::conectar();
            $sql  = "INSERT INTO tb_sesiones_juego ( id_sesion, puntaje, correo, fecha_registro ) ";
            $sql .= "VALUES ( null, '$puntaje', '$usuario', now() ); ";
            $resultado = $conexion->query( $sql );
        
            $conexion->close();
        }
    }

    