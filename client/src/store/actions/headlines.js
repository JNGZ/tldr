import {GET_HEADLINES, UPDATE_HEADLINES, UPDATE_CHART, INITIATE_CHART} from './constants'

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
        .then(result => {
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
        .then(sentiment => {
            dispatch({type: UPDATE_HEADLINES, payload: sentiment})
            return sentiment
        })
        .then(sentiment => {
            // isolate the query from state
            const query = getState().form.search.values.query
         
            const combinedPayloadObject = {
                article: sentiment,
                query: query
            }
             // console.log('get the state of chart', getState().chart)
             if(getState().chart.length > 0){
                console.log('chart is not empty')
                dispatch({type: UPDATE_CHART, payload: combinedPayloadObject})
            }else{
                dispatch({type: INITIATE_CHART, payload: combinedPayloadObject})  
                console.log('chart is empty')
            }
                        
        })
        .catch(error => {
            throw new Error('Higher-level error. ' + error.message);
        })
        .catch(error => {
            console.error(error)
        })
    }

}