import {UPDATE_CHART,INITIATE_CHART} from '../actions/constants'

const chartReducer = (state = [], {type, payload}) => {
    switch(type){

        case INITIATE_CHART:
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
                }
            }

            const newDataSetObject = {
                type: 'bar',
                label: payload.query,
                data: datasetsArray
            }

            arrayOfDataObject.push(newDataSetObject);

            console.log('array of object', arrayOfDataObject)
            chartArray.push(lablesArray, arrayOfDataObject);
            return chartArray



            case UPDATE_CHART:
            const copyOfState = [...state];
            const copyOfLabelState = copyOfState[0];
            const copyOfDataSetsState = copyOfState[1];
            const datasetsArrayNew = [];
            const chartArrayNew = [];
            console.log('in update chart action')
            console.log('copy of state', copyOfState)
           
            for (let index = 0; index < payload.article.length; index++) {
                const source = payload.article[index].data.id.sourceName;
                const rawScore = payload.article[index].data.sentiment;
                const score = rawScore.toFixed(2);
                console.log('score', score);
                
                // IF THE SOURCE EXISTS IN THE LABELS ARRAY
                if(copyOfLabelState.includes(source)){
                    // GET THE INDEX OF THE SOURCE 
                    const sourceIndex = copyOfLabelState.indexOf(source);
                    if (datasetsArrayNew[sourceIndex] === null) {
                        datasetsArrayNew[sourceIndex] = score;
                    }else{
                        datasetsArrayNew[sourceIndex] += score;
                    }
                }else{
                    
                    const indexToSpliceAt = copyOfLabelState.length;
                    copyOfLabelState.splice(indexToSpliceAt,0,source)
            
                    // lablesArray.push(source);
                    const sourceIndexNew = copyOfLabelState.indexOf(source);
                    datasetsArrayNew[sourceIndexNew] = score;
                    
                }

            }

            const newDataSetObjectUpdate = {
                type: 'bar',
                label: payload.query,
                data: datasetsArrayNew
            }
            copyOfDataSetsState.push(newDataSetObjectUpdate);

            chartArrayNew.push(copyOfLabelState, copyOfDataSetsState);
            console.log('initial chart state', chartArrayNew);
            return chartArrayNew















        default:
            return state
    }
}

export default chartReducer;