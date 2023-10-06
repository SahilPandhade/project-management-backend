const express = require('express');
const cors = require('cors');
const colors = require('colors')
require('dotenv').config()
const {graphqlHTTP} = require('express-graphql')

const schema = require('./schema/schema.js')
const port = process.env.PORT || 5000
const connectDB = require('./config/db.js')

//connect to db
connectDB()
const app  = express()
console.log(process.env.CLIENT_URL)
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    
}));
app.use((req, res, next) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      process.env.CLIENT_URL
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Private-Network", true);
    //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
    res.setHeader("Access-Control-Max-Age", 7200);
  
    next();
  });
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}))


app.listen(port,console.log(`Listening to PORT: ${port}`))