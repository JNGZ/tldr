import {UPDATE_CHART,INITIATE_CHART} from '../actions/constants'

const chartReducer = (state = [], {type, payload}) => {
    switch(type){

        case INITIATE_CHART:
            const chartArray = [];
            const lablesArray = [];
            const datasetsArray = [];
            const arrayOfDataObject = [];
          
            for (let index = 0; index < payload.article.length; index++) {
                const source = payload.article[index].data.id.sourceName;

                const score = payload.article[index].data.sentiment;
                if(lablesArray.includes(source)){
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
                data: datasetsArray,
                backgroundColor: 'rgba(130, 224, 170, 0.7)'
            }

            arrayOfDataObject.push(newDataSetObject);

            chartArray.push(lablesArray, arrayOfDataObject);
         
            return chartArray;



        case UPDATE_CHART:
            const copyOfState = [...state];
            const copyOfLabelState = copyOfState[0];
            const copyOfDataSetsState = copyOfState[1];
            const lengthOfDataSetsArray = copyOfDataSetsState.length;
            const copyOflastObjectInDataSetsArray = copyOfDataSetsState[lengthOfDataSetsArray -1].data;
            const chartArrayNew = [];
            const arrayOfColors = [
                'rgba(130, 224, 170, 0.7)',
                'rgba(229, 115, 115, 0.7)',
                'rgba(171, 71, 188, 0.7)',
                'rgba(66, 165, 245, 0.7)',
                'rgba( 38, 166, 154 , 0.7)',
                'rgba( 156, 204, 101 , 0.7)',
                'rgba( 255, 202, 40, 0.7)',
                'rgba(255, 112, 67, 0.7)',
                'rgba( 121, 85, 72 , 0.7)',
                'rgba( 96, 125, 139 , 0.7)'
            ]

           
            for (let index = 0; index < payload.article.length; index++) {
                const source = payload.article[index].data.id.sourceName;
                const rawScore = payload.article[index].data.sentiment;
                const score = rawScore.toFixed(2);
                
                // IF THE SOURCE EXISTS IN THE LABELS ARRAY
                if(copyOfLabelState.includes(source)){
                    // GET THE INDEX OF THE SOURCE 
                    const sourceIndex = copyOfLabelState.indexOf(source);
                    // console.log('copy of data sets array', copyOfDataSetsState);
                    if (copyOflastObjectInDataSetsArray[sourceIndex] === null) {
                        copyOflastObjectInDataSetsArray[sourceIndex] = parseFloat(score);
                    }else{
                        copyOflastObjectInDataSetsArray[sourceIndex] += parseFloat(copyOflastObjectInDataSetsArray[sourceIndex]) + parseFloat(score);
                    }
                }else{   
                    const indexToSpliceAt = copyOfLabelState.length;
                    copyOfLabelState.splice(indexToSpliceAt,0,source)
                    const sourceIndexNew = copyOfLabelState.indexOf(source);
                    copyOflastObjectInDataSetsArray[sourceIndexNew] = parseFloat(score);                   
                }
            }

            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
              }
             
            let colorIndex = getRandomInt(0,9);
            const newDataSetObjectUpdate = {
                type: 'bar',
                label: payload.query,
                data: copyOflastObjectInDataSetsArray,
                backgroundColor: arrayOfColors[colorIndex]
                
            }

            copyOfDataSetsState.push(newDataSetObjectUpdate);
            chartArrayNew.push(copyOfLabelState, copyOfDataSetsState);
        
            return chartArrayNew

        default:
            return state
    }
}

export default chartReducer;