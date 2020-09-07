import
    {
        MOSTAR_ALERTA,
        OCULTAR_ALERTA
    } 
from '../types/index';

export function mostrarAlerta(alerta){

    return(dispatch) => {
        dispatch( crearAlerta(alerta) )
    }
}

const crearAlerta = alerta => ({
    type: MOSTAR_ALERTA,
    payload: alerta
});

export function ocultarAlertaAction(){

    return(dispatch) => {
        dispatch( ocultarAlerta() );
    }
}

const ocultarAlerta = () => ({
    type: OCULTAR_ALERTA
})