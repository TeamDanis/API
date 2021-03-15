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
        console.log("logeado correctamente");
        x = msg;
        console.log(x);

	}).fail(function () {
        console.log("logeado incorrectamente");
	});

}