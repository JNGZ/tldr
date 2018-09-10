import {GET_HEADLINES, UPDATE_HEADLINES} from './constants'

import axios from 'axios'



export function getHeadlines(query){
    
    return function (dispatch, getState){

        let queryString = Object.values(query)[0]

        return axios.post('/api/headlines', {
            params: {
                query: queryString,
            }
        })
        .then(headlines => {
            // dispatch action to reducer with new payload (change state)
            dispatch({type: GET_HEADLINES, payload: headlines.data})

            const state = getState().headlines
            return state
        })
        .then( result => {
            console.log('logging result client side',result)

            const promises = [
                new Promise(resolve => {
                    axios.post('/api/sentiment', {
                        params: {
                            id: result[0],
                            text: result[0].description
                        }
                    })
                    .then(result => resolve(result))
                }),
                new Promise(resolve => {
                    axios.post('/api/sentiment', {
                        params: {
                            id: result[1],
                            text: result[1].description
                        }
                    })
                    .then(result => resolve(result))
                }),
                new Promise(resolve => {
                    axios.post('/api/sentiment', {
                        params: {
                            id: result[2],
                            text: result[2].description
                        }
                    })
                    .then(result => resolve(result))
                }),
            ]

            return Promise.all(promises)
            .then( 
                result => {
                    return result
                }
            )
        })
        .then( sentiment => {
            console.log('sentiments',sentiment)
            dispatch({type: UPDATE_HEADLINES, payload: sentiment})
            // dispatch({type: UPDATE_HEADLINES, payload: sentiment.data})
            
        })
        .catch(error => {
            throw new Error('Higher-level error. ' + error.message);
        })
        .catch(error => {
            console.error(error)
        })
    }

}