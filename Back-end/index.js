let express = require('express');
let cors = require('cors');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let app = express();

let apiRoutes = require("./api-routes");
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://hari:Hari@96778@cluster0.opfox.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully");

var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello Doctor API...'));

app.use('/api', apiRoutes);

app.listen(port, function () {
    console.log("Running RestHub on port " + port);
});