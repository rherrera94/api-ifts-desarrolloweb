const model= require ('../models/modelsCapacitacion');
/**
 * @param {Object} capacitacion capacitacion a crear
 */
async function capacitacionNew (capacitacion){
    return await model.capacitacionNew (capacitacion);
}
/**
 * Devuelve el listado de capacitaciones disponibles
 */
async function capacitacionGet(){
    return model.capacitacionGet();
}
module.exports={
    capacitacionNew,
    capacitacionGet
}