import
    {
        AGREGAR_PRODUCTO,
        AGREGAR_PRODUCTO_EXITO,
        AGREGAR_PRODUCTO_ERROR
    } 
from '../types/index';
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';


//Crear nuevos productos
export function crearNuevoProductoAction(producto){

    return async (dispatch) => {
        
        dispatch( agregarProducto() );

        try {
            //insertar en la API
            await clienteAxios.post('/productos', producto);

            //si todo es ok, actualizar state
            dispatch( agregarProductoExito(producto) );

            //Alerta ok
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );

        } catch (error) {

            console.log(error);
            //si hay error cambia el state
            dispatch( agregarProductoError(true) );

            //Alerta error

            Swal.fire(
                'Error',
                'Hubó un error inesperado, intenta mas tarde',
                'error'
            )
        }
    }
} 

const agregarProducto = () => ({
    type: AGREGAR_PRODUCTO,
    payload: true
});


//Si el producto se guarda en la BD
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
});


//Si hay un error
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
});