const express = require('express')
const mongoose= require('mongoose')
const bookRouter=require('../src/routers/book.routes')
const feedbackRouter=require('../src/routers/feedback.routes')
const app = express()
const port =  process.env.PORT |3000

app.use(express.json());
const dbURI = process.env.MONGODB_URL;

mongoose.connect('mongodb://127.0.0.1:27017/bookstore', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{console.log('connected')}).catch((err)=>{console.log(err)});


mongoose.Promise = global.Promise;


app.use('/book',bookRouter);
app.use('/feedback',feedbackRouter);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))