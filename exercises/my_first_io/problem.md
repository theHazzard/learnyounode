Escribe un programa que utilice una operación del sistema de archivos **sincrónica** para leer un archivo y imprima el numero de lineas que contiene en la consola (stdout), similar a ejecutar `cat archivo | wc -l`. 

La ruta completa al archivo a leer debe ser suministrada como el primer argumento en la linea de comandos.

----------------------------------------------------------------------
## PISTAS

Para realizar una operación en el sistema de archivos necesitaras el modulo `fs` de la librería principal de Node. para cargar este tipo de modulo, o cualquier otro modulo "global", usa la siguiente invocación:

```js
var fs = require('fs')
```

Ahora tienes el modulo `fs` completo disponible en la variable `fs`.

Todos los métodos sincrónicos (o bloqueantes) del sistema de archivos del modulo `fs` terminan con 'Sync'. Para leer un archivo necesitaras utilizar `fs.readFileSync('/ruta/al/archivo')`. Este método *devolvera* un objeto `Buffer` con el contenido completo del archivo.

Puedes encontrar la documentación del modulo `fs` ingresando la siguiente dirección en tu navegador:
  {rootdir:/node_apidoc/fs.html}

Los objetos `Buffer` son la manera en la que Node representa eficientemente arrays, o cadenas de datos arbitrarios, ya sea en formato ascii, binario, etc. Los objetos `Buffer` pueden ser convertidos a strings (cadenas de texto) llamando simplemente el método `toString()` en ellos. ej: `var str = buf.toString()`.

Puedes encontrar la documentación del objeto `Buffer` ingresando la siguiente direccion en tu navegador:
  {rootdir:/node_apidoc/buffer.html}

Si estas buscando una manera fácil para contar la cantidad de lineas en un string, recuerda que un `String` en Javascript puede ser separado en un array utilizando su método `.split()` y que '\n' puede ser utilizado como delimitador. Nótese que el archivo de prueba no tiene el caracter de salto de linea ('\n') al final de su útima linea, entonces si utilizas este método tendrás un array que contiene un elemento menos del total de lineas.

----------------------------------------------------------------------