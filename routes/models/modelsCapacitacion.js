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
    query='SELECT * FROM capacitacion';
    let resultado = await qy (query);
    return resultado;
}
module.exports={
    capacitacionNew,
    capacitacionGet
}