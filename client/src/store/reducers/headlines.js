import {GET_HEADLINES, UPDATE_HEADLINES} from '../actions/constants'

const headlinesReducer = (state = [], {type, payload}) => {
    switch(type){

        case GET_HEADLINES:
            return payload
            
        case UPDATE_HEADLINES:
            const arrayOfObjects = [];

            for (let index = 0; index < payload.length; index++) {
                const article = payload[index];
                const element = state[index];
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