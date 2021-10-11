const express= require('express');
const app=express.Router();
const servicios= require('./services/servicesCapacitacion')
/**
 * Agrega una nueva capacitacion a la tabla de capacitaciones.
 * @returns {JSON} json que contiene la nueva capacitacion agregada.
 */

app.post('/',async (req,res)=>{
    try{
        if(!req.body.curso||!isNaN(req.body.curso)||req.body.curso.trim()==""|| !req.body.fechainicio||!isNaN(req.body.fechainicio)||req.body.fechainicio.trim()==""){
            throw new Error("Revise la información ingresada");
        }
        let capacitacion=await servicios.capacitacionNew({"curso":req.body.curso.toUpperCase(),"fechainicio":req.body.fechainicio});
        res.status(200).json(capacitacion)
    }catch(e){
        res.status(404).send({"error":e.message});
    }
})
/**
 * Consulto las capacitaciones disponibles en la base de datos
 * @return {JSON} devuelve las capacitaciones disponibles dentro de la base de datos
 */
app.get ('/',async (req,res)=>{
    try{
        let capacitacion=await servicios.capacitacionGet();
        res.send(capacitacion);
    }catch(e){
        res.status(404).send({"error":e.message});
    }
})
module.exports=app;