import {GET_HEADLINES} from './constants'
import axios from 'axios'


export function getHeadlines(query){
    
    return function (dispatch){

        // extract string from query object
        let queryString = Object.values(query)[0]

        // send post resquest to server with query as params
        return axios.post('/api/headlines', {
            params: {
                query: queryString,
            }
        })
        .then(headlines => {
            // dispatch action to reducer with new payload (change state)
            console.log(headlines)
            dispatch({type: GET_HEADLINES, payload: headlines.data})
        })
        .catch(error => {
            throw new Error('Higher-level error. ' + error.message);
        })
        .catch(error => {
            console.error(error)
        })
    }
}