Escribe un programa que utilice una operación **asincrónica** del sistema de archivos para leer un archivo y imprima el numero de lineas que contiene en la consola (stdout), similar a ejecutar `cat file | wc -l`.

La ruta completa al archivo a leer debe ser suministrada como el primer argumento en la linea de comandos.

----------------------------------------------------------------------
## PISTAS

La solución a este problema es **casi** la misma que en el problema anterior, excepto que ahora debes hacerlo de la **manera Node.js**: asincrónicamente.

En lugar de llamar a `fs.readFileSync()` querrás usar `fs.readFile()`, y en lugar de utilizar el valor retornado por este método necesitaras tomar el valor desde una **callback function** o función de retorno, la cual proporcionaras como segundo argumento.

Recuerda que normalmente los **callbacks** en Node.js tienen la siguiente firma:

```js
function callback (err, data) { /* ... */ }
```

entonces puedes examinar si a ocurrido un error revisando si el primer argumento es verdadero. Si no a ocurrido un error, el segundo argumento debería ser tu objeto `Buffer`. Así como con el método `readFileSync()`, puedes llamar a `fs.readFile()` con 'utf8' como segundo argumento, y enviar el callback como tercer argumento y de esta manera recibir un `String` en lugar de un `Buffer`.

Puedes encontrar la documentación del modulo `fs` ingresando la siguiente dirección en tu navegador:
  {rootdir:/node_apidoc/fs.html}

----------------------------------------------------------------------
