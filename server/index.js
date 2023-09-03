const express = require("express");
const app = express();
// const mysqloracle = require("mysql2");
const oracledb = require("oracledb")
const cors = require("cors");

app.use(cors()); //necesario
app.use(express.json());  //necesario
app.use(express.urlencoded({ extended: false })); 

const dbConfig = {
    user: "emple_crud",
    password: "emple_crud",
    connectString: "localhost/XE"
};
//la peticion de guardado

app.post("/create", async (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const poblacion = req.body.poblacion;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    
    try {
        // Establece la conexión a Oracle
        const connection = await oracledb.getConnection(dbConfig);
    
        // Define la consulta SQL
        const sql = `INSERT INTO empleados(nombre, edad, poblacion, cargo, anios)
        VALUES(:nombre, :edad, :poblacion, :cargo, :anios)`;
    
        // Ejecuta la consulta
        const result = await connection.execute(
        sql,
        {
            nombre,
            edad,
            poblacion,
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

//vamos a hacer la peticion de listado

app.get("/empleados",  async (req, res) => {
    
    try {
        // Establece la conexión a Oracle
        const connection = await oracledb.getConnection(dbConfig);
        console.log("Recibida solicitud para listar empleados.");
        // Define la consulta SQL
        const sql = `SELECT * FROM empleados `;
    
        // Ejecuta la consulta
        const result = await connection.execute(sql);
    
        // Cierra la conexión
        await connection.close();
        // Mapea los resultados para enviarlos como objetos con nombres de campo
        const empleadosList = result.rows.map((row) => ({
            id: row[0],
            nombre: row[1],
            edad: row[2],
            poblacion: row[3],
            cargo: row[4],
            anios: row[5],
        }));
        console.log("Empleados listados con éxito!!");
        res.json(result.rows)
        } catch (err) {
        console.error("Error al listar empleados:", err);
        res.status(500).send({error: "Error al listar empleados"});
        }
});
//voy a realizar el actualizado
app.put("/update", async (req, res) => {
    const id = req.body.id
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const poblacion = req.body.poblacion;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    
    try {
        // Establece la conexión a Oracle
        const connection = await oracledb.getConnection(dbConfig);
    
        // Define la consulta SQL para actualizar
        const sql = 'UPDATE empleados SET nombre=:nombre, edad=:edad, poblacion=:poblacion, cargo=:cargo, anios=:anios WHERE id=:id'
        
    
        // Ejecuta la consulta de actualizado
        const result = await connection.execute(
        sql,
        {  
            nombre,
            edad,
            poblacion,
            cargo,
            anios,
            id    
        },
        {
            autoCommit: true, // Confirma automáticamente la transacción
        }
        );
    
        // Cierra la conexión
        await connection.close();
    
        console.log("Empleado actualizado con éxito!!");
        res.send("Empleado actualizado con éxito. 200 OK");
        } catch (err) {
        console.error("Error al actualizar empleado:", err);
        res.status(500).send("Error al actualizar empleado" + err.message);
        }  
})
//  borrado 
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        // Establece la conexión a Oracle
        const connection = await oracledb.getConnection(dbConfig);
    
        // Define la consulta SQL para actualizar
        const sql = 'DELETE FROM empleados WHERE id= :id'
        
    
        // Ejecuta la consulta de actualizado
        const result = await connection.execute(
        sql,
        {  
            id,   
        },
        {
            autoCommit: true, // Confirma automáticamente la transacción
        }
        );
    
        // Cierra la conexión
        await connection.close();
    
        console.log("Empleado ELIMINADO con éxito!!");
        res.send("Empleado ELIMINADO con éxito. 200 OK");
        } catch (err) {
        console.error("Error al ELIMINAR empleado:", err);
        res.status(500).send("Error al ELIMINAR empleado" + err.message);
        }  
})

app.listen(3001,()=> {
    console.log("Corriendo en el puerto 3001");
});
