//Express using for BackEnd framework

const express = require("express");
const app = express();
app.get('', (req, res)=>{
    res.send("Hello World!");
});

app.listen(3000);     
// able to test in http://localhost:3000/

