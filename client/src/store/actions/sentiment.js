import {GET_SENTIMENT} from './constants'

import axios from 'axios'

export function getSentiment(query){
    console.log('fire sentiment action');
    return function(dispatch, getState){
        let queryString = Object.values(query)[0];
        const fetchState = getState();
        console.log(fetchState);

        return axios.post('/api/sentiments', {
            params:{
                query: queryString,
            }
        })
        .then(sentiments => {
            dispatch({type: GET_SENTIMENT, payload: sentiments.data})
        })
        .catch(error => {
            console.error(error)
        })
    }
}

// export function getSentiment(){
//     console.log('fire sentiment action');
//     return function(dispatch, getState){
//         const theState = getState().headlines;
//         console.log(theState);
//     }
// }