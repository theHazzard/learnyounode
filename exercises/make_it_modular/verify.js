const fs    = require('fs')
    , path  = require('path')
    , util  = require('util')
    , files = require('../filtered_ls/file-list')
    , chalk = require('chalk')

function validateModule (modFile, callback) {
  var exercise  = this
    , dir       = this._testDir
    , mod
    , error     = new Error('testing')
    , returned  = false
    , _callback = callback
    , callbackUsed

  try {
    mod = require(modFile)
  } catch (e) {
    exercise.emit('fail', 'Error cargando modulo: ' + e.message)
    return callback(null, false)
  }

  callback = function () {
    returned = true
    _callback.apply(this, arguments)
  }

  function modFileError (txt) {
    exercise.emit('fail', 'Tu archivo de modulo adicional [' + path.basename(modFile) + '] ' + txt)
    callback (null, false)
  }

  //---- Revisa que tu archivo de modulo tenga el formato `module.exports = function () {}`

  if (typeof mod != 'function') {
    return modFileError(
        'no exporta una ' + chalk.bold('funcion simple') + '.'
      + 'Debes utilizar el patrón `module.exports = function () {}`.'
    )
  } else {
    exercise.emit('pass', 'El modulo adicional exporta una unica funcion')
  }

  //---- Revisa que la funcion exportada reciba 3 parametros

  if (mod.length < 3) {
    return modFileError(
        'exporta una funcion que recibe menos de ' + chalk.bold('tres') + ' parametros.'
      + 'Debes aceptar un directorio, un filtro y un ' + chalk.bold('callback') + '.'
    )
  } else {
    exercise.emit('pass', 'El modulo acepta ' + mod.length + ' parametros')
  }

  //---- Simula `fs.readdir` para probar que se mande el error al callback 

  fs.$readdir = fs.readdir
  fs.readdir = function (dir, callback) {
    callback(error)
  }

  function noerr () {
    modFileError(
        'parece no estar enviando el error recibido de `fs.readdir()`'
      + 'Use the following idiomatic Node.js pattern inside your callback to `fs.readdir()`:'
      + 'utiliza el siguiente patron dentro de tu callback para `fs.readdir()`:'
      + '\n\tif (err)\n\t  return callback(err)'
    )
  }

  callbackUsed = false
  try {
    mod('/foo/bar/', 'wheee', function (err) {
      if (err !== error)
        return noerr()

      callbackUsed = true
    })
  } catch (e) {
    noerr()
  }

  if (callbackUsed)
    exercise.emit('pass', 'El modulo adicional maneja los errores correctamente')

  //---- Revisamos que el callback sea utilizado

  setTimeout(function () {
    if (returned)
      return

    if (!callbackUsed)
      return modFileError('no llama al callback luego de un error en fs.readdir()')

    exercise.emit('pass', 'El modulo adicional utiliza el callback')

    // reemplaza nuevamente el readdir temporal
    fs.readdir = fs.$readdir

    callbackUsed = false
    try {
      mod(dir, 'md', function (err, list) {
        if (err) {
          return modFileError(
              'devolvio un error en el callback:'
            + '\n\t' + util.inspect(err)
          )
        }

        //---- Revisamos que tengamos la cantidad correcta de elementos
        if (arguments.length < 2) {
          return modFileError(
            'la funcion callback no devovlio dos parametros esperados (se esperaba `null` y un array de nombres de archivos)'
          )
        }

        exercise.emit('pass', 'El modulo adicional devolvio los 2 elementos')

        //---- Revisamos que el segundo elemento sea un array
        if (!Array.isArray(list)) {
          return modFileError(
            'no se envio un Array como segundo parametro de la funcion callback'
          )
        }

        exercise.emit('pass', 'El modulo adicional devolvio un Array como segundo parametro')

        //---- Revisamos que tengamos el numero correcto de elementos en nuestro array
        var exp = files.filter(function (f) { return (/\.md$/).test(f) })
          , i

        if (exp.length !== list.length) {
          return modFileError(
            'El Array enviado como segundo parametro al callback no contenia la cantidad de elementos correctas'
          )
        }

        exercise.emit('pass', 'El modulo adicional devolvio un Array conteniendo la cantidad correcta de elementos')

        callbackUsed = true

        //---- Revisamos que los elementos sean los que esperabamos, ignorando el orden
        exp.sort()
        list.sort()
        for (i = 0; i < exp.length; i++) {
          if (list[i] !== exp[i]) {
            return modFileError(
              'no devolvio la lista correcta de elementos como segundo elemento de la funcion callback'
            )
          }
        }

        exercise.emit('pass', 'El modulo adicional devolvio la lista correcta de elementos')

        //WIN!!
        callback()
      })
    } catch (e) {
        return modFileError(
            'dio un error:'
          + '\n\t' + util.inspect(e)
        )
    }

    setTimeout(function () {
      if (returned)
        return

      if (!callbackUsed)
        return modFileError('no llamo la funcion callback')
    }, 300)
  }, 300)
}


// find any modules that are required by the submission program

function requires (exercise) {
  // rule out these 4 things
  var main  = path.resolve(process.cwd(), exercise.args[0])
    , exec  = require.resolve('workshopper-wrappedexec/exec-wrap')
    , wrap1 = require.resolve('../my_first_io/wrap')
    , wrap2 = require.resolve('./wrap-requires')

  return exercise.wrapData.requires.filter(function (m) {
    return m != main && m != exec && m != wrap1 && m != wrap2
  })
}


function verifyModuleUsed (callback) {
  var required = requires(this)

  if (required.length === 0) {
    this.emit('fail', 'Did not use an additional module file, you must require() a module to help solve this exercise')
    return callback(null, false)
  }

  validateModule.call(this, required[0], callback)
}

function verify (callback) {
  var usedSync  = false
    , usedAsync = false

  Object.keys(this.wrapData.fsCalls).forEach(function (m) {
    if (/Sync$/.test(m)) {
      usedSync = true
      this.emit('fail', 'Used synchronous method: fs.' + m + '()')
    } else {
      usedAsync = true
      this.emit('pass', 'Used asynchronous method: fs.' + m + '()')
    }
  }.bind(this))

  verifyModuleUsed.call(this, callback)
}

module.exports = verify