//Logs the user out
function logout() {
    var http = new XMLHttpRequest();
    
    //specify verb and url
    http.open('GET', '/logout');
    
        
    //send request
    http.send();
    
    //response
    http.onload = function() {
    var response = JSON.parse(http.response);
        window.location.replace("/protected");
    };
}

//Loads the sheet for a given date and shift
function getSheetInfo(date, shift){

    document.getElementById("dateHead").innerText = document.getElementById(date).innerText;
    document.getElementById("timeHead").innerText = document.getElementById(shift).innerText;

    //A helper function for getting the current user
    function currentUser(list){
        var http = new XMLHttpRequest();
    
        //specify verb and url
        http.open('GET', '/api/users/getinfo/');
        
        //send request
        http.send();

        //response
        http.onload = function() {
            var response = JSON.parse(http.response);
            setPage(list, response.name);
        };
    }

    //A helper function for loading the page
    function setPage(list, subName){
        
        //Places a signup button in each row
        docList = document.getElementsByClassName("inputField");
        for (let i = 0; i < docList.length; i++) {
            var id = docList[i].attributes.id.value;

            //Clears out the row
            document.getElementById(id+"Num").innerText = "";
            document.getElementById(id+"Sub").innerText = "";
            docList[i].innerHTML = "";

            var btn1 = document.createElement("button");
            btn1.setAttribute("onclick", "loadSignup('"+id+"')");
            btn1.setAttribute("class", "btn-lg btn-dark");
            btn1.innerText="SIGN UP";
                
            docList[i].appendChild(btn1);
        }

        //Fills each row for which a user has volunteered
        list.forEach(element => {
            var job = element.job;
            var phone = element.phone;
            var name = element.name;
            var sub = element.sub;

            document.getElementById(job).innerText = name;
            document.getElementById(job+"Num").innerText = phone;
            document.getElementById(job+"Sub").innerText = sub;

            //If the current user submitted it, allows the current user to delete it
            if (subName == sub) {
                var btn = document.createElement("button");
                btn.setAttribute("onclick", "deleteJob('" + job + "')");
                btn.setAttribute("class", "btn-lg btn-dark float-right");
                btn.innerText="DELETE";
                document.getElementById(job).appendChild(btn);
            }
            
        });
        
    }

    var info = {
        date: date,
        shift: shift
    }

    var http = new XMLHttpRequest();
    
    //specify verb and url
    http.open('POST', '/api/scheduling/get/', true);

    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');
    
    //send request
    http.send(JSON.stringify(info));

    //response
    http.onload = function() {
        var response = JSON.parse(http.response);
        currentUser(response);
    };
}

//Loads the signup form
function loadSignup(job) {

    function getUserInfo(){
        var http = new XMLHttpRequest();
    
        //specify verb and url
        http.open('GET', '/api/users/getinfo/', true);
        
        //send request
        http.send();

        //response
        http.onload = function() {
            var response = JSON.parse(http.response);
            document.getElementById("name").value = response.name;
            document.getElementById("phone").value= response.phone;
            document.getElementById("sub").value= response.name;
        };
    }
    
    getUserInfo();

    //Hides the table
    document.getElementById("signupSheet").setAttribute("style", "display:none");

    //Shows the signup form position: fixed; z-index: 10;
    document.getElementById("signupForm").setAttribute("style", "display:none");
    document.getElementById("signupForm").setAttribute("style", "display:inline-block; ");

    document.getElementById("job").value = job
}

//Closes the signup form
function closeSignup() {
    //Shows the table
    document.getElementById("signupSheet").setAttribute("style", "display:inline-block");

    //Hides the signup form
    document.getElementById("signupForm").setAttribute("style", "display:none");
}

//A function that returns the current selected shift on the navbar
function getDate() {
    dateList = document.getElementsByClassName("date");
    for (let i = 0; i < dateList.length; i++) {
        if(dateList[i].attributes.class.value == "nav-item date active") {
            return dateList[i].attributes.id.value
        }
    }
}

