let friends = JSON.parse(localStorage.getItem("friends")) || [];
let chats = JSON.parse(localStorage.getItem("chats")) || {};
let currentUser = null;

function save(){
localStorage.setItem("friends",JSON.stringify(friends));
localStorage.setItem("chats",JSON.stringify(chats));
}

function addFriend(){

let name=document.getElementById("friendInput").value.trim();

if(!name) return;

friends.push(name);

document.getElementById("friendInput").value="";

save();
renderFriends();

}

function renderFriends(){

let list=document.getElementById("friendList");
list.innerHTML="";

friends.forEach(name=>{

let div=document.createElement("div");

div.className="user";

div.innerHTML=`
<img src="https://i.pravatar.cc/40">
<span>${name}</span>
`;

div.onclick=()=>openChat(name);

list.appendChild(div);

});

}

function chatStranger(){

let name=document.getElementById("strangerInput").value.trim();

if(!name) return;

openChat(name);

}

function openChat(user){

currentUser=user;

document.getElementById("chatHeader").innerText=user;

renderMessages();

}

function renderMessages(){

let box=document.getElementById("chatBox");
box.innerHTML="";

if(!chats[currentUser]) return;

chats[currentUser].forEach(msg=>{

let div=document.createElement("div");

div.className="message "+(msg.me?"me":"");

if(msg.image){

div.innerHTML=`
<div class="bubble">
<img src="${msg.image}" width="150">
<div class="time">${msg.time}</div>
</div>
`;

}else{

div.innerHTML=`
<div class="bubble">
${msg.text}
<div class="time">${msg.time}</div>
</div>
`;

}

box.appendChild(div);

});

box.scrollTop=box.scrollHeight;

}

function sendMessage(){

if(!currentUser) return;

let input=document.getElementById("messageInput");
let text=input.value.trim();

let file=document.getElementById("imageInput").files[0];

if(!text && !file) return;

if(!chats[currentUser]) chats[currentUser]=[];

if(file){

let reader=new FileReader();

reader.onload=function(){

chats[currentUser].push({
image:reader.result,
me:true,
time:new Date().toLocaleTimeString()
});

save();
renderMessages();

};

reader.readAsDataURL(file);

}else{

chats[currentUser].push({
text:text,
me:true,
time:new Date().toLocaleTimeString()
});

save();
renderMessages();

}

input.value="";
document.getElementById("imageInput").value="";

}

function addEmoji(e){

document.getElementById("messageInput").value+=e;

}

function toggleDark(){

document.body.classList.toggle("dark");

}

document.getElementById("messageInput")
.addEventListener("keypress",function(e){

if(e.key==="Enter"){
sendMessage();
}

});

renderFriends();