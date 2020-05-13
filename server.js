const express = require('express')
const app = express()
const fs = require('fs')
const {v4:uuid}=require('uuid')
const port = process.env.PORT || 8900
app.use(express.static(__dirname+'/public'))
app.use(express.json())
app.options('/todolist/*', (req, res) => {
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Credentials'
    )
    res.send('ok')
  })
app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:__dirname})
})
app.post("/images",(req,res)=>{
    const id = uuid()
    fs.writeFile(`${id}.png`,req.body.img,'base64',(err)=>{
	if(err) throw err
	console.log("this file has been saved")

})
    
    res.json({"link":`/${id}.png`})

})

app.listen(port,()=>{console.log(`listening on port ${port}`)})

