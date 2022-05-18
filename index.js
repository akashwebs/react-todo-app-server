const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const cors = require('cors');
const app=express()

app.use(cors())
app.use(express.json())
const port=process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fjgkd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();

        const todoCollection=client.db('todo').collection('task')
        // get all todo services data
        app.get('/todo',async(req,res)=>{
          const query={}
          const cursor=todoCollection.find(query)
          const result=await cursor.toArray()
          res.send(result);
        })

        app.post('/addtask',async(req,res)=>{
            const task=req.body;
            const result=await todoCollection.insertOne(task);
            res.send(result);
        })
      

    }
    finally{

    }
}
run().catch(console.dir)

app.get('/',(req,res)=>{
    res.send('todo app running');
})

app.listen(port, ()=>{
    console.log('successfully run todo app', port);
})