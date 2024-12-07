//all inputs
var signInName = document.getElementById("signInName");
var signInPassword = document.getElementById("signInPassword");
var signUpName = document.getElementById("signUpName");
var signUpEmail = document.getElementById("signUpEmail");
var signUpPassword = document.getElementById("signUpPassword");
var requiredInputs = document.getElementById("requiredInputs");
var existEmail = document.getElementById("existEmail");
var emptyLogin = document.getElementById("loginEmpty");
var incorrect = document.getElementById("incorrect");
var welcome = document.getElementById("welcome");

var userName = "";

userName = localStorage.getItem("userName");

var signUpData = [];

if (localStorage.getItem("signUpData") !== null) {
  signUpData = JSON.parse(localStorage.getItem("signUpData"));
}

function signUp() {
  if (isEmpty()) {
    requiredInputs.style.display = "block";
    existEmail.style.display = "none";
  } else if (isExist()) {
    existEmail.style.display = "block";
    requiredInputs.style.display = "none";
    clearInputs();
  } else {
    var signUpUser = {
      name: signUpName.value,
      email: signUpEmail.value,
      password: signUpPassword.value,
    };
    signUpData.push(signUpUser);
    localStorage.setItem("signUpData", JSON.stringify(signUpData));
    window.location.href = "index.html";
  }
}

function clearInputs() {
  signUpName.value = null;
  signUpEmail.value = null;
  signUpPassword.value = null;
}

function isEmpty() {
  if (
    signUpName.value == "" ||
    signUpEmail.value == "" ||
    signUpPassword.value == ""
  ) {
    return true;
  } else {
    return false;
  }
}

function isExist() {
  for (let i = 0; i < signUpData.length; i++) {
    if (signUpData[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
      return true;
    } else {
      return false;
    }
  }
}

// sign in
function loginEmpty() {
  if (signInName.value == "" || signInPassword.value == "") {
    return true;
  } else {
    return false;
  }
}

function checkUser() {
  for (let i = 0; i < signUpData.length; i++) {
    if (
      signInName.value == signUpData[i].name &&
      signInPassword.value == signUpData[i].password
    ) {
      localStorage.setItem("userName", signUpData[i].name);
      return true;
    }
  }
}

function login() {
  if (loginEmpty()) {
    emptyLogin.style.display = "block";
    incorrect.style.display = "none";
  } else if (checkUser()) {
    window.location.href = "home.html";
  } else {
    incorrect.style.display = "block";
    emptyLogin.style.display = "none";
  }
}

if (userName) {
  welcome.innerHTML = "welcome " + userName;
}

//log out

function logout() {
  localStorage.removeItem("username");
  window.location.href = "index.html";
}
