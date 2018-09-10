const express = require('express');
const language = require('@google-cloud/language');
const axios = require('axios')
const request = require('request');

const app = express();
const bodyParser = require('body-parser')

// store key file name in .env variable
const client = new language.LanguageServiceClient({
  keyFilename: './tldrNews-e7bf7783f089.json'
});


app.use(bodyParser.json())

app.post('/api/headlines', (req, res) => {

  let dataObject = encodeURI(Object.values(req.body)[0].query);

  let baseUrl = "https://newsapi.org/v2/"
  let endpoint = "everything?"
  let q = "q=" + dataObject
  let language = "&language=en"
  let pageSize = "&pageSize=" + 3
  let apikey = "&apiKey=9b215697b6e64eee94691526f2a163d3"
  let url = baseUrl + endpoint + q + language + pageSize + apikey;


  return axios.get(url)
  // Add id to each atricle object
  .then(results => {
    const resultsObject = results.data.articles;
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
    res.send(response)})
})




app.post('/api/sentiment', (req,res) => {
  
  const text = Object.values(req.body)[0].text;
  const id = Object.values(req.body)[0].id;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

    client
    .analyzeSentiment({document: document})
    .then(results => {
      const sentiment = results[0].documentSentiment;
      return sentiment.score;
    })
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

app.listen(port, () => `Server running on port ${port}`);