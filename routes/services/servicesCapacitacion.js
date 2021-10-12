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
async function capacitacionGett(){
    return model.capacitacionGett();
}
async function capacitacionBorrar(id){
    await model.capacitacionBorrar(id);
}
async function capacitacionRehabilitar(id){
    await model.capacitacionRehabilitar(id);
}
module.exports={
    capacitacionNew,
    capacitacionGet,
    capacitacionBorrar,
    capacitacionRehabilitar,
    capacitacionGett
}