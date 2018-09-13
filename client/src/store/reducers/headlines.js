import {GET_HEADLINES, UPDATE_HEADLINES} from '../actions/constants'

//////////////   H E A D L I N E S   R E D U C E R
// Used to execute state change of headlines
const headlinesReducer = (state = [], {type, payload}) => {
    switch(type){

        case GET_HEADLINES:
            return payload
            
        case UPDATE_HEADLINES:
            const arrayOfObjects = [];

            // For each article add the sentiment score
            // Match the score to the right article
            for (let index = 0; index < payload.length; index++) {
                const article = payload[index];
                const element = state[index];
                console.log('element in headlines reducer for update',element);
                
                // If there is a match add the score
                if(element.id === article.data.id.id){
                    const newObject = {
                        ...state[index],
                        score: article.data.sentiment
                    }
                    arrayOfObjects.push(newObject);
                }else{
                    console.log('no match')
                }
            }

            return arrayOfObjects;   

        default:
            return state
    }
}

export default headlinesReducer;