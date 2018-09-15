import {HEADLINES_FAILURE, REMOVE_ERROR} from '../actions/constants'

//////////////   E R R O R   R E D U C E R 
// Used to execute state change
const errorReducer = (state = [], {type, payload}) => {

    // Switch according to action type
    switch(type){

        case HEADLINES_FAILURE:
        const errorStatus = Object.values(payload)[2].status;
        const errorArray = []
        errorArray.push(errorStatus)
        return errorArray


        case REMOVE_ERROR:
            return []

        default:
            return state
    }
}

export default errorReducer