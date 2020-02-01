const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

// bind express with graphql
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});
