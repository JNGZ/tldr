import {UPDATE_CHART} from '../actions/constants'

const chartReducer = (state = [], {type, payload}) => {
    switch(type){

        case UPDATE_CHART:
        console.log('payload',payload)
            const chartArray = []
            const lablesArray = [];
            const datasetsArray = [];
            const arrayOfDataObject = [];
          
            for (let index = 0; index < payload.article.length; index++) {
                const source = payload.article[index].data.id.sourceName;
                // console.log(source);
                const score = payload.article[index].data.sentiment;
                if(lablesArray.includes(source)){
                    // console.log('labelsArray includes ' + source);
                    const sourceIndex = lablesArray.indexOf(source);
                    if (datasetsArray[sourceIndex] === null) {
                        datasetsArray[sourceIndex] = score;
                    }else{
                        datasetsArray[sourceIndex] += score;
                    }
                }else{
                    lablesArray.push(source);
                    const sourceIndex = lablesArray.indexOf(source);
                    datasetsArray[sourceIndex] = score;
                    // console.log('Added ' + source + ' to labelsArray');
                }
                console.log('index ', index)
                console.log('labels array',lablesArray);
                console.log('datasets array', datasetsArray)
                const newDataSetObject = {
                    type: 'bar',
                    label: payload.query,
                    data: datasetsArray
                }
                arrayOfDataObject.push(newDataSetObject);

            }
            console.log('array of object', arrayOfDataObject)
            chartArray.push(lablesArray, arrayOfDataObject);
            // console.log('chart array', chartArray);
            return chartArray

        default:
            return state
    }
}

export default chartReducer;