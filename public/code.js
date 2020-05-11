const socket = io.connect("http://localhost:8080");

let message = document.querySelector("#message");

let send_message = document.querySelector("#send_message");

let send_username = document.querySelector("#send_username");

let feedback = document.querySelector("#feedback");

let show_name = document.querySelector("#show_name");

const background_color = ['has-background-danger', 'has-background-info', 'has-background-primary', 'has-background-dark', 'has-background-link']


function getRand(arr){ 
  let rand_num = Math.round(Math.random() * arr.length - 1 )
  let mod_num = Math.abs(rand_num)
  return mod_num
}

let user_color = background_color[getRand(background_color)];




function display_name(name) {
  show_name.innerHTML = `Ваш ник <span class="${user_color}">${name}</span>`;
}

send_username.onclick = () => {
  socket.emit("change_username", { username: username.value });
  display_name(username.value);
};

display_name("Аноним");

function sending_m() {
  socket.emit("new_message", { message: message.value, color:user_color });
}

send_message.onclick = () => {
  sending_m();
};

document.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    sending_m();
  }
});

socket.on("add_mes", (data) => {
  let { username, message, color} = data;

  feedback.insertAdjacentHTML(
    "beforeend",
    `<h5 class="has-text-light mes-single ${color}">
             <span class="hast-text-white">${username}</span>
                ${message} </h5>`
  );
  clear(message);
});
function clear(input) {
  input.value = "";
}
