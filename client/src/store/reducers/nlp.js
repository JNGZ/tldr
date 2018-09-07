import {GET_SENTIMENT} from '../actions/constants'

const sentimentReducer = (state = [], {type, payload}) => {
    switch(type){
        case GET_SENTIMENT:
            return payload
        default:
            return state
    }
}

export default sentimentReducer;