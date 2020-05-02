const colors = require ('colors');
const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
  //convirtiendo el array de listadoPorHacer en un formato .json
  let data = JSON.stringify(listadoPorHacer);//JSON.stringify, convierte el objeto de listadoPorHacer a un .json totalmente valido

  fs.writeFile('db/data.json', data, (err) => {
    if (err) throw new Error ('No se pudo grabar', err)
  })

}


const cargarDB = () => {

  try{
  listadoPorHacer = require ('../db/data.json');//estamos tayendo el contenido del archivo data.json y lo estamos metiendo en listadoPorHacer,, esto puede causar un error si el archivo data.json esta totalmente vacio,, para arreglar el error hacemos un tray y catch
  }catch(error){
    listadoPorHacer = [];//si el archivo viene vacio le agregamos un arran vacio [], con esto se corrige el error, cuando el archivo esta vacio
  }

}


const crear = (descripcion) => {
    cargarDB()//traemos primero lo que ya tiene el archivo data.json, para que se guarden junto con la nueva informacion que se esta ejecutando desde terminal
    //listadoPorHacer = require('../db/data.json')// misma exprecion que cargarDB()

   let porHacer = {
      descripcion,//esta descripcion sera igual a la que viene por argumento (descripcion)
      completado: false
    }; 

    listadoPorHacer.push (porHacer);//este push mete el objeto apenas se cree en listadoPorHacer, ademas de mantener los el contenido que ya tenia gracias a traemos el contenido con cargarDB Primero
      guardarDB();//al ejecutar la funcion crear, la funcion guardarDB la estamos ejecutando aqui.
    return porHacer;
}

const getListado = () => {
    cargarDB();//cargo el contenido de cargarDB y ahi esta el listadoPorHacer
    return listadoPorHacer;
}

const actualizar =  (descripcion2, completado2 = true) => {
  cargarDB();
  let index = listadoPorHacer.findIndex(tarea => {//.findIndex recorre el array   de la base de datos en listadoPorHacer que esta dentro de cargarDB , despues creo una palabra clave llamada tarea que es un callback, donde trae la ubicacion del objeto si lo hay de acuerdo a la condicion que hago al comparar tarea.descripcion que refiere a la descripcion dentro de listadoPorHacer contra la descripcion2 que por comando de terminal estoy ejecutando con node app.js --descripcion 'corriendo afuera' ,  si coinsiden exactamente igual regresa la ubicacion [posicion], si no coinciden recresa un -1, y el numero que retorne se le asigna a la variable index.
  console.log('listadoPorHacer'.red,listadoPorHacer);
  console.log('descripcion tarea',tarea.descripcion.blue);
  console.log('descripcion2',descripcion2.blue );
  return tarea.descripcion === descripcion2;
    
  })
  console.log('index',index);
  if (index >= 0){
    listadoPorHacer[index].completado = completado2;// le asigno el valor ejecutado de terminal completado2 a la posicion de completado dentro de listadoPorHacer[index].completado
    console.log('queso',listadoPorHacer[index]);//el objeto indicado por terminal
    guardarDB();//guardo en guardarDB el objeto indicado por terminal
    return true;
  }else {
    return false;
  }
}

const borrar = (descripcion2) => {
  cargarDB();
  let nuevoListado = listadoPorHacer.filter(tarea => {//.filter es una funcion que retorna un arreglo, y le estamos indicando que haga return de solo los objetos que no coincidad !== con la descripcion2 que por parametro de terminal la estoy intruduciendo con la descripcion de tarea.descripcion que es la descripcion que tiene cada objeto dentro de listadoPorhacer
  return tarea.descripcion !== descripcion2;
    
  })
  if (listadoPorHacer.length === nuevoListado.length){//comparo el largo del las dos listas
    return false;
  }else {
    listadoPorHacer = nuevoListado;// estoy dando el nuevo valor de la lista a la listaPorHacer y la guardo en guardarDB
    guardarDB();
    return true;
  }
}

module.exports = {
  crear,
  getListado,
  actualizar,
  borrar
}