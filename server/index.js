import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://javascriptmastery:UG284o4CJIJSLaw3@cluster0.l8xhn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser:true, useUnifiedTopology:true})
        .then(()=>app.listen(PORT,() => console.log(`Sever is running on port: ${PORT}`)))
        .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);