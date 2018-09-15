import {REMOVE_ERROR} from './constants'

export function removeError(){
        // Thunk - dispatches conditional actions to reducers
        return function (dispatch){
            dispatch({type: REMOVE_ERROR})
        }
    
    }