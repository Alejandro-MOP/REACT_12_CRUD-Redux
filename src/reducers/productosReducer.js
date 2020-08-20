//cada reducer tiene su propio state
const initialState = {
    productos: [],
    error: null,
    loading: false
}

export default function( state = initialState, action ){

    switch (action.payload) {
        
        default:
            return state;
            
    }
}