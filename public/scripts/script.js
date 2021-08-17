//Calls the backend to log the user in
function login(event){
    event.preventDefault();

    var email = document.getElementById("email").value.toLowerCase();
    var password = document.getElementById("password").value;

    if (email != "" && password !="") {
        var loginData = {
            email: email,
            password: password
        }
        
        var http = new XMLHttpRequest();
    
        //specify verb and url
        http.open('POST', '/api/users/login/', true);
    
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
    
        //send request
        http.send(JSON.stringify(loginData));
    
        //response
        http.onload = function() {
            var response = JSON.parse(http.response);
            if ("Logged in!" == response){
                window.location.replace("/protected");
            }
            alert(response);
        };
    }
    else {
        alert("Please complete all fields before attempting to log in.");
    }
    
}

//Calls the backend to register the user for the site
function register(event) {

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var email = document.getElementById("email").value.toLowerCase();
    var phone = document.getElementById("phone").value;
    

    //Reformats the phone number
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          return match[1] + '-' + match[2] + '-' + match[3]
        }
        return null
    }

    //Makes sure all fields are filled in
    if (firstName != "" && lastName != "" && email != "" && phone != "") {
        //Validates the phone number
        if (/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone)){
            var userData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: formatPhoneNumber(phone)
            }
            
            var http = new XMLHttpRequest();
        
            //specify verb and url
            http.open('POST', '/api/users/register/', true);
        
            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/json');
        
            //send request
            http.send(JSON.stringify(userData));
            //response
            console.log(userData)
            http.onload = function() {
                var response = JSON.parse(http.response);
                alert(response); 
                if (response.includes("pin")){
                    window.location.replace("/login");
                }
            };
        }
        else {
            alert("Please enter a valid phone number. Ex 860-123-4567");
        }
    }
    else {
        event.preventDefault();
        alert("Please complete all fields before submitting.");
    }
}

//Loads the forgot password page by changing display styles
function loadForgotPassword() {
    var login = document.getElementById("loginForm");
    login.style.display = "none";
    
    var forgot = document.getElementById("forgotPasswordForm");
    forgot.style.display = "block";
}

//Calls the backend to send a user an email with their password
function forgotPassword(event) {
    event.preventDefault();
    var email = document.getElementById("emailForgot").value.toLowerCase();

    if (email != ""){
        userData = {email:email};

        var http = new XMLHttpRequest();
    
        //specify verb and url
        http.open('POST', '/api/users/forgotpassword/', true);
    
        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
    
        //send request
        http.send(JSON.stringify(userData));
    
        //response
        http.onload = function() {
            var response = JSON.parse(http.response);
            alert(response); 
            if (response == "An email has been sent to you with your pin.") {
                window.location.reload();   
            }
        };
    }
    else {
        event.preventDefault();
        alert("Please input your email before submitting.");
    }
}