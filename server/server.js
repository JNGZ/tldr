const express = require('express');
const language = require('@google-cloud/language');
const axios = require('axios')
const request = require('request');
const bodyParser = require('body-parser')

const app = express();


// Google natural language client instance
const client = new language.LanguageServiceClient({
  keyFilename: './tldrNews-e7bf7783f089.json'
});


app.use(bodyParser.json())


//////////////  P O S T   R E Q U E S T --- H E A D L I N E S
app.post('/api/headlines', (req, res) => {

  // Capture the request query
  let dataObject = encodeURI(Object.values(req.body)[0].query);

  // Build the request url 
  let baseUrl = "https://newsapi.org/v2/"
  let endpoint = "everything?"
  let q = "q=" + dataObject
  let language = "&language=en"
  let pageSize = "&pageSize=" + 3
  let apikey = "&apiKey=9b215697b6e64eee94691526f2a163d3"
  let url = baseUrl + endpoint + q + language + pageSize + apikey;

  // Execute get request to NewsApi.com
  return axios.get(url)
  .then(results => {
    const resultsObject = results.data.articles;
    
    // Add ID to each atricle object
    for (let index = 0; index < resultsObject.length; index++) {
      resultsObject[index].id = index;
    }
    return results.data.articles;
  })
  // convert data to json and map results
  .then(json => json.map(res => ({
    author: res.author,
    description: res.description,
    url: res.url,
    urlToImage: res.urlToImage,
    sourceName: res.source.name,
    title: res.title,
    id: res.id
  })))
  .then(response => {
    res.send(response)
  })
  .catch(error => {
    res.send(error.response.status)
  })
})


//////////////  P O S T   R E Q U E S T --- S E N T I M E N T   A N A L Y S I S
app.post('/api/sentiment', (req,res) => {
  
  // Capture text to analyze
  const text = Object.values(req.body)[0].text;
  const id = Object.values(req.body)[0].id;

  // Create document object and pass text to analyze
  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  // Send document to Google Language API for sentiment analysis
  client.analyzeSentiment({document: document})
    // Capture sentiment score from result
    .then(results => {
      const sentiment = results[0].documentSentiment;
      return sentiment.score;
    })
    // Create sentiment Object and return to client side
    .then(sentiment => {
      const sentimentObject = {
        "id": id,
        "sentiment": sentiment,
      }
      res.send(sentimentObject)
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

})


const port = 5000;


module.exports = app.listen(port, () => `Server running on port ${port}`);