const model= require ('../models/modelsEmpleado');
/**
 * @param {Object} empleado empleado a ingresar
 */
 async function empleadoIngreso (empleado){
    return await model.empleadoIngreso (empleado);
}

/**
 * @returns {JSON} Devuelve un listado general de todos los empleado
 * que hay registrados en la tabla de empleado.
 */
async function empleadosListado(){
    return await model.empleadosList();
}
/**
 * @param {Integer} id id del empleado a buscar
 * @returns {JSON} devuelve un JSON con la información del empleado
 * que tiene número de id igual al que se pasa por parámetro. 
 */
async function empleadoGetter (id){
    return await model.empleadoGet(id);
}

/**
* @param {String} cuil cuil del empleado a buscar.
* @returns {JSON} devuelve un JSON con la información del empleado
* que tiene número de cuil igual al que se pasa por parámetro.
*/
async function cuilGetter (cuil){
    return await model.cuilGet(cuil);
}
/**
 * coloca el dato eliminado en 1.
	 */
async function empleadoBorrado(empleado){
    return model.empleadoBorrado(empleado);
}
/**
 * coloca el dato eliminado en NULL.
 */
 async function empleadoRehabilitar(empleado){
    return model.empleadoRehabilitar(empleado);
}
module.exports={
    empleadoIngreso,
    empleadoGetter,
    empleadosListado,
    cuilGetter,
    empleadoBorrado,
    empleadoRehabilitar
}