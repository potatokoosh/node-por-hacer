const colors = require ('colors');
const argv = require('./config/yargs.js').argv;
const porHacer = require ('./por-hacer/por-hacer.js')

console.log(argv);
//console.log(argv.descripcion.blue, argv.completado.red);

let comando = argv._[0];

switch (comando) {
  case 'crear':
    let tarea = porHacer.crear(argv.descripcion);//(argv.descripcion) al ejecutar el comando crear en terminal por la funcion de yargs trae esa info y la mete en descripcion de porHacer.crear,, y todo lo que retorne lo metemos en let tarea.
    console.log(tarea);
    break;
  case 'listar':
    let listado = porHacer.getListado();

    for(let tarea of listado){
    console.log('=========Por Hacer========='.green);
    console.log(tarea.descripcion);
    console.log('Estado: ', tarea.completado);
    console.log('==========================='.green);
    }
    break;
  case 'actualizar':
    let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
    console.log('desde app'.red,actualizado);
    break;
  
  case 'borrar':
    let borrado = porHacer.borrar(argv.descripcion);
    console.log(borrado); 
    break; 
  
  default:
    console.log(`Comando ${comando} no es reconocido`);
}