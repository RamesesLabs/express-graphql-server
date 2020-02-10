const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

// Connect to ModgoDB Atlas
const connectDB = async () => {
  try {
      await mongoose.connect('mongodb+srv://<user>:<password>@<yourURI>', {
          useNewUrlParser: true,
          useCreateIndex: true,
          useUnifiedTopology: true,
          useFindAndModify: false
      });     
  } catch (err) {
      console.error(err.message);
      process.exit(1);
  }
};

mongoose.connection.once('open', () => {
  console.log('connected to database');
});



app.get('/', (req, res) => {
  res.send('Hello World!')
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  
  graphiql: true,
}));

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
