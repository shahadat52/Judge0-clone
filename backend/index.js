const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');;
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config()


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.xo63l6y.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true, } });

async function run() {
    try {

    }
    catch (error) {
        // Handle the exception
        console.error("An error occurred:", error);
    }

}
run().catch((error) => console.error(error));


app.get('/', (req, res) => {
    res.send('Judge0 server is running')
});

app.listen(port, () => {
    console.log(`Judg0 server is running on ${port}`);
})