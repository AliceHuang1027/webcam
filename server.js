const express = require('express')
const app = express()
const fs = require('fs')
const {v4:uuid}=require('uuid')
const port = process.env.PORT || 8900
app.use(express.static(__dirname))
app.use(express.json({limit:'10mb'}))
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
    fs.writeFile(`./${id}.png`,req.body.img,'base64',(err)=>{
	if(err) throw err
	console.log("this file has been saved")

})
    res.json({"link":`http://localhost:8900/${id}.png`})

})

app.get('/:pic',(res,req)=>{
	const pic = req.params.pic
	console.log(pic)
	if(pic){
		res.sendFile(`${pic}`,{root:__dirname})
	}
})

app.listen(port,()=>{console.log(`listening on port ${port}`)})

