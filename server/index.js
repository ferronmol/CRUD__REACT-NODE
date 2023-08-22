const express = require("express");
const app = express();
// const mysqloracle = require("mysql2");
const oracledb = require("oracledb")
const cors = require("cors");


const dbConfig = {
    user: "emple_crud",
    password: "emple_crud",
    connectString: "localhost/XE"
};
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false })); 
//la peticion de guardado

app.post("/create", async (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    
    try {
        // Establece la conexión a Oracle
        const connection = await oracledb.getConnection(dbConfig);
    
        // Define la consulta SQL
        const sql = `INSERT INTO empleados(nombre, edad, pais, cargo, anios)
        VALUES(:nombre, :edad, :pais, :cargo, :anios)`;
    
        // Ejecuta la consulta
        const result = await connection.execute(
        sql,
        {
            nombre,
            edad,
            pais,
            cargo,
            anios,
        },
        {
            autoCommit: true, // Confirma automáticamente la transacción
        }
        );
    
        // Cierra la conexión
        await connection.close();
    
        console.log("Empleado registrado con éxito!!");
        res.send("Empleado registrado con éxito!!");
        } catch (err) {
        console.error("Error al insertar empleado:", err);
        res.status(500).send("Error al insertar empleado");
        }
    
})

app.listen(3001,()=> {
    console.log("Corriendo en el puerto 3001");
})