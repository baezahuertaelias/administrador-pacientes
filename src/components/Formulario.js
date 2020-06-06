import React, { Fragment, useState } from "react";
import { uuid } from 'uuidv4';
import PropTypes from 'prop-types';

const Formulario = ({ crearCita }) => {
  //Creando state de citas
  const [cita, actualizarCita] = useState({
    mascota: '',
    propietario: '',
    fecha: '',
    hora: '',
    sintomas: ''
  });
  const [error, actualizarError] = useState(false)

  //Funcion que se ejecuta cada vez que un usuario escribe en el campo
  const actualizarState = e => {
    actualizarCita({
      ...cita,
      [e.target.name]: e.target.value
    })
  }


  //extraer valores
  const { mascota, propietario, fecha, hora, sintomas } = cita;

  //ejecuta cuando el usuario presiona agregarcita
  const submitCita = e => {
    e.preventDefault(); //Previene que haga la accion por defecto

    //Validar los datos
    if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
      actualizarError(true);//avisamos que hay error
      return;//return previene que siga ejecutandose el resto del codigo
    }

    //Eliminar mensaje previo (de error)
    actualizarError(false);

    //Asignar ID
    cita.id = uuid();

    //Crear cita
    crearCita(cita);

    //Limpiar form
    actualizarCita({
      mascota: '',
      propietario: '',
      fecha: '',
      hora: '',
      sintomas: ''
    })
  };



  return (
    <Fragment>
    <h2>Crear Cita</h2>

    { error ? <p className="alerta-error">Todos los campos son obligatorios</p>     : null }

    <form
        onSubmit={submitCita}
    >
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="mascota"
          className="u-full-width"
          placeholder="Nombre mascota"
          onChange={actualizarState}
          value={mascota}
        />

        <label>Nombre dueño</label>
        <input
          type="text"
          name="propietario"
          className="u-full-width"
          placeholder="Nombre dueño de mascota"
          onChange={actualizarState}
          value={propietario}
        />

        <label>Fecha</label>
        <input
          type="date"
          name="fecha"
          className="u-full-width"
          onChange={actualizarState}
          value={fecha}
        />

        <label>Hora</label>
        <input
          type="time"
          name="hora"
          className="u-full-width"
          onChange={actualizarState}
          value={hora}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="sintomas"
          onChange={actualizarState}
          value={sintomas}
        ></textarea>

        <button
          type="submit"
          className="u-full-width button-primary"
        >Agregar Cita</button>
      </form>
    </Fragment>
  );
};

Formulario.propTypes = {
  crearCita : PropTypes.func
}

export default Formulario;
