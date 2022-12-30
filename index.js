const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
const port = process.env.PORT || 5000;



const app = express();


//  middleware 
app.use(cors()); 0
app.use(express.json());


const uri = "mongodb+srv://<username>:<password>@cluster0.a3goieg.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });





async function run() {
    try {
        const taskCollection = client.db('taskManager').collection('addTask');


        // add task post
        app.post('/addTask', async (req, res) => {
            const task = req.body;
            const result = await taskCollection.insertOne(task);
            res.send(result);
        });

        //  add task get
        app.get('/addTask', async (req, res) => {
            const email = req.query.email;
            console.log(email);

            const query = { email: email };
            const task = await taskCollection.find(query).toArray();
            res.send(task);
        });

        // delete task
        app.delete('/addTask/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await taskCollection.deleteOne(filter);
            res.send(result);
        });



    }
    finally {

    }
}

run().catch(console.log);





app.get('/', async (req, res) => {
    res.send('taskManager server is running');
})

app.listen(port, () => console.log(`taskManager server is running on ${port}`));


// export the express api
module.export = app;