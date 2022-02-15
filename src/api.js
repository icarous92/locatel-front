import axios from "axios";

const base_url = 'http://localhost:8080';
const token = localStorage.getItem("token");

export const getRoles = async () => {
  try {
    const response = await axios.get(`${base_url}/auth/roles`);
    return response.data;
  }catch (e) {
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
  try {/*    
    console.log(token);
    const response = await axios.get(`${base_url}/cuenta/listar`, {
      'headers': {
        'Authorization': token
      }
    });
    return response.data;*/

    fetch('http://localhost:8080/cuenta/listar', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization': token,
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      },
    })
  } catch (e) {
    console.log('Api getListCuentas', e);
  }
}


export const setAuthToken = token => {
  
 }