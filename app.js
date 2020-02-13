const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// Connect to ModgoDB Atlas
// connect to mlab database
// make sure to replace my db string & creds with your own
mongoose.connect('mongodb+srv://<user>:<password>@<yourURI')     
mongoose.connection.once('open', () => {
  console.log('conneted to database');
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,  
  graphiql: true
}));

app.listen(4000, () => {
  console.log('Example app listening on port 4000!')
});
