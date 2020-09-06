import
    {
        AGREGAR_PRODUCTO,
        AGREGAR_PRODUCTO_EXITO,
        AGREGAR_PRODUCTO_ERROR,

        COMENSAR_DESCARGA_PRODUCTOS,
        DESCARGA_PRODUCTOS_EXITO,
        DESCARGA_PRODUCTOS_ERROR,

        OBTENER_PRODUCTO_ELIMINAR,
        PRODUCTO_ELIMINADO_EXITO,
        PRODUCTO_ELIMINADO_ERROR,

        OBTENER_PRODUCTO_EDITAR,
        COMENZAR_EDICION_PRODUCTO,
        PRODUCTO_EDITADO_EXITO,
        PRODUCTO_EDITADO_ERROR
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

//funcion que descarga los productos de la BD
export function obtenerProductosAction(){
    
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {

            const respuesta = await clienteAxios.get('/productos');//console.log(respuesta.data);
                dispatch( descargaProductosExitosa( respuesta.data ) );

        } catch (error) {

            console.log(error);

            dispatch( descargaProductosError() );
        }
    }
}

const descargarProductos = () => ({

    type: COMENSAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({

    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});

//Selecciona y elimina el producto
export function borrarProductoAction(id){

    return async (dispatch) => {

        dispatch( obtenerProductoEliminar(id) );
        //console.log(id);

        try {
            
            //const resultado = 
            await clienteAxios.delete(`/productos/${id}`);
            //console.log(resultado);
            dispatch( eliminarProductoExito() );

            //Si se elimina muestra la alerta exitosa
            Swal.fire(
                'Producto Eliminado!',
                'El producto se elimino correctamente',
                'success'
            )

        } catch (error) {

            console.log(error)
            dispatch( eliminarProductoError() );
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
});

const eliminarProductoExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO
});

const eliminarProductoError = () => ({
    type: PRODUCTO_ELIMINADO_ERROR,
    payload: true
});


//Colocar producto en edición
export function obtenerProductoEditar(producto){

    return(dispatch) => {

        dispatch( obtenerProductoAction(producto) );
    }
}


const obtenerProductoAction = producto => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: producto
});

//Edita un registro en la api y state
export function editarProductoAction(producto){

    return async (dispatch) => {

        dispatch( editarProducto() );

        try {

            await clienteAxios.put(`/productos/${producto.id}`, producto);//console.log(resultado);

            dispatch( editarProductoExitoso(producto) );
            

        } catch (error) {

            console.log(error);
        }
    }
}

const editarProducto = () => ({
    type: COMENZAR_EDICION_PRODUCTO,
});


const editarProductoExitoso = producto => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: producto
});