import {GET_HEADLINES, UPDATE_HEADLINES, UPDATE_CHART, INITIATE_CHART, HEADLINES_FAILURE} from './constants'

import axios from 'axios'

//////////////   A C T I O N   C R E A T O R --- G E T   H E A D L I N E S
export function getHeadlines(query){
    
    // Thunk - dispatches conditional actions to reducers
    return function (dispatch, getState){


        let queryString = Object.values(query)[0]
        // Make server side api post request for headlines
        return axios.post('/api/headlines', {
            params: {
                query: queryString,
            }
        })
        .then(headlines => {
            // Set the headlines
            // Dispatch action to reducer with new payload & change state
            dispatch({type: GET_HEADLINES, payload: headlines.data})

            // Capture state after changed by reducer and return to next promise
            const state = getState().headlines
            return state
        })
        .then(result => {
            // Execute a server side post request for each article description
            // Store each call in the promises array
            const promises = [];
            for (let index = 0; index < result.length; index++) {
                promises.push(
                new Promise(resolve => {
                    axios.post('/api/sentiment', {
                        params: {
                            id: result[index],
                            text: result[index].description
                        }
                    })
                    .then(result => resolve(result))
                }))
            }
            // Return once all promises have been resolved
            return Promise.all(promises).then(result => {return result})
        })
        .then(sentiment => {
            // Update the headlines with sentiment
            dispatch({type: UPDATE_HEADLINES, payload: sentiment})
            return sentiment
        })
        .then(sentiment => {
            // Isolate the query from state
            const query = getState().form.search.values.query
            
            // Create new object with article sentiment and the query used to generate it
            const combinedPayloadObject = {
                article: sentiment,
                query: query
            }
            
            // Conditionally call either initial chart action or update chart action
            // based on the state of chart object
            // Dispatch the appropriate action and set the
            if(getState().chart.length > 0){
                dispatch({type: UPDATE_CHART, payload: combinedPayloadObject})
            }else{
                dispatch({type: INITIATE_CHART, payload: combinedPayloadObject})  
            }        
        })
        .catch(error => {
            console.error('this is an error', error)
            dispatch({type: HEADLINES_FAILURE, payload: error})
        })
    }

}