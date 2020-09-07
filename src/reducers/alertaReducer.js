import
    {
        MOSTAR_ALERTA,
        OCULTAR_ALERTA
    } 
from '../types/index';

const initialState = {
    alerta: null
}

export default function( state = initialState, action){

    switch (action.type) {

        case MOSTAR_ALERTA:
            return{
                ...state,
                alerta: action.payload
            }

        case OCULTAR_ALERTA:
            return{
                ...state,
                alerta: null
            }

        default:
            return state;
    }
}