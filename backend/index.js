const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');;
const app = express();
const jwt = require('jsonwebtoken');
const bodyP = require("body-parser")
const compiler = require("compilex")
const cors = require('cors');
const port = process.env.PORT || 5000;
const options = { stats: true }
compiler.init(options)
app.use(bodyP.json())
require('dotenv').config()


app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_user}:${process.env.DB_pass}@cluster0.xo63l6y.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, { serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true, } });

// verify JWT token 
function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('unauthorized access')
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, decoded) {
        if (err) {
            return res.status(401).send('forbidden access')
        };
        req.decoded = decoded;
        next();
    })
}
async function run() {
    try {
        const usersCollections = client.db("Judge0").collection("usersCollections")

        app.post('/users', async (req, res) => {
            const user = req.body;
            const alreadyExist = await usersCollections.findOne(user)

            if (alreadyExist) {
                console.log('already exist');
                const message = `${alreadyExist.name} already access`;
                return res.send({ acknowledge: false, message })
            }
            const result = await usersCollections.insertOne(user);
            res.send(result)
        });

        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const user = await usersCollections.findOne(query);

            if (user && user.email) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN, { expiresIn: '2h' });
                console.log(token);
                res.send({ accessToken: token });
            }
            else {
                res.status(403).send({ accessToken: '' });
            }
        });

        app.post("/compile", function (req, res) {
            var code = req.body.code
            var input = req.body.input
            var lang = req.body.lang
            try {

                if (lang == "Cpp") {
                    if (!input) {
                        var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                        compiler.compileCPP(envData, code, function (data) {
                            if (data.output) {
                                res.send(data);
                            }
                            else {
                                res.send({ output: "error" })
                            }
                        });
                    }
                    else {
                        var envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } }; // (uses g++ command to compile )
                        compiler.compileCPPWithInput(envData, code, input, function (data) {
                            if (data.output) {
                                res.send(data);
                            }
                            else {
                                res.send({ output: "error" })
                            }
                        });
                    }
                }
                else if (lang == "Java") {
                    if (!input) {
                        var envData = { OS: "windows" };
                        compiler.compileJava(envData, code, function (data) {
                            if (data.output) {
                                res.send(data);
                            }
                            else {
                                res.send({ output: "error" })
                            }
                        })
                    }
                    else {
                        //if windows  
                        var envData = { OS: "windows" };
                        //else
                        compiler.compileJavaWithInput(envData, code, input, function (data) {
                            if (data.output) {
                                res.send(data);
                            }
                            else {
                                res.send({ output: "error" })
                            }
                        })
                    }
                }
                else if (lang == "Python") {
                    if (!input) {
                        var envData = { OS: "windows" };
                        compiler.compilePython(envData, code, function (data) {
                            if (data.output) {
                                res.send(data);
                            }
                            else {
                                res.send({ output: "error" })
                            }
                        });
                    }
                    else {
                        var envData = { OS: "windows" };
                        compiler.compilePythonWithInput(envData, code, input, function (data) {
                            if (data.output) {
                                res.send(data);
                            }
                            else {
                                res.send({ output: "error" })
                            }
                        });
                    }
                }
            }
            catch (e) {
                console.log("error")
            }
        })
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