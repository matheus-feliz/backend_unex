const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require('./dataBase/conection') 
const cors = require('cors')

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
require('./controller/UserController')(app)
require('./controller/authController')(app)
const PORT = 3000
app.listen(PORT,()=>{
    console.log("acesse http://localhost:"+PORT);
})



