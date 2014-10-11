Este problema es igual al anterior pero introduce el concepto de **modules** o módulos. Necesitaras crear 2 archivos para resolver este problema.

Crea un programa que imprima una lista de archivos en un directorio dado, filtrado por su extensión. El primer parámetro es el nombre del directorio y el segundo el filtro de extensión. Imprime la lista de archivos (uno por linea) en la consola. **Debes** usar métodos asincrónicos de E/S.

Deberás escribir un *module*, o *modulo* para que este haga la mayor parte del trabajo. el modulo debe exportar '*export*' una única función que reciba **tres** parámetros: el nombre del directorio, la extensión a filtrar y una función callback, en ese orden.  El parámetro 'extensión' debe ser el mismo que le pasamos a nuestro programa. ej: no lo conviertas a *RegExp* o lo antepongas con "." etc. solo pásalo al module donde harás lo que necesites para que el filtro funcione.

La funcion callback debe ser llamada utilizando la convencion (error, datos). Esta convencion estipula que, a menos que haya un error, el primer parametro pasado al callback debe ser null y el segundo deben ser tus datos. En este caso, los datos seran tu lista de archivos filtrada, en forma de un Array. Si recives algun error, ej: en tu llamada a `fs.readdir()`, el callback debe ser llamado solo con este error como primer parametro.

**no debes** imprimir directamente a la consola desde tu modulo, solo desde el programa original.

En el caso de que tu modulo envie un error a tu programa original, simplemente analizalo y imprime un mensaje informativo en la consola.

Estas 4 cosas forman el contrato que tu modulo debe seguir.

1. Exporta una unica funcion que recibe exactamente los argumentos descriptos.
2. LLama la funcion exactamente una vez con un error o los datos, como se describio anteriormente.
3. No cambies nada mas, como variables locales o stdout (impresion a consola)
4. Manipula todos los errores que puedan ocurrir y pasalos a el callback.

El beneficio de tener un contrato es que tu modulo puede ser utilizado por cualquier persona que tenga conocimiento del mismo. De esta manera tu modulo podria ser utilizado por cualquier persona que utilize learnyournode o el verificador y funcionaria sin problemas.

----------------------------------------------------------------------
## PISTAS

Crea un nuevo modulo creando un nuevo archivo que solo contenga tus funciones de lectura y filtrado. Para definir un *export* con una *unica funcion* debes asignar tu funcion al objeto `module.exports`, sobreescribiendo lo que hay alli:

```js
module.exports = function (args) { /* ... */ }
```

O tambien puedes usar una funcion que no sea anonima, y asignar su nombre a `exports`:

```js
var mifuncion = function (args) { /* ... */ }

module.exports = mifuncion;
```

Para utilizar tu nuevo modulo en tu programa original, utiliza la funcion `require()` de la misma manera que lo hiciste con `fs` (`require('fs')`). La unica diferencia es que a tus modulos locales les debes anteponer './'. Entonces, si tu modulo se llama mimodulo.js:

```js
var mimodulo = require('./mimodulo.js')
```

La extension '.js' es opcional aqui, y normalmente veras que es omitida.

Ahora tienes el objeto `module.exports` de tu modulo asignado a tu variable `mimodulo`. Ya que estas exportando una unica funcion, `mimodulo`es una funcion a la que puedes llamar!

Tambien ten en mente que es conveniente hacer checkeos de errores y realizar retornos prematuros dentro de tus funciones callback:  

```js
function bar (callback) {
  foo(function (err, data) {
    if (err)
      return callback(err) // retorno prematuro

    // ... no hubo error, continua haciendo cosas cool con tu `data`

    // todo salio bien, llama el callback con `null` como tu argumento de error. 

    callback(null, data)
  })
}
```

----------------------------------------------------------------------
