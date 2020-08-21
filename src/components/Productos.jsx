import React, { Fragment, useEffect } from 'react';
import Producto from './Producto';
import Spinner from './Spinner';

 //Redux
 import { useDispatch, useSelector } from 'react-redux';
 import { obtenerProductosAction } from '../actions/productoActions';

const Productos = () => {

    const dispatch = useDispatch();

    useEffect( () => {
        
        //Consultar API
        const cargarProductos = () => dispatch( obtenerProductosAction() );
        cargarProductos();

    }, [])

    //obtener el state
    const productos = useSelector( state => state.productos.productos); //console.log(productos.productos);
    const error = useSelector( state => state.productos.error );
    const cargando = useSelector( state => state.productos.loading);
    
    return ( 
        <Fragment>

            <h2 className="text-center my-5">Listado de Productos</h2>

            {(error)
                ?<p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error, intenta mas tarde</p>
                :null
            }

            {(cargando)
                ?<Spinner/>
                :null
            }

            <table className="table table-striped">

                <thead className="bg-primary table-dark">

                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>

                </thead>

                <tbody>

                    { (productos.length === 0) 
                        ? <p>No hay productos</p>
                        :  ( productos.map( producto => (

                            <Producto 
                                key={ producto.id }
                                producto={ producto }
                            />
                        ))
                    )}

                </tbody>

            </table>

        </Fragment>
    );
}
 
export default Productos;