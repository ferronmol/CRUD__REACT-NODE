import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  
const [nombre, setNombre] = useState("");
const [edad, setEdad] = useState(0);
const [poblacion, setPoblacion] = useState("");
const [cargo, setCargo] = useState("");
const [anios, setAnios] = useState(0);
const [id, setId] = useState();
const [empleadosList, setEmpleados] = useState([]); //lista de empleados
const [editar,setEditar] = useState(false)

const add = () =>{ 
    Axios.post("http://localhost:3001/create", {
      nombre:nombre,
      edad:edad,
      poblacion:poblacion,
      cargo:cargo,
      anios:anios
    }).then(()=>{
      getEmpleados();
       limpiarCampos();
      alert("Empleado registrado");
  }).catch((error) => {
    console.error("Error:", error);
  })
  }
  const update = () =>{
    Axios.put("http://localhost:3001/update",{
      id:id,
      nombre:nombre,
      edad:edad,
      poblacion:poblacion,
      cargo:cargo,
      anios:anios
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      alert("Empleado actualizado")
    });
  };
  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setCargo("");
    setPoblacion("");
    setAnios("");
    setId("");
    setEditar(false);

  }
  const editarEmpleado = (val) =>{
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setCargo(val.cargo);
    setPoblacion(val.poblacion);
    setAnios(val.anios);
    setId(val.id);
  };
  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      console.log(response.data)
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        const data = response.data[0]; // Obtén el primer elemento del array
        const empleados = response.data.map((row) => ({
          id: row[0],
          nombre: row[1],
          edad: row[2],
          poblacion: row[3],
          cargo: row[4],
          anios: row[5],
        }));
        setEmpleados(empleados);
      } else {
        setEmpleados([]); // Establece empleados en un array vacío si no hay datos
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }


  useEffect(() => {
    getEmpleados()
  }, []); //el argumento [] es para que se ejecute solo una vez

  return (
    <div className="container-fluid">
    <div className="card text-center">
        <div className="card-header">
            GESTIÓN DE EMPLEADOS
        </div>
        <div className = "card-body">
          <div className = "input-group mb-3">
              <span className = "input-group-text" id="basic-addon1">Nombre:</span>     
              <input type="text" 
                    onChange={(event) => {
                    setNombre(event.target.value);
                    }}
                    className ="form-control"  placeholder="Nombre y Apellidos"
                    aria-label="Username" aria-describedby="basic-addon1"
              />
          </div>
          <div className = "input-group mb-3">
              <span className = "input-group-text" id="basic-addon2">Edad:</span>
              <input type="number" 
                  onChange={(event) => {
                  setEdad(Number(event.target.value));
                  }}
                  className ="form-control" value={edad} placeholder="Edad" 
                  aria-label="Edad" aria-describedby="basic-addon2"/>
          </div>
          <div className = "input-group mb-3">
              <span className = "input-group-text" id="basic-addon3">Población:</span>
              <input type="text" 
                  onChange={(event) => {
                  setPoblacion(event.target.value);
                  }}
                  className ="form-control" value={poblacion} placeholder="Población"
                  aria-label="poblacion" aria-describedby="basic-addon3"/>
          </div>
          <div className = "input-group mb-3">
              <span className = "input-group-text" id="basic-addon4">Cargo:</span>
              <input type="text" 
                  onChange={(event) => {
                  setCargo(event.target.value);
                  }}
                  className ="form-control" value={cargo} placeholder="junior, senior, jefe de proyecto" 
                  aria-label="Cargo" aria-describedby="basic-addon4"/>
          </div>
          <div className = "input-group mb-3">
              <span className = "input-group-text" id="basic-addon5">Años de Experiencia:</span>
              <input type="number" 
                  onChange={(event) => {
                  setAnios(Number(event.target.value));
                  }}
                  className ="form-control" value ={anios} placeholder="Tiempo en la empresa en años" 
                  aria-label="Años" aria-describedby="basic-addon5"/>
          </div> 
      </div>
      <div className="card-footer text-body-secondary">
        {
          editar?
          <div>
            <button className='btn btn-warning m-2' onClick = {update}
            >Actualizar</button>
            <button className='btn btn-info m-2' onClick = {limpiarCampos}
            >Cancelar</button>
          </div>
            :<button className='btn btn-success' onClick = {add}
            >Registrar</button>
        }
      </div>
    </div>
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Nombre</th>
          <th scope="col">Edad</th>
          <th scope="col">Población</th>
          <th scope="col">Cargo</th>
          <th scope="col">Experiencia</th>
          <th scope="col">Acciones</th>
          </tr>
      </thead>
      <tbody>
        {  empleadosList.map((val,key) => {
            return   <tr key={key}>
                <th scope="row">{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.poblacion}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                    <div className="btn-group" role="group"   aria-label="Basic mixed styles example">

                        <button type="button" 
                        onClick={() =>{
                                editarEmpleado(val);
                                }} 
                                className="btn btn-success">Editar</button>
                        <button type="button" className="btn btn-danger">Eliminar</button>                   
                    </div>      
                </td>
                </tr>             
          })
        }   
      </tbody>
    </table>
    </div>
  );    
  }
export default App;