import React, { useEffect } from 'react';
import Table from 'react-bootstrap/Table';

import { getListCuentas } from "../api";

const Cuenta = props => {

    /*const [cuentas, setCuentas] = useState([]);
    const dataCuentas = '';
/*
    const [cuentaId, setCuentaId] = useState('');
    const [numeroCuenta, setNumeroCuenta] = useState('');
    const [usuarioNombre, setUsuarioNombre] = useState('');
    const [valor, setValor] = useState('');
*/
    const restGetListCuentas = async () => {
        const data = await getListCuentas();
        console.log("Register restGetRoles", data);
    }

    const Tbody = () => (
        <React.Fragment>
            <tbody>
                <tr>
                    <td  />
                    <td>hola</td>
                    <td>hola</td>
                    <td>hola</td>
                    <td>hola</td>
                </tr>
            </tbody>
        </React.Fragment>
    );

    useEffect(() => {
        (async () => {
            await restGetListCuentas();
        })();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-light">Listado de Cuentas</h2>
            <Table striped bordered hover>
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
        </div>
    )
}

export default Cuenta;