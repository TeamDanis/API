$('#loginButton').click( APICall );
  

function APICall(){

	var userName = $('#userName').val();
    var userPassword = $('#userPassword').val();

    var x;

	//https://team-danis-api.herokuapp.com
	//http://localhost:3000

	$.ajax({
	  method: "GET",
<<<<<<< HEAD
	  url: "http://localhost:3000/api/login?userName="+userName+"&userPassword="+userPassword,
=======
	  url: "https://team-danis-api.herokuapp.com/api/login?userName="+userName+"&userPassword="+userPassword,
>>>>>>> 7fc39c7a68321f0669dc8c041a3931a514f6027a
	  dataType: "json",
	}).done(function (msg) {
        
		var json = msg;

		if (json.correct == true){
			console.log(json);
			alert("logeado correctamente!");
		} else {
			console.log(json);
			alert("login incorrecto!")
		}

	}).fail(function () {
        console.log("logeado incorrectamente");
	});

}