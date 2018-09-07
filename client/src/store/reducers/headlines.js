import {GET_HEADLINES} from '../actions/constants'

const headlinesReducer = (state = [], {type, payload}) => {
    switch(type){
        case GET_HEADLINES:
            return payload
        default:
            return state
    }
}

export default headlinesReducer;