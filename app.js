const express = require('express')
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

var root = { hello: () => 'Hello world Again!' };

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});