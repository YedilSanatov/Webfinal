const form = document.getElementById('form');
const formlog = document.getElementById('formLog');
const emaillog = document.getElementById('emailLog');
const passwordlog = document.getElementById('passwordLog');

const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


form.addEventListener('submit', e => {
	e.preventDefault();
	if (checkInputs()) {
		postRegister(obj, (pesponse) => {
			alert(response);
		});
	}

});

formlog.addEventListener("submit", e => {
	e.preventDefault();
	if (checkLogin()) {
		getLogin(emaillog.value.trim(), passwordlog.value.trim());
	}

});

function checkInputs() {
	const usernameValue = username.value.trim();
	const emailValue = email.value.trim();
	const passwordValue = password.value.trim();
	const password2Value = password2.value.trim();



	if (usernameValue === '') {
		setErrorFor(username, 'Username cannot be blank');
		return false;
	} else {
		setSuccessFor(username);
	}
	if (emailValue === '') {
		setErrorFor(email, 'Email cannot be blank');
		return false;
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, 'Not a valid email');
		return false;
	} else {
		setSuccessFor(email);
	}

	if (passwordValue === '') {
		setErrorFor(password, 'Password cannot be blank');
		return false;
	} else if (!isPassword(passwordValue)) {
		setErrorFor(password, 'Not a valid pasword');
		return false;
	} else {
		setSuccessFor(password);
	}

	if (password2Value === '') {
		setErrorFor(password2, 'Password2 cannot be blank');
		return false;
	} else if (passwordValue !== password2Value) {
		setErrorFor(password2, 'Passwords does not match');
		return false;
	} else {
		setSuccessFor(password2);
	}
	return true;
}

function checkLogin() {
	const emailVal = emaillog.value.trim();
	const passwordVal = passwordlog.value.trim();

	if (emailVal === '') {
		setErrorFor(emaillog, 'Email cannot be blank');
		return false;
	} else if (!isEmail(emailVal)) {
		setErrorFor(emaillog, 'Not a valid email');
		return false;
	} else {
		setSuccessFor(emaillog);
	}

	if (passwordVal === '') {
		setErrorFor(passwordlog, 'Password cannot be blank');
		return false;
	} else {
		setSuccessFor(passwordlog);
	}

	return true;
}

function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form-control error';
	small.innerText = message;
}

function setSuccessFor(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}



function isEmail(email) {
	const val = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(gmail.com)|(mail.ru)|(yahoo.com)|(yandex.ru)$/;
	return val.test(email);
}

function isPassword(password) {
	const val = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	return val.test(password);
}

var obj = {
	"username": username,
	"email": email,
	"password": password
}


function postRegister(obj) {
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "https://my-json-server.typicode.com/YedilSanatov/mockjson2/users", true);
	var stringObj = JSON.stringify(obj);
	xhr.send(stringObj);
	xhr.onreadystatechange = function () {
		if (this.readyState === 4 && this.status == 201) {
			console.log(stringObj);
			console.log(this.response);
			var json = jQuery.parseJSON(this.response);
			alert("You registered! id:" + json.id);
		}

	};
};

function getLogin(email, password) {
	$.get("https://my-json-server.typicode.com/YedilSanatov/mockjson2/users", function (data, status) {
		console.log(data);
		console.log(status);

		var resultat = findElement(data, email);
		if (resultat.length != 0) {
			if (resultat[0].password != password) {
				setErrorFor(passwordlog, "Нou do not have the correct password")
			} else {
				alert("You signed")
			}
		}
		setErrorFor(emaillog, "User is not found");
	});
}

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// var container = document.getElementById("results");
// var btn = document.getElementById('Btn');

// var radioList = ["Cars", "users"];
// var option;

// btn.addEventListener("click", function () {
// 	var ourRequest = new XMLHttpRequest();
// 	option = checkWhich();
// 	ourRequest.open('GET', "https://my-json-server.typicode.com/YedilSanatov/mockjson2/" + option);
// 	ourRequest.onload = function () {
// 		var myData = JSON.parse(ourRequest.responseText);
// 		renderHTML(ourData);
// 	};
// 	ourRequest.send();
// });

// var numberOfResult = 1;

// function renderHTML(data) {

// 	var userIdValue = document.getElementById('Id').value;
// 	var idValue = document.getElementById('price').value;

// 	for (var i = 0; i < data.length; i++) {

// 		if (option == "Cars") {
// 			if (data[i].postId == parseInt(userIdValue) && data[i].id == parseInt(idValue)) {
// 				container.insertAdjacentHTML('beforeend', "<h2> Result #" + numberOfResult + "</h2>");
// 				container.insertAdjacentHTML('beforeend', "<h6> model: " + data[i].model + "</h4>");
// 				container.insertAdjacentHTML('beforeend', "<h6> engine: " + data[i].engine + "</h6>");
// 				container.insertAdjacentHTML('beforeend', "<p> price: " + data[i].price + "</p>");
// 				numberOfResult++;
// 			}
// 		}
// 		if (option == "users") {
// 			if (data[i].id == parseInt(idValue)) {
// 				container.insertAdjacentHTML('beforeend', "<h2> Result #" + numberOfResult + "</h2>");
// 				container.insertAdjacentHTML('beforeend', "<h4> username: " + data[i].name + "</h4>");
// 				container.insertAdjacentHTML('beforeend', "<h4> email: " + data[i].email + "</h4>");
// 				container.insertAdjacentHTML('beforeend', "<h5> password: " + data[i].password + " </h2>");
// 				numberOfResult++;
// 			}
// 		}
// 	}
// }

// function checkWhich() {
// 	for (var i = 0; i < 6; i++) {
// 		if (document.getElementById(radioList[i]).checked == true) {
// 			return radioList[i];
// 		}
// 	}
// }