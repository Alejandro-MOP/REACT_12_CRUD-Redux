import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from './Spinner';

//Actions de Redux
import { crearNuevoProductoAction } from '../actions/productoActions';

const NuevoProducto = ({ history }) => {

    //State local
    const [nombre, guardarNombre] = useState('');
    const [precio, guardarPrecio] = useState(0);

    //Acceder a los elementos del state
    const cargando = useSelector( state => state.productos.loading ); //console.log(cargando);
    const error = useSelector( state => state.productos.error );


    //utilizar useDispatch y crea un función
    const dispatch  = useDispatch();

    //mandar llamar el action de productoAction
    const agregarProducto = producto => dispatch( crearNuevoProductoAction(producto) );

    //cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //Validar formulario
        if (nombre.trim() === '' || precio <= 0) {
            return;
        }

        //Si no hay errores


        //Crear el nuevo Producto
        agregarProducto({
            nombre,
            precio
        });

        //redireccionar a home
        history.push('/');
    }
    
    return ( 
        
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form
                            onSubmit = { submitNuevoProducto }
                        >
                            <div className="form-group">
                                <label>Nuevo Producto</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={ nombre }
                                    onChange={ e => guardarNombre(e.target.value) }
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={ precio }
                                    onChange={ e => guardarPrecio(Number(e.target.value)) }
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar
                            </button>
                        </form>

                        { (cargando)
                            ?<Spinner />
                            :null
                        }

                        {(error)
                            ?<p className="alert alert-danger p2 mt-4 text-center">Hubo un error</p>
                            :null
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NuevoProducto;