import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import pedidoService from '../services/pedidoService';
import { useAuth } from '../context/AuthContext';
import './BoletaPage.css';

const BoletaPage = () => {
    const [pedido, setPedido] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchPedido = async () => {
            try {
                const data = await pedidoService.getPedidoById(id);
                setPedido(data);
            } catch (err) {
                setError('No se pudo cargar la boleta. Por favor, inténtelo de nuevo más tarde.');
                console.error(err);
            }
        };

        fetchPedido();
    }, [id, user, navigate]);

    if (error) {
        return <div className="boleta-container"><h2>{error}</h2></div>;
    }

    if (!pedido) {
        return <div className="boleta-container"><h2>Cargando boleta...</h2></div>;
    }

    const subtotal = pedido.detalles.reduce((sum, item) => sum + item.precioUnitario * item.cantidad, 0);
    const igv = subtotal * 0.18;
    const total = subtotal + igv;

    return (
        <div className="boleta-container">
            <div className="boleta">
                <div className="boleta-header">
                    <h1>Boleta de Venta Electrónica</h1>
                    <div className="boleta-info">
                        <p><strong>RUC:</strong> 20123456789</p>
                        <p><strong>Nro. Boleta:</strong> B001-{String(pedido.pedidoID).padStart(6, '0')}</p>
                    </div>
                </div>

                <div className="cliente-info">
                    <h3>Datos del Cliente</h3>
                    <p><strong>Cliente:</strong> {pedido.c}</p>
                    <p><strong>Dirección de Envío:</strong> {pedido.direccionEnvio}</p>
                    <p><strong>Fecha de Emisión:</strong> {new Date(pedido.fechaPedido).toLocaleDateString()}</p>
                </div>

                <table className="productos-table">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unit.</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pedido.detalles.map(item => (
                            <tr key={item.productoID}>
                                <td>{item.nombreProducto}</td>
                                <td>{item.cantidad}</td>
                                <td>S/ {item.precioUnitario.toFixed(2)}</td>
                                <td>S/ {(item.cantidad * item.precioUnitario).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="boleta-totales">
                    <p><strong>Subtotal:</strong> S/ {subtotal.toFixed(2)}</p>
                    <p><strong>IGV (18%):</strong> S/ {igv.toFixed(2)}</p>
                    <p><strong>Total a Pagar:</strong> S/ {total.toFixed(2)}</p>
                </div>

                <div className="boleta-footer">
                    <p>Gracias por su compra en Patitas y Sabores</p>
                    <button onClick={() => window.print()} className="print-button">Imprimir Boleta</button>
                </div>
            </div>
        </div>
    );
};

export default BoletaPage;
