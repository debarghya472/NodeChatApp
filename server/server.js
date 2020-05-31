const path =require('path');
const pathP=path.join(__dirname,'../public');
const express=require('express');

var port=process.env.PORT || 3000;

var app =express();

app.use(express.static(pathP));


app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})