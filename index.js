const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./dataBase/conection') 
const cors = require('cors')
const {resolve} = require('path');

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(resolve(__dirname, 'uploads')))
require('./controller/UserController')(app)
require('./controller/authController')(app)
require('./controller/objController')(app)
const PORT = 3000
app.listen(PORT,()=>{
    console.log("acesse http://localhost:"+PORT);
})



