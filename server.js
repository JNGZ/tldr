const express = require('express');
const language = require('@google-cloud/language');
const axios = require('axios')

const app = express();
const bodyParser = require('body-parser')

// store key file name in .env variable
const client = new language.LanguageServiceClient({
  keyFilename: './tldrNews-12e84bfb662c.json'
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
  // convert data to json and map results
  .then(json => json.data.articles.map(res => ({
    author: res.author,
    description: res.description,
    url: res.url,
    urlToImage: res.urlToImage,
    sourceName: res.source.name,
    title: res.title,
  })))
  .then(response => {
    
    for (let index = 0; index < response.length; index++) {

      const object = response[index];
      const text = response[index].description;

      const document = {
        content: text,
        type: 'PLAIN_TEXT',
      };

        client
        .analyzeSentiment({document: document})
        .then(results => {
          const sentiment = results[0].documentSentiment;
            console.log(`Text: ${text}`);
            console.log(`Sentiment score: ${sentiment.score}`);
            console.log(`Sentiment magnitude: ${sentiment.magnitude} \n`);
            
        })
        .catch(err => {
          console.error('ERROR:', err);
        });
        
        object.score = index;
      
    }


    res.send(response)
  })
})


const port = 5000;

app.listen(port, () => `Server running on port ${port}`);