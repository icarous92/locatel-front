import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import '../static/stylesheets/menu.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Home = props => {
  const navigate = useNavigate();
  const clearSession = () => {
    localStorage.clear()
    navigate('/');
  }
  const nameUser = localStorage.getItem('user');

  return (
    <>
      <Nav className="justify-content-center bg-dark opacity-75" activeKey="/home">
        <Nav.Item>
            <Link to='/cuenta'>Cuentas</Link>
        </Nav.Item>
        <Nav.Item>
            <span onClick={clearSession}>Cerrar Sesion</span>
        </Nav.Item>
        <Nav.Item>
        <Row>
          <Col>
          <i className="bi bi-person-bounding-box"></i>
          </Col>
          <Col>
            <span>{nameUser}</span>
          </Col>
        </Row>
        </Nav.Item>
      </Nav>
    </>);
}

export default Home;
