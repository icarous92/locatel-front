import React, {useState} from "react";
import {postLogin} from "../api";
import {Link, useNavigate} from "react-router-dom";
import '../static/stylesheets/login.css';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      if (user !== '' && pass !== '') {
        setError('');
        const data = await postLogin({ nombreUsuario: user, password: pass });        
        localStorage.setItem('user', data.nombreUsuario);
        localStorage.setItem('token', `${data.bearer} ${data.token}`);
        localStorage.setItem('roles', data.authorities.map(el => el.authority));
        navigate('/cuenta');
      } else setError('Todos los campos son obligatorios');
    }catch (e){
      console.log(e);
    }
  }

  return (
    <div className="login-page">
      <div className="form">
        <h2>Locatel</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input onChange={event => setUser(event.target.value)} type="text" placeholder="username"/>
          <input onChange={event => setPass(event.target.value)} type="password" placeholder="password"/>
          <button type="submit">Login</button>
          <p className="message">
            No tienes cuenta? <Link to="/register">Registrate</Link>
          </p>
          <p className="error">{error}</p>
        </form>
      </div>
    </div>
  );
}

export default Login;
