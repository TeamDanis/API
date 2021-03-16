$('#loginButton').click( APICall );
  

function APICall(){

	var userName = $('#userName').val();
    var userPassword = $('#userPassword').val();

    var x;

	$.ajax({
	  method: "GET",
	  url: "http://localhost:3000/api/login?userName="+userName+"&userPassword="+userPassword,
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