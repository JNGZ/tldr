import {GET_HEADLINES} from './constants'
import axios from 'axios'


export function getHeadlines(query){
    
    return function (dispatch){

        // take query and get the value out of javascsript object
        let queryValues = Object.values(query)
        let queryText = queryValues[0]
        // encode the query for network request
        let encoded = encodeURI(queryText)

        // build api url from query
        let baseUrl = "https://newsapi.org/v2/"
        let endpoint = "everything?"
        let q = "q=" + encoded
        let language = "&language=en"
        let pageSize = "&pageSize=" + 3
        let apikey = "&apiKey=9b215697b6e64eee94691526f2a163d3"
        let url = baseUrl + endpoint + q + language + pageSize + apikey;

        // make request to Newsapi
        return axios.get(url)
        // convert data to json and map results
        .then(json => json.data.articles.map(res => ({
            author: res.author,
            description: res.description,
            url: res.url,
            urlToImage: res.urlToImage,
            sourceName: res.source.name,
            title: res.title
        })))
        // Insert code for api call here
        // .then change state all together
        .then(headlines => {
            // C H A N G E   S T A T E   H E
            // dispatch action to reducer with new payload (change state)
            dispatch({type: GET_HEADLINES, payload: headlines})

            //// MOVE THIS UP BEFORE CHANGING STATE ^
            // for each article in headlines
            //      pull out description
            //      make post api call
            //      receive response and dispatch action to change state
            //          ** how do I post score to the right article?
            let article1 = headlines[0].description;
            console.log(article1);
            axios({
                method: 'post',
                url:'/api/customers',
                data: {'data': article1},
            })
            
        })
    }
}