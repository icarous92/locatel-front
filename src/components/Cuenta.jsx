import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Modal, Button, Container, FormGroup, Row, Col } from "react-bootstrap";
import { getListCuentas, postConsignar, postRetirar, getUsuarios, postCrearCuenta } from "../api";
import { useNavigate } from "react-router-dom";
import Select from 'react-select'

const Cuenta = (props) => {
  let band = false;
  const navigate = useNavigate();  
  //Hook Cuentas
  const [value, setValue] = useState([]);
  const restGetListCuentas = async () => {
    const data = await getListCuentas();
    setValue(data);
  };
  //Hook Modals
  const [show, setShow] = useState(false);
  const [showCrear, setShowCrear] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [valor, setValor] = useState('');
  const [usuarios, setUsuario] = useState([]);
  const [usuarioSelect, setUsuarioSelect] = useState([]);
  //Close Modals
  const movModalClose = () => {
    setShowCrear(false);
    setShow(false);
  };
  //Show Modal Consignar y Retirar
  const movModalShow = (nombre, cuenta) => {
    setTitulo(nombre);
    setNumeroCuenta(cuenta);
    setShow(true);
  }
  //Show Modal Crear Cuenta
  const crearCuentaModal = () => {
    restGetUsuarios();
    setShowCrear(true);
  }
  //Cargar Usuarios
  const restGetUsuarios = async () => {    
    if(band===false){
      band = true;
      const data = await getUsuarios();
      if(data){
        setUsuario(data.map(el => ({
          label: el.usuario, value: el.usuario
        })));
      }else{
        movModalClose();
      }
      
    }
    
  }
  //SaveModal Consignar y Retirar
  const movModalSave = async event => {
    event.preventDefault();
    if (titulo === 'Consignar') {
      if (valor > 0) {
        const data = await postConsignar({
          numeroCuenta: numeroCuenta,
          valor: valor
        });
        if (data) alert(data.mensaje);
        navigate('/');
      } else alert('Todos los campos se deben llenar');
    }
    if (titulo === 'Retirar') {
      if (valor > 0) {
        const data = await postRetirar({
          numeroCuenta: numeroCuenta,
          valor: valor
        });
        if (data) alert(data.mensaje);
        navigate('/');
      } else alert('Todos los campos se deben llenar');
    }

  }
  //SaveModal Crear Cuenta
  const crearModalSave = async event =>{
    event.preventDefault();
    const data = await postCrearCuenta({
      numeroCuenta:numeroCuenta,
      valor: valor,
      nombreUsuario: usuarioSelect.value
    });
    if (data) alert(data.mensaje);
    movModalClose();
    restGetListCuentas();
  }
  //Map Lista de cuentas
  const Tbody = () => (
    <React.Fragment>
      <tbody className="text-center text-light">
        {value.map((v, i) => (
          <tr key={i}>
            <td>{v.numeroCuenta}</td>
            <td>{v.usuarioNombre}</td>
            <td>{v.valor}</td>
            <td>
              <Button variant="warning" onClick={() => movModalShow("Consignar", v.numeroCuenta)}>
                Consignar
              </Button>
            </td>
            <td>
              <Button variant="danger" onClick={() => movModalShow("Retirar", v.numeroCuenta)}>
                Retirar
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </React.Fragment>
  );
  //Lista de cuentas y Listar Usuarios
  useEffect(() => {
    (async () => {
      await restGetListCuentas();
    })();
  }, []);

  return (
    <div className="container mt-5">
      <Container>
        <Row>
          <Col sm={10}>
            <h2 className="text-light">Listado de Cuentas</h2>
          </Col>
          <Col sm={2}>
            <Button variant="primary" onClick={() => crearCuentaModal()}>
              Crear Cuenta
            </Button>
          </Col>
        </Row>
      </Container>
      <Container>
        <Table hover>
          <thead className="text-center text-light">
            <tr>
              <th>Nombre Usuario</th>
              <th>Número de Cuenta</th>
              <th>Valor</th>
              <th colSpan={2}>Acciones</th>
            </tr>
          </thead>
          <Tbody />
        </Table>
      </Container>
      <Modal show={show} onHide={movModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Movimiento {titulo}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup>
            <label>Numero Cuenta</label>
            <input className="form-control" name="numeroCuenta" disabled value={numeroCuenta} type="text" />
          </FormGroup>

          <FormGroup>
            <label>Valor</label>
            <input className="form-control" name="valor" type="number" onChange={event => setValor(event.target.value)} />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={movModalClose}>
            Cerrar
          </Button>

          <Button variant="primary" onClick={movModalSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCrear} onHide={movModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Cuenta</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <FormGroup>
            <label>Numero Cuenta</label>
            <input className="form-control" name="numeroCuenta"  onChange={event => setNumeroCuenta(event.target.value)} type="text" />
          </FormGroup>

          <FormGroup>
            <label>Usuario</label>
            <Select options={usuarios} onChange={value => setUsuarioSelect(value)} />
          </FormGroup>

          <FormGroup>
            <label>Valor</label>
            <input className="form-control" name="valor" type="number" onChange={event => setValor(event.target.value)} />
          </FormGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={movModalClose}>
            Cerrar
          </Button>

          <Button variant="primary" onClick={crearModalSave}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div >
  );
};

export default Cuenta;