
mongoose.connect('mongodb://127.0.0.1:27017/bookstore', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{console.log('connected')}).catch((err)=>{console.log(err)});


mongoose.Promise = global.Promise;


