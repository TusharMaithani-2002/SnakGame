const username = document.getElementById('username');
const password = document.getElementById('password');
const form = document.getElementById('form');
const error = document.getElementById('errorMessage');
const btn = document.getElementById('btn');
const signIn = document.getElementById('signIn');



function getInfo() {
    form.addEventListener('submit',(e)=>{

        let messages = [];
        if(username.value == "" || username.value == null) {
            messages.push("Name is required!");
        }
        if(password.value == "" || username.value == null) {
            messages.push("Password is required!");
        }
        
        if(messages.length>0) {
            e.preventDefault();
            error.innerText = messages.join(" ");
        } else {
            authenticate(e);
        }
    })
} 

function authenticate(e) {
    
    if(localStorage.getItem(username.value) != null) {
        if(localStorage.getItem(username.value)== password.value)
        console.log("logged in");
        else {
            e.preventDefault(e);
            error.innerText = "Wrong password!";
        }
    } else {
        e.preventDefault();
        error.innerText = "Username not found!";
    }
}

function signUpInto() {
    localStorage.setItem(username.value,password.value)
}