import {INITIATE_CHART, UPDATE_CHART} from '../actions/constants'
import Decimal from 'decimal.js';

const chartReducer = (state = [], {type, payload}) => {
    switch(type){

        case INITIATE_CHART:
            console.log('in initiate chart action')
            const chartArray = []
            const lablesArray = [];
            const datasetsArray = [];
            const arrayOfDataObject = [];
            const keyLabelValueScore = [];
          
            for (let index = 0; index < payload.article.length; index++) {
                const source = payload.article[index].data.id.sourceName;
                // console.log(source);
                // const rawScore = ;
                const rawScore = payload.article[index].data.sentiment;
                const score = rawScore.toFixed(2)
                console.log('type of score',typeof(score))
                console.log('score', score)
    
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
                // if source doesnt exist
                // if(!(source in keyLabelValueScore)){
                //     keyLabelValueScore[source] = score
                  
                // }else if(source in keyLabelValueScore) {

                //     console.log(typeof('type of score', parseFloat(score)))
                //     if(Math.sign(score) < 0 && Math.sign(keyLabelValueScore[source].score) < 0){
                //         keyLabelValueScore[source] = -keyLabelValueScore[source].score + -score
                //     }else if(Math.sign(score) < 0 && Math.sign(keyLabelValueScore[source].score) >= 0){
                //         keyLabelValueScore[source] = keyLabelValueScore[source].score + -score
                //     }else if(Math.sign(score) >= 0 && Math.sign(keyLabelValueScore[source].score) >= 0){
                //         keyLabelValueScore[source] = keyLabelValueScore[source].score + score
                //     }else if(Math.sign(score) >= 0 && Math.sign(keyLabelValueScore[source].score) < 0){
                //         keyLabelValueScore[source] = -keyLabelValueScore[source].score + score
                //     }
                    

                // }
                

                const newDataSetObject = {
                    type: 'bar',
                    label: payload.query,
                    data: datasetsArray
                }
                arrayOfDataObject.push(newDataSetObject);

            }

            console.log('keyvaluescore', keyLabelValueScore)
            
            // const copyOfState = [...state]
            // if(copyOfState[0] === undefined){
            //     console.log('empty state')
            // }
            // else{
            //     console.log('assign copy', copyOfState[0]);
            //     const indexToSpliceAt = copyOfState[0].length;
            //     copyOfState[0].splice(0,indexToSpliceAt,lablesArray)
            //     console.log('spliced copy', copyOfState[0]);
            // }
            


                    // if(copyOfState[0] === undefined){
                    //     console.log('empty state')
                    //     lablesArray.push(source);
                    //     const sourceIndex = lablesArray.indexOf(source);
                    //     datasetsArray[sourceIndex] = score;
                    // }else{
                    //     if(copyOfState[0].includes(source)){
                    //         console.log('source already exists in copy of state')
                    //     }else{
                    //         console.log('assign copy', copyOfState[0]);
                    //         const indexToSpliceAt = copyOfState[0].length;
                    //         copyOfState[0].splice(indexToSpliceAt,0,source)
                    //         console.log('spliced copy', copyOfState[0]);
                    //     }
                    // }


            chartArray.push(lablesArray, arrayOfDataObject);
            console.log('initial chart state', chartArray);
            return chartArray

        case UPDATE_CHART:
            const copyOfState = [...state];
            const copyOfLabelState = copyOfState[0];
            const copyOfDataSetsState = copyOfState[1];
            const datasetsArrayNew = [];
            const chartArrayNew = [];
            const arrayOfDataObjectNew = [];
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

                const newDataSetObject = {
                    type: 'bar',
                    label: payload.query,
                    data: datasetsArrayNew
                }
                copyOfDataSetsState.push(newDataSetObject);

            }

            chartArrayNew.push(copyOfLabelState, copyOfDataSetsState);
            console.log('initial chart state', chartArrayNew);
            return chartArrayNew




        default:
            return state
    }
}

export default chartReducer;