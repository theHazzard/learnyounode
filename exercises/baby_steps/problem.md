Escribe un programa que acepte uno o mas números como argumentos de la linea de comandos, y escribe la suma de ellos en la consola (stdout).

----------------------------------------------------------------------
## PISTAS

Puedes acceder a los argumentos de la linea de comandos mediante el objeto global `process`. el objeto `process` contiene una propiedad llamada `argv`, la cual es un array que contiene la linea del comando completa. ej: `process.argv`.

Para comenzar, escribe un programa que contenga simplemente:

```js
console.log(process.argv)
```

Ejecútalo con el comando `node program.js` y algunos números como argumentos. ej:

```sh
$ node programa.js 1 2 3
```

En este caso, la salida debería ser un array como el siguiente:

```js
[ 'node', '/ruta/hacia/tu/programa.js', '1', '2', '3' ]
```

Ahora necesitas pensar la manera de iterar entre estos argumentos y así devolver solo su suma. El primer elemento del array `process.argv` es siempre 'node', y el segundo es siempre la ruta hacia tu archivo 'programa.js', entonces necesitaras empezar a partir del 3er elemento (indice 2), sumando cada uno a el total hasta que alcances el final del array.

También ten en cuenta que todos los elementos de `process.argv` son cadenas de texto (strings), y necesitaras *convertirlas* a números. Puedes realizar esto anteponiendo la propiedad con el símbolo `+`, o a través del constructor `Number()`. ej: `+process.argv[2]` o `Number(process.argv[2])`.

{appname} proveerá los argumentos númericos a tu programa cuando ejecutes `{appname} verify programa.js` entonces no necesitaras ingresarlos manualmente. Para probar tu programa sin verificarlo, puedes llamarlo a través de `{appname} run programa.js`. cuando utilizas el comando `run`, estas invocando el ambiente de pruebas que {appname} configura para cada ejercicio.

----------------------------------------------------------------------
