const jwt= require('jsonwebtoken');
const unless=require('express-unless');
const{SECRET_WORD}=require('./config/globals');
const express= require('express');
const cors=require ('cors');
const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const {PORT}=require('./config/globals');

/**
 * AUTENTICACIÓN
 */

const auth=(req,res,next)=>{
    try{
        //nos fijamos si la request viene con un token
        let token=req.headers['authorization'];
        if (!token){//si no tiene token lanzamos error
            throw new Error ("No ha iniciado sesión");
        }
        token= token.replace ('Bearer ', '');//hay que despejar el token para que quede solo
        jwt.verify(token, SECRET_WORD, (err,user)=>{
            if(err){//si hay algun problema con el token se lanza error
                throw new Error("Token inválido");		
            }
        });
        next();
    }
    catch(e){
        res.status(403).send({"message": e.message});
    }			 	
   
}

/**
 * Lo que se hace aca es que el usuario no va a poder entrar a ninguna ruta si
 * es que no tiene un token valido (salvo a la ruta de login).
 */

auth.unless= unless;
app.use(
    auth.unless({
        path:[
            {url: '/userinterno/login', method: ['POST']}
        ]
    })
)



/**
 * SE REQUIREN LOS DIFERENTES ARCHIVOS DE LAS RUTAS
 */

const routeUserInterno=require('./routes/rutasUserInterno');
const routeEmpleado= require('./routes/rutasEmpleado');
const routeCapacitacion= require('./routes/rutasCapacitacion');

/*************************************************************************/
/***
 * RUTAS:
 * userinterno: ruta de usuarios con alta, login,baja.
 * empleado: modulo para la creacion y visualizacion de los empleados de la empresa
 * capacitacion: modulo para la creacion y visualizacion de las capacitaciones de la empresa
 */

app.use('/userinterno',routeUserInterno);
app.use('/empleado',routeEmpleado);
app.use('/capacitacion',routeCapacitacion);

/*************************************************************************/
app.use((req, res) => {
    res.json({"error":"Ruta no encontrada","descripcion": `ruta ${req.originalUrl} no implementada` });
})
app.listen(PORT,()=>{
    console.log('puerto '+ PORT);
});
