const express = require("express")


port = process.env.PORT || 8080;

const app = express()

app.get('/', (req, res)=>{
	res.send("Я снова живу")
})


server = app.listen(port, () =>{
	console.log("сервер запустился")
	console.log("http://localhost:8080")
})
