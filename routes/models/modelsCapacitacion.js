const qy=require('../../config/conexion');
const modelsUserInterno = require('./modelsUserInterno');
async function capacitacionNew (capacitacion){
    let query="INSERT INTO capacitacion (curso,fechainicio) VALUES (?,?)";
    let result=qy(query,[capacitacion.curso,capacitacion.fechainicio]);
    try{
        query='SELECT * FROM capacitacion WHERE id=?';
        let resultado = await qy (query,[result.insertId]);
        return resultado;
    }catch{
        //el curso ya ha sido ingresado pero al querer devolver al usuario el registro ingresado existio un error de lectura
        return [];
    }    
}
async function capacitacionGet(){
    query='SELECT * FROM capacitacion where eliminada is null';
    let resultado = await qy (query);
    return resultado;
}
async function capacitacionGett(){
    query='SELECT * FROM capacitacion';
    let resultado = await qy (query);
    return resultado;
}
async function capacitacionBorrar(id){
    let query= "UPDATE capacitacion SET eliminada=? where id=?"
    await qy(query,[1,id]);
}
async function capacitacionRehabilitar(id){
    let query= "UPDATE capacitacion SET eliminada=? where id=?"
    await qy(query,[null,id]);
}
module.exports={
    capacitacionNew,
    capacitacionGet,
    capacitacionBorrar,
    capacitacionRehabilitar,
    capacitacionGett
}