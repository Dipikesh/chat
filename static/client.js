const socket = io()
const form = document.getElementById('send-container');
const mesaageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container")
const fallback = document.querySelector(".fallback")
var timeout=undefined;
var user;
var check = true;

const append = (message,position) =>{
  
        const messageElement = document.createElement('div');
        // var elems = document.getElementById('message');
        
         messageElement.innerText = message;
         messageElement.classList.add('message');
         messageElement.classList.add(position)
        
        //  mesaageElement.classList.add(mesaageInput.scrollHeight);

         messageContainer.append(messageElement)

        //  var element = document.getElementById('#data');
        //  element.scrollTop = element.scrollHeight;

}



function typingTimeout(){
    typing = false;
    socket.emit('typing',{user : name ,typing:false});
  }

form.addEventListener('submit', (e)=>{
e.preventDefault();
const message = mesaageInput.value;
append(`You : ${message}`,'right')
socket.emit('send',message);
mesaageInput.value ='';
var elem = document.getElementById('data');
elem.scrollTop = elem.scrollHeight;
// messageElement.classList.add(elem.scrollTop)


})

const name = prompt("Enter your name to join");

socket.emit('new-user-joined',name)
socket.on('user-joined',name =>{
    append(`${name} joined the chat`,'right')
             
})

socket.on('receive',data =>{
    append(`${data.name} : ${data.message}`,'left')
    var elems = document.getElementById('data');
    elems.scrollTop = elems.scrollHeight;
    // messageElement.classList.add(elems.scrollTop)
    
})

socket.on('left',name =>{
    append(`${name} left the chat `,'left')
})


$(document).ready(function(){
    $('#messageInp').keyup((e)=>{
      if(e.which!=13){
        typing=true
        socket.emit('typing', {user:name, typing:true})
        clearTimeout(timeout)
        timeout=setTimeout(typingTimeout, 1000)
      }else{
        clearTimeout(timeout)
        typingTimeout()
        //sendMessage() function will be called once the user hits enter
      
      }
    })

    //code explained later
    socket.on('display', (data)=>{
      if(data.typing==true){
      console.log("typing");
        fallback.innerHTML = `<p> ${data.user} is typing...</p>`;
      }else{
        fallback.innerHTML = '';

      }
      
       
    })
});