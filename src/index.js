import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path:'./env'
})

connectDB().then( () => { 
    // app.on('')
    app.listen(process.env.PORT,() => {
      'App is Running, CONNECTION SUCCESS'
    })
}).catch(error => {
  console.log("Database Connection Error :- INDEX.JS :- ",error)
  throw error;
})