//Reloads the page when a date is navigated to
function loadDate(date) {
    //A function that deactivates all dates on the navbar
    function deDate() {
        var dateList = document.getElementsByClassName("date");
        for (let i = 0; i < dateList.length; i++) {
            dateList[i].classList.remove("active");
        }
    }

    //A helper function that loads the shift times on the navbar
    function loadShiftText() {

        //A helper function that hides all the shift times
        function hideShifts() {
            var shifts = document.getElementsByClassName("shift");
            
            for (let i = 0; i < shifts.length; i++) {
                shifts[i].style.display = "none";
            }
        }

        hideShifts();

        switch(date) {
            case 'October1':
                document.getElementById('1').style.display = "inline";
                document.getElementById('1').firstElementChild.innerText = "4:30pm-9:45pm";
                break

            case 'October2':
            case 'October3':
                document.getElementById('1').style.display = "inline";
                document.getElementById('1').firstElementChild.innerText = "8:30am-11:45pm";

                document.getElementById('2').style.display = "inline";
                document.getElementById('2').firstElementChild.innerText = "11:30am-3:15pm";

                document.getElementById('3').style.display = "inline";
                document.getElementById('3').firstElementChild.innerText = "3:00pm-6:30pm";

                document.getElementById('4').style.display = "inline";
                document.getElementById('4').firstElementChild.innerText = "6:15pm-9:45pm";
                break

            case 'October4':
            case 'October5':
            case 'October6':
            case 'October7':
                document.getElementById('1').style.display = "inline";
                document.getElementById('1').firstElementChild.innerText = "5:30am-8:45am";

                document.getElementById('2').style.display = "inline";
                document.getElementById('2').firstElementChild.innerText = "8:30am-12:15pm";

                document.getElementById('3').style.display = "inline";
                document.getElementById('3').firstElementChild.innerText = "12:00pm-4:15pm";

                document.getElementById('4').style.display = "inline";
                document.getElementById('4').firstElementChild.innerText = "4:00pm-7:00pm";
                break

            case 'October8':
                document.getElementById('1').style.display = "inline";
                document.getElementById('1').firstElementChild.innerText = "5:30am-9:00am";

                document.getElementById('2').style.display = "inline";
                document.getElementById('2').firstElementChild.innerText = "8:45am-12:30pm";

                document.getElementById('3').style.display = "inline";
                document.getElementById('3').firstElementChild.innerText = "12:15pm-5:00pm";

                document.getElementById('4').style.display = "inline";
                document.getElementById('4').firstElementChild.innerText = "4:45pm-9:45pm";
                break

            case 'October9':
                document.getElementById('1').style.display = "inline";
                document.getElementById('1').firstElementChild.innerText = "8:30am-11:45am";

                document.getElementById('2').style.display = "inline";
                document.getElementById('2').firstElementChild.innerText = "11:30am-3:15pm";

                document.getElementById('3').style.display = "inline";
                document.getElementById('3').firstElementChild.innerText = "3:00pm-6:30pm";

                document.getElementById('4').style.display = "inline";
                document.getElementById('4').firstElementChild.innerText = "6:15pm-9:45pm";
                break

            case 'October10':
                document.getElementById('1').style.display = "inline";
                document.getElementById('1').firstElementChild.innerText = "8:30am-11:45am";
    
                document.getElementById('2').style.display = "inline";
                document.getElementById('2').firstElementChild.innerText = "11:30am-3:15pm";
    
                document.getElementById('3').style.display = "inline";
                document.getElementById('3').firstElementChild.innerText = "3:00pm-5:45pm";
                break
        }
    }

    deDate();
    document.getElementById(date).classList.add("active");
    
    loadShiftText();
    loadShift('1');

    getSheetInfo(date, getShift());
}

//A function that returns the current selected date on the navbar
function getShift() {
    shiftList = document.getElementsByClassName("shift");
    for (let i = 0; i < shiftList.length; i++) {
        if(shiftList[i].attributes.class.value == "nav-item shift active") {
            return shiftList[i].attributes.id.value
        }
    }
}

//Reloads the page when a shift is navigated to
function loadShift(shift) {
    //A function that deactivates all shifts on the navbar
    function deShift() {
        var shiftList = document.getElementsByClassName("shift");
        for (let i = 0; i < shiftList.length; i++) {
            shiftList[i].classList.remove("active");
        }
    }

    deShift();
    document.getElementById(shift).classList.add("active");

    getSheetInfo(getDate(), shift);
}

//Signs the user up
function signup() {
    var name = document.getElementById("name").value;
    var phone = document.getElementById("phone").value;
    var job = document.getElementById("job").value;
    var shift = getShift();
    var date = getDate();
    var sub = document.getElementById("sub").value;

    //Reformats the phone number
    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
        if (match) {
          return match[1] + '-' + match[2] + '-' + match[3]
        }
        return null
    }

    //Makes sure the fields are filled in
    if (name != "" && phone != ""){
        //Validates phone number format
        if(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phone)){
            subData = {
                name: name,
                phone: formatPhoneNumber(phone),
                job: job,
                shift: shift,
                date: date,
                sub: sub
            };
            
            var http = new XMLHttpRequest();
        
            //specify verb and url
            http.open('POST', '/api/scheduling/add', true);
        
            //Send the proper header information along with the request
            http.setRequestHeader('Content-type', 'application/json');
        
            //send request
            http.send(JSON.stringify(subData));
        
            //response
            http.onload = function() {
                var response = JSON.parse(http.response);
                alert(response); 
                if (response == "You have successfully signed up.") {
                    closeSignup();
                    getSheetInfo(date,shift);
                }
            };
    
        }
        else {
            alert("Please enter a valid phone number. Ex 860-123-4567");
        }
    }
    else {
        alert("Please fill in all fields");
    }

}

//Deletes a user from being signed up for a job
function deleteJob(job) {
    var date = getDate();
    var shift = getShift();

    var subData = {
        date: date,
        shift: shift,
        job: job
    };

    var http = new XMLHttpRequest();
        
    //specify verb and url
    http.open('POST', '/api/scheduling/delete', true);
        
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/json');
        
    //send request
    http.send(JSON.stringify(subData));
        
    //response
    http.onload = function() {
        var response = JSON.parse(http.response);
        alert(response); 
        getSheetInfo(date,shift);
    };
}