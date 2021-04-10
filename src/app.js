const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongo = require('mongoose');

const schema = require('./schema');

const app = express();

mongo.connect('mongodb://localhost:27017/gqlapi', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongo.connection.once('open', () => {
    console.log('Connected to the database');
});

app.use(
    '/graphiql',
    graphqlHTTP({
        schema: schema,
        graphiql: true,
    }),
);

app.listen(8080, () => {
    console.log('Server is running successfully');
});
