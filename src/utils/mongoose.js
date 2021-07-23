const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology:true
});

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     },
//     age: {
//         type: Number
//     }
// })

// const me = new User({
//     name: "Vishnu",
//     age: 26
// });

// me.save().then(() => {
//     console.log(me);
// }).catch((err) => {
//     console.log(err);
// });



const Tasks = mongoose.model('Tasks', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
})


const t1=new Tasks({
    description:"test1",
    completed:true
});

const t2=new Tasks({
    description:"test2",
    completed:false
});

t1.save();
t2.save();

