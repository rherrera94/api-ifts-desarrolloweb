const {db} = require('../db');//tomo la conexion
const{CONT_SUPER}=require('../../../config/globals');
const bcrypt= require('bcrypt');
(async () =>{
    try{
        console.log("******************************************************");
        console.log("******************************************************");
        console.log("*Se inicia proceso inicial de creación tablas de BBDD*");
        console.log("******************************************************");
        console.log("******************************************************");
            await db.schema.createTable('empleado',table =>{
                table.increments('id');
                table.string('cuil',16).notNullable();
                table.string('apellido',50).notNullable();
                table.string('nombre',50).notNullable();
                table.string('mail',100).notNullable();
                table.date('nacimiento').notNullable();
                table.string('cargo',50).notNullable();
                table.integer('eliminado').defaultTo(null);
            })
        .then(()=>console.log("Tabla empleado creada"))
        .then(async ()=>{
            await db.schema.createTable('rol',table =>{
                table.increments('id');
                table.string('nombre',30).notNullable();
                table.integer('eliminado').defaultTo(null);
            })
        })
        .then(()=>console.log("Tabla rol creada"))
        .then(async ()=>{
            await db.schema.createTable('permiso',table =>{
                table.string('id',30).notNullable();
                table.integer('role_id').unsigned().notNullable();
                table.integer('eliminado').defaultTo(null);
                table.foreign('role_id').references('id').inTable('rol');
            })
        })
        .then(()=>console.log("Tabla permiso creada"))
        .then(async ()=>{
            await db.schema.createTable('usuariointerno',table =>{
                table.increments('id');
                table.string('nombre',50).notNullable();
                table.string('contrasenia',100).notNullable();
                table.integer('idRol').unsigned().notNullable();
                table.integer('idEmpleado').unsigned().notNullable();
                table.string('mail',100).notNullable();
                table.integer('baja').defaultTo(null);
                table.foreign('idRol').references('id').inTable('rol');
                table.foreign('idEmpleado').references('id').inTable('empleado');
            })
        })
        .then(()=>console.log("Tabla usuariointerno creada"))
        .then(async ()=>{
            await db.schema.createTable('capacitacion',table =>{
                table.increments('id');
                table.string('curso',50).notNullable();
                table.date("fechainicio").notNullable();
            })
        })
        .then(()=>console.log("Tabla capacitacion creada"))
        .then(()=>{
            console.log("*****************************************************");
            console.log("*****************************************************");
            console.log("*Se inicia proceso de creación de usuarios iniciales*");
            console.log("*****************************************************");
            console.log("*****************************************************");
        })
        .then(async()=>{
            let nombre="ADMINISTRADOR"
            await db("rol").insert({
                nombre
            })
            nombre="EMPLEADO"
            await db("rol").insert({
                nombre
            })
        })
        .then(()=>console.log("Roles genéricos creados"))
        .then(async()=>{
            let id="PERMIT_LOGIN";
            const role_id=1;
            await db("permiso").insert({
                id,
                role_id
            })
            id="PERMIT_ADMINISTRATE";
            await db("permiso").insert({
                id,
                role_id
            })
            id="PERMIT_ADMINISTRATE_ROLES";
            await db("permiso").insert({
                id,
                role_id
            })
            id="PERMIT_ADMINISTRATE_USERS";
            await db("permiso").insert({
                id,
                role_id
            })
        })
        .then(()=>console.log("Permisos rol administrador creados"))
        .then(async()=>{
            const cuil="22-22222222-0"
            const apellido="PEREZ";
            const nombre="JUAN";
            const mail="ADMIN@DALW.COM.AR";
            const cargo="JEFE AREA SISTEMAS"
            const nacimiento="1990/04/23"
            await db("empleado").insert({
                cuil,
                apellido,
                nombre,
                mail,
                nacimiento,
                cargo
            })
        })
        .then(()=>console.log("empleado creado"))
        .then(async()=>{
            const nombre="SUPERUSUARIO"
            const contrasenia=await bcrypt.hash(CONT_SUPER,10);
            const idRol=1;
            const idEmpleado=1;
            const mail="ADMIN@DALW.COM.AR"
            await db("usuariointerno").insert({
                nombre,
                contrasenia,
                idRol,
                idEmpleado,
                mail
            })
        })
        .then(()=>console.log("usuario superusario creado"))
    }catch(e){
        console.log(e)
        console.log("Se ha producido un error en el proceso de migración")
    }
    
    process.exit(0);// esto lo hago para que no se quede colgado el sistema y haya que apretar ctrl+c   
})()