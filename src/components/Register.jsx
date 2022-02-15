import React, {useEffect, useState} from "react";
import Select from 'react-select'
import {Link} from "react-router-dom";

import {getRoles, postRegistro} from "../api";

import '../static/stylesheets/register.css';

const Register = props => {
  const [error, setError] = useState('');
  const [roles, setRoles] = useState([]);
  const [nombre, setNombre] = useState('');
  const [usuario, setUsuario] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rolesSelect, setRolesSelect] = useState([]);

  const restGetRoles = async () => {
    const data = await getRoles();
    setRoles(data.map(el => ({
      label: el.rol, value: el.id
    })));
    console.log("Register restGetRoles", data);
  }

  const restSetUser = async event => {
    event.preventDefault();
    if(rolesSelect.length > 0 && nombre !== '' && usuario !== '' &&  correo !== '' && contrasena !== '') {
      const data = await postRegistro({
        nombre: nombre,
        nombreUsuario: usuario,
        email: correo,
        password: contrasena,
        roles: rolesSelect.map(el => el.label)
      });
      alert(data);
    } else setError('Todos los campos se deben llenar');
  }

  useEffect(() => {
    (async () => {
      await restGetRoles();
    })();
  }, []);

  return (
    <div className="login-page">
      <div className="form">
        <h2>Locatel registro</h2>
        <form className="register-form" onSubmit={restSetUser}>
          <input type="text" placeholder="Nombre" onChange={event => setNombre(event.target.value)}/>
          <input type="text" placeholder="Usuario" onChange={event => setUsuario(event.target.value)}/>
          <input type="email" placeholder="Correo" onChange={event => setCorreo(event.target.value)}/>
          <input type="password" placeholder="Password" onChange={event => setContrasena(event.target.value)}/>
          <Select isMulti options={roles} onChange={value => setRolesSelect(value)} />
          <button type="submit">create</button>
          <p className="message">
            Ya estas registrado? <Link to="/">Ingresa</Link>
          </p>
          <p className="error">{error}</p>
        </form>
      </div>
    </div>
  );
}

export default Register;
