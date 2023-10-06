const express = require('express');
const cors = require('cors');
const colors = require('colors')
require('dotenv').config()
const { graphqlHTTP } = require('express-graphql')

const schema = require('./schema/schema.js')
const port = process.env.PORT || 5000
const connectDB = require('./config/db.js')

//connect to db
connectDB()
const app = express()
console.log(process.env.CLIENT_URL)
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}));


app.use('/graphql',(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_URL);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
}, graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))


app.listen(port, console.log(`Listening to PORT: ${port}`))