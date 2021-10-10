const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesEmpleado')
/**
 * Agrega un nuevo Empleado a la tabla empleados.
 * @returns {JSON} json que contiene el nuevo empleado agregado.
 */
app.post('/',async(req,res)=>{
    try{
        //controla que todos los campos necesarios vengan sin estar vacios
        if(!req.body.cuil||!isNaN(req.body.cuil)||req.body.cuil.trim()==""||!req.body.apellido||!isNaN(req.body.apellido)
        ||req.body.apellido.trim()==""|| !req.body.nombre||!isNaN(req.body.nombre)||req.body.nombre.trim()==""||
        !req.body.mail||!isNaN(req.body.mail)||req.body.mail.trim()==""||!req.body.cargo||!isNaN(req.body.cargo)||
        req.body.cargo.trim()==""||req.body.nacimiento==""){
            throw new Error("Revise la información ingresada");
        }
        //me fijo si el empleado ya se encuentra registrado
        let buscarxcuil=await servicios.cuilGetter(req.body.cuil);
        if (buscarxcuil.length!=0){
            throw new Error("El empleado ya se encuentra registrado");
        }
        
        let empleadoReg={
            "cuil":req.body.cuil,
            "apellido":req.body.apellido.toUpperCase(),
            "nombre":req.body.nombre.toUpperCase(),
            "mail":req.body.mail.toUpperCase(),
            "nacimiento":req.body.nacimiento,
            "cargo":req.body.cargo.toUpperCase()
        }
        await servicios.empleadoIngreso (empleadoReg);
        res.json(empleadoReg);
    }catch(e){
        if(e.message!="Revise la información ingresada" && e.message!="El empleado ya se encuentra registrado"){
            res.status(404).json({"error":"Error inesperado"})
            return;
        }
        res.status(404).json({"error":e.message});
    }
})

/**
 * Devuelve un listado general de todo los empleados que hay registrados 
 * en la tabla de empleados con toda su información.
 * @returns {JSON} json
 */

app.get('/',async (req,res)=>{
    try{
        let registros=await servicios.empleadosListado();
        if (registros.length==0){
            throw new Error ('No se han encontrado Empleados.');
        }
        res.status(200).send(registros);
    }
    catch(error){
        if (error.message!='No se han encontrado Empleados.'){
            res.status(413).send({"Mensaje":'error inesperado'});    
        }
        res.status(404).send({"Mensaje":error.message});
    }
})

/*******************************************************************************/

/**
 * Devuelve la información del empleado que tiene número de id igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */

app.get('/:id',async (req,res)=>{
    try{
        let registros=await servicios.empleadoGetter(req.params.id);
        if (registros.length==0){
            throw new Error ('No se han encontrado empleados con ese id.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado empleados con ese id.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})

/*******************************************************************************/

/**
 * Devuelve la información del empleado que tiene número de cuil igual al que se 
 * pasa por parámetro.
 * @returns {JSON} json
 */

app.get('/cuil/:cuil',async (req,res)=>{
    try{
        
        let registros=await servicios.cuilGetter(req.params.cuil);
        
        if (registros.length==0){
            throw new Error ('No se han encontrado empleados con ese cuil.');
        } 
        res.status(200).send(registros);
    }
    catch(error){
        if(error.message!= 'No se han encontrado empleados con ese cuil.'){
            res.status(413).send({"Mensaje": "error inesperado"});
            return;    
        }
        res.status(404).send({"Mensaje": error.message});
    }
})
/**
 * deshabilita empleado que tiene cuil igual al  que se pasa por parámetro.
 * Devuelve el registro con el campo eliminado en 1.
 * @returns {JSON} json
 */
 app.put('/borrado/:cuil', async (req,res)=>{
    try{
        if (!isNaN(req.params.cuil) || req.params.cuil.replace(/ /g, "")==""||req.params.cuil.replace(/ /g, "")!=req.params.cuil){
            throw new Error ("Chequee la información ingresada")
        }
        await servicios.empleadoBorrado(req.params.cuil)
        res.status(200).send(req.params.cuil);

    } catch (error) {
        if (error.message!="Chequee la información ingresada"){
            res.status(400).send({"Mensaje": "error inesperado"});
            return;
        }
        res.status(404).send({"Mensaje": error.message});
    }
});
/**
 * rehabilita usuario que tiene cuil igual al  que se pasa por parámetro.
 * Devuelve el registro con el campo eliminado en NULL.
 * @returns {JSON} json
 */
 app.put('/rehabilitar/:cuil', async (req,res)=>{
    try{
        if (!isNaN(req.params.cuil) || req.params.cuil.replace(/ /g, "")==""||req.params.cuil.replace(/ /g, "")!=req.params.cuil){
            throw new Error ("Chequee la información ingresada")
        }
        await servicios.empleadoRehabilitar(req.params.cuil)
        res.status(200).send(req.params.cuil);

    } catch (error) {
        if (error.message!="Chequee la información ingresada"){
            res.status(400).send({"Mensaje": "error inesperado"});
            return;
        }
        res.status(404).send({"Mensaje": error.message});
    }
});

/*******************************************************************************/

module.exports=app;