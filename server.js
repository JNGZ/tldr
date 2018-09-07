const express = require('express');
const language = require('@google-cloud/language');

const app = express();
const bodyParser = require('body-parser')

const client = new language.LanguageServiceClient({
  keyFilename: './tldrNews-12e84bfb662c.json'
});


app.use(bodyParser.json())

//
app.post('/api/customers', (req, res) => {
  // build api url from query


  let dataJson = req.body;
  let dataObject = Object.values(dataJson);
  let dataValue = dataObject[0];
  console.log('server side', dataValue)


  const text = dataValue;

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
    console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
  })
  .catch(err => {
    console.error('ERROR:', err);
  });

})

app.get('/api/customers', (req, res) => {
console.log('hit');



  // const customers = [
  //   {id: 1, firstName: 'John', lastName: 'Doe'},
  //   {id: 2, firstName: 'Brad', lastName: 'Traversy'},
  //   {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  // ];

  // res.json(customers);
});



const port = 5000;

app.listen(port, () => `Server running on port ${port}`);