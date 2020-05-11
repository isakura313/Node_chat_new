const express = require("express")
const favicon = require("express-favicon")


port = process.env.PORT || 8080;

const app = express()

app.set("view engine", "ejs")

app.use(express.static("public"))
app.use(favicon(__dirname + '/favicon.png'))

app.get('/', (req, res)=>{
	res.render("index")
})


server = app.listen(port, () =>{
	console.log("сервер запустился")
	console.log("http://localhost:8080")
})

const io = require("socket.io")(server)

io.on("connection", (socket)=>{
	console.log("У нас новый пользователь")
	socket.username = "Anonim";

	socket.on("change_username", (data)=>{
		socket.username = data.username;
		console.log(`Имя было изменено на ${socket.username}`)
	})

	socket.on("new_message", (data)=>{
		io.sockets.emit("add_mes", {message:data.message, username: socket.username, color: data.color})
		console.log(`Всем отправлено сообщение ${data.message}`);
	})
})






