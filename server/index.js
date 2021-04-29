import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
// require('dotenv').config();

import postRoutes from './routes/posts.js'

//initializes the app,uses all the functions on app
const app = express();


//not sure why it's saying it's depreciated 
app.use(bodyParser.json({limit: "30mb", extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// every route in route inside of 'postRoutes' will start with 'posts' 
app.use('/posts', postRoutes)
//mongodb connection
const CONNECTION_URL = process.env.MONGODB_URI
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT,()=>console.log(`Server running on port:${PORT}`)))
    .catch((error)=>console.log(error.message))
    
//makes sure no warnings appear in the console
mongoose.set('useFindAndModify', false)