
mongoose.connect('mongodb+srv://root:root@cluster0.j9w2i.mongodb.net/test', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{console.log('connected')}).catch((err)=>{console.log(err)});


mongoose.Promise = global.Promise;


