import React, { Fragment, useState, useEffect } from 'react';
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";


function App() {

  //citas en localStorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect es usado apra realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas', JSON.stringify([]))
    }
  }, /*array de dependencias (es un watcher)*/[citas])


  //funcion que tome las citas actuales y agregue nuevas
  const crearCita = cita => {
    guardarCitas([
      ...citas, //Clonamos las citas para no perder los registros
      cita //agrega cita nueva
    ])
  }

  //funcion para eliminar citas
  const eliminarCita = id => {
    //console.log('eliminar...', id);
    const nuevasCitas = citas.filter(cita => cita.id !== id);//el filter eliminaria los registros que sean iguales, pero se usa el inverso para que borre el que no queremos almacenar
    guardarCitas(nuevasCitas);
  }
  // variable para mostrar si hay citas agendadas
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';
  return (
    <Fragment>
      <h1>Admin de pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>

            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}


          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
