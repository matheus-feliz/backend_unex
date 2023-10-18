const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {connect} = require('./dataBase/conection') 
const cors = require('cors')
const {resolve} = require('path');
const fs = require('fs')

connect();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(resolve(__dirname, 'uploads')))
require('./controller/UserController')(app)
require('./controller/authController')(app)
require('./controller/objController')(app)
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    if (!fs.existsSync(resolve(__dirname, 'uploads'))){
        fs.mkdirSync(resolve(__dirname, 'uploads'));
    }
    console.log("acesse http://localhost:"+PORT);
})



