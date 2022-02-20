import axios from "axios";

const base_url = 'http://localhost:8080';
const data = {
    "mensaje": "Usuario no autorizado"
}

export const getRoles = async () => {
  try {
    const response = await axios.get(`${base_url}/auth/roles`);
    return response.data;
  } catch (e) {
    console.log("Api getRoles", e);
  }
}

export const postRegistro = async obj => {
  try {
    const response = await axios.post(`${base_url}/auth/nuevo`, obj);
    return response.data;
  } catch (e) {
    console.log('Api postRegistro', e);
  }
}

export const postLogin = async obj => {
  try {
    const response = await axios.post(`${base_url}/auth/login`, obj);
    return response.data;
  } catch (e) {
    console.log('Api postLogin', e);
  }
}

export const getListCuentas = async () => {
  try {
    let token = localStorage.getItem("token");
    const response = await axios.get(`${base_url}/auth/cuenta/listar`, {
      'headers': {
        'Authorization': token
      }
    });
    return response.data;

  } catch (e) {
    console.log('Api getListCuentas', e);
  }
}

export const postConsignar = async obj => {
  try {    
    let token = localStorage.getItem("token");
    const response = await axios.post(`${base_url}/auth/movimiento/consignar`, obj, {
      'headers': {
        'Authorization': token
      }
    })
    .catch(function (error) {
      if (error.response.status === 403) {
        alert(data.mensaje);
        return data;
      }else{
        alert(error.response.data.mensaje);
      }
    });
    return response.data;
  } catch (e) {
    console.log('Api postConsignar', e);
  }
}

export const postRetirar = async obj => {
  try {    
    let token = localStorage.getItem("token");
    const response = await axios.post(`${base_url}/auth/movimiento/retirar`, obj, {
      'headers': {
        'Authorization': token
      }
    })    
    .catch(function (error) {
      if (error.response.status === 403) {
        alert(data.mensaje);
        return data;
      }else{   
        alert(error.response.data.mensaje);
      }
    });
    return response.data;
  } catch (e) {
    console.log('Api postConsignar', e);
  }
}

export const getUsuarios = async () => {
  try {
    let token = localStorage.getItem("token");
    const response = await axios.get(`${base_url}/auth/cuenta/usuarios`, {
      'headers': {
        'Authorization': token
      }
    }).catch(function (error) {
      if (error.response.status === 403) {
        alert(data.mensaje);
        return data;
      }else{
        alert(error.response.data.mensaje);
      }
    });
    return response.data;
  } catch (e) {
    console.log("Api getUsuarios", e);
  }
}

export const postCrearCuenta = async obj =>{
  try {    
    let token = localStorage.getItem("token");
    const response = await axios.post(`${base_url}/auth/cuenta/nuevo`, obj, {
      'headers': {
        'Authorization': token
      }
    })    
    .catch(function (error) {
      if (error.response.status === 403) {
        alert(data.mensaje);
        return data;
      }else{
        alert(error.response.data.mensaje);
      }
    });
    return response.data;
  } catch (e) {
    console.log('Api postCrearCuenta', e);
  }
}