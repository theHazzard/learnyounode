Escribe un programa que realice una petición HTTP GET a una URL que suministraras como primer argumento mediante la linea de comandos. Escribe el contenido del String de **cada uno** de los eventos "data" de la respuesta en una nueva linea en la consola (stdout).

----------------------------------------------------------------------
## PISTAS

Para este ejercicio necesitaras utilizar el modulo `http` del núcleo de Node.js.

Puedes encontrar mas documentación del modulo `http` ingresando la siguiente dirección en tu navegador:
  {rootdir:/node_apidoc/http.html}

El método `http.get()` es un simple atajo para realizar peticiones GET, úsalo para simplificar tu solución. El primer parámetro para `http.get()` puede ser la URL a la que quieres realizar la petición GET, provee una función callback como segundo parámetro.

A diferencia de otras funciones callback, esta tiene la siguiente firma:

```js
function callback (response) { /* ... */ }
```

Donde el objeto `response` es un objeto del tipo **Stream** de Node, Puedes tratar los Streams de Node como objetos que emiten eventos, los 3 eventos mas interesantes son: "data", "error" y "end". Puedes escuchar un evento de la siguiente manera:

```js
response.on("data", function (data) { /* ... */ })
```

El evento "data" es emitido cuando un fragmento de datos esta disponible y puede ser procesado. El tamaño del fragmento depende de la fuente de datos proveída.

El objeto / Stream `response` (o respuesta) que obtienes de `http.get()` también tiene un método `setEncoding()`. Si llamas este método con "utf8" como parámetro, el evento "data" emitirá Strings en lugar del objeto `Buffer` standard de Node, al cual tendrás que convertir de manera explicita a un String.

----------------------------------------------------------------------
