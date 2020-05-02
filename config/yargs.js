
const descripcion = {
  demand: true,//que sea obligatorio
      alias: 'd',
      desc: 'Descripcion de la tarea por hacer'
};
const completado = {
  default: true,// tiene un valor por defecto
      alias: 'c',
      desc: 'Marco como completado o pendiente la tarea'
};

const argv = require('yargs')
  .command('crear', 'Crear un elemento por hacer',{
    descripcion
  })
  .command('actualizar', 'Actualiza el estado completado de una tarea',{
    descripcion,
    completado
  })
  .command('borrar','Borra una tarea',{
    descripcion
  })
  .help()
  .argv;

module.exports = {
  argv
}