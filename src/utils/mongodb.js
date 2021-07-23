const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'testDb';
const id = new ObjectID();
console.log(id);
console.log(id.getTimestamp());
MongoClient.connect(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, client) => {

    if (err) {
        return console.log('unabled to connect the database');
    }
    console.log('Connected to database');
    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //     "name": "Vishnukumar",
    //     "age": 26
    // }, async (error, result) => {
    //     if (error) {
    //         return console.log('Unabled to insert the user');
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('employee').insertMany([
    //     { "name": "Sreerag", "Designation": "Software Engineer" },
    //     { "name": "SreeHari", "Designation": "Team Leader" }
    // ], async (error, result) => {
    //     if (error) {
    //         return console.log('Unabled to insert the user');
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('task').insertMany([
    //     { _id:id,"description77": "Learn mongodb", "status": true },
    //     { "description": "AWs learning", "status": false },
    //     { "description": "Learn React js", "status": false },
    //     { "description": "Learn Node js", "status": true },
    // ], async (error, result) => {
    //     if (error) {
    //         return console.log('Unabled to insert the user');
    //     }
    //     console.log(result.ops);
    // });


    // db.collection('task').findOne({_id: ObjectID('60eda71a19ebb43bd800ac55')},async(err,task)=>{
    //     console.log(task);
    // })

    // db.collection('task').find({"status":true}).toArray((err,tasks)=>{
    //     console.log(tasks);
    // });

    const updtePromise = db.collection('task').updateOne({ _id: ObjectID('60eda71a19ebb43bd800ac55') },
        {
            $set: { "name": "vishnu kumar ps" }
        });
    updtePromise.then((result) => {
     console.log(result);
    }).catch((err) => {
        console.log(err)
    });


});