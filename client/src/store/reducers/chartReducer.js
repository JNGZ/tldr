import {UPDATE_CHART,INITIATE_CHART} from '../actions/constants'

//////////////   C H A R T   R E D U C E R 
// Used to execute state change
const chartReducer = (state = [], {type, payload}) => {

    // Switch according to action type
    switch(type){

        case INITIATE_CHART:
            const chartArray = [];
            const lablesArray = [];
            const datasetsArray = [];
            const arrayOfDataObjects = [];
          
            // For each article in the payload
            // set the source of the article in the labels array
            // and set the initial sentiment score for the article
            for (let index = 0; index < payload.article.length; index++) {
                const source = payload.article[index].data.id.sourceName;
                const score = payload.article[index].data.sentiment;

                // Match the source id from the label array to that of the
                // corresponding dataset array
                // if the source doesn't exist add it to label array
                // if no score exists add one
                // if a score exists add new score to previous score
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

            // Create a new dataset object
            const newDataSetObject = {
                type: 'bar',
                label: payload.query,
                data: datasetsArray,
                backgroundColor: 'rgba(130, 224, 170, 0.7)'
            }

            // Add new dataset object to the array of data objects
            arrayOfDataObjects.push(newDataSetObject);
            // Add labels array and array of data objects to chart array
            chartArray.push(lablesArray, arrayOfDataObjects);
         
            // return the array for use as props to chart component
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

            // For each article in payload get the score
            // and update (add/subtract) the source if one exists
            // otherwise add the source to the labels array
            // and set the score
            for (let index = 0; index < payload.article.length; index++) {
                const source = payload.article[index].data.id.sourceName;
                const rawScore = payload.article[index].data.sentiment;
                const score = rawScore.toFixed(2);
                
                // If the source exists in the labels array..
                if(copyOfLabelState.includes(source)){
                    // Get the index of the source
                    const sourceIndex = copyOfLabelState.indexOf(source);
                    
                    // If the index associated with the source is empty in the 
                    // dataset array add a new score
                    // otherwise add or subtract to the original score
                    if (copyOflastObjectInDataSetsArray[sourceIndex] === null) {
                        copyOflastObjectInDataSetsArray[sourceIndex] = parseFloat(score);
                    }else{
                        copyOflastObjectInDataSetsArray[sourceIndex] += parseFloat(copyOflastObjectInDataSetsArray[sourceIndex]) + parseFloat(score);
                    }
                // If the source doesnt exist inject it into the appropriate position in labels array copy
                // and inject score into the appropriate position in dataset copy
                }else{   
                    const indexToSpliceAt = copyOfLabelState.length;
                    copyOfLabelState.splice(indexToSpliceAt,0,source)
                    const sourceIndexNew = copyOfLabelState.indexOf(source);
                    copyOflastObjectInDataSetsArray[sourceIndexNew] = parseFloat(score);                   
                }
            }

            // Generic randome number function
            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min)) + min;
              }
            
            // Used to pick a random color from the color array
            let colorIndex = getRandomInt(0,9);
            
            // Create the new dataset object
            const newDataSetObjectUpdate = {
                type: 'bar',
                label: payload.query,
                data: copyOflastObjectInDataSetsArray,
                backgroundColor: arrayOfColors[colorIndex]
                
            }

            // Push the new object onto the dataset array
            copyOfDataSetsState.push(newDataSetObjectUpdate);
            // Push the dataset array onto the updated chart array 
            chartArrayNew.push(copyOfLabelState, copyOfDataSetsState);
        
            // Return the chart array for use as props in chart component
            return chartArrayNew

        // If neither case is chosen return the original state (DEFAULT)
        default:
            return state
    }
}

export default chartReducer;