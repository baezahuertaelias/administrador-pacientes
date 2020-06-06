import React from 'react';
import PropTypes from 'prop-types';

const Cita = ({ cita, eliminarCita }) => (

    <div className="cita" >
        <p>Mascota: <span>{cita.mascota}</span></p>
        <p>Dueño: <span>{cita.propietario}</span></p>
        <p>Fecha: <span>{cita.fecha}</span></p>
        <p>Hora: <span>{cita.hora}</span></p>
        <p>Sintomas: <span>{cita.sintomas}</span></p>

        <button
            className="button eliminar u-full-width"
            onClick={() => eliminarCita(cita.id)} //esperamos que elimine la cita
        >Eliminar &times;</button>
    </div>

);

Cita.propTypes = {
    cita: PropTypes.object.isRequired,
    eliminar: PropTypes.func.isRequired
}

export default Cita;