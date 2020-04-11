const socket = io.connect('http://localhost:8080')

let message = document.querySelector("#message")

let send_message = document.querySelector("#send_message")

let send_username = document.querySelector("#send_username")

let feedback= document.querySelector("#feedback")

let show_name= document.querySelector("#show_name")




function display_name(name){
	show_name.innerHTML = `Ваш ник <span class="has-text-danger">${name}</span>`;
}

display_name("Аноним");


function send_message(){
	socket.emit("new message", {message: message.value})
}

send_message.onclick = () =>{
	send_message()
}

document.addEventListener("keypress", (e)=>{
	if(e.keyCode == 13){
		send_message()
	}
})


socket.on("add_mes", (data)=>{
	let {username, message} = data;

	feedback.insertAdjacentHTML("beforeend", 
		`<h5 class="has-text-light mes-single has-background-dark">
             <span>${username}</span>
                ${message} </h5>`);
	clear(message)
})
function clear(input){
	input.value = '';
}




