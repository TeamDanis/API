$('#loginButton').click( APICall );
  

function APICall(){

	var userName = $('#userName').val();
    var userPassword = $('#userPassword').val();

    var x;

	//https://team-danis-api.herokuapp.com
	//http://localhost:3000

	$.ajax({
	  method: "GET",
	  url: "https://team-danis-api.herokuapp.com/api/login?userEmail="+userName+"&userPassword="+userPassword,
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
