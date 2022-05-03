const express = require('express')
const mongoose= require('mongoose')
const bookRouter=require('../src/routers/book.routes')
const feedbackRouter=require('../src/routers/feedback.routes')
const signInRouter=require('../src/routers/signin.route')
const userRouter=require('../src/routers/user.routes')
const cors = require('cors');
const { User } = require('realm')

const app = express()
const port =  process.env.PORT |3000
app.use(cors({
    origin: '*'
}));
app.use(express.json());
const dbURI = process.env.MONGODB_URL;

mongoose.connect('mongodb+srv://root:root@cluster0.j9w2i.mongodb.net/TestDb', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{console.log('connected')}).catch((err)=>{console.log(err)});


mongoose.Promise = global.Promise;

app.use('/book',bookRouter);
app.use('/feedback',feedbackRouter);
app.use('/signin',signInRouter);
app.use('/user',userRouter);
app.use(express.json());
app.use(cors({
    origin: '*'
}));
app.get('/', (req, res) => res.send('Hello World!'))


app.listen(port, () => console.log(`Example app listening on port port!`))

exports.app = app;