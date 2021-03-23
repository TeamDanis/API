# API

<table>
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET /api/login
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>userName
</td>
<td>String
</td>
<td>Nombre de usuario con el que inicia sessión.
</td></tr>
<tr>
<td>userPassword
</td>
<td>String
</td>
<td>Password con la que inicia sessión.
</td></tr></tbody></table>

Aquesta resposta torna les dades en format JSON.

<table class="wikitable">
<tbody><tr>
<th colspan="3">Response&nbsp;: JSON
</th></tr>
<tr>
<th colspan="3">GET /api/login
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>correct
</td>
<td>Boolean
</td>
<td>Confirma si el usuario y contraseña coinciden con la base de datos
</td></tr>
<tr>
<td>token
</td>
<td>Token
</td>
<td>Devuelve un token en el caso de que sea correcto el login
</td></tr></tbody></table>

<<<<<<< HEAD
<hr><hr>
=======
<hr>
>>>>>>> 7fc39c7a68321f0669dc8c041a3931a514f6027a

<table>
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET /api/loginAdmin
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>userName
</td>
<td>String
</td>
<td>Nombre de usuario con el que inicia sessión.
</td></tr>
<tr>
<td>userPassword
</td>
<td>String
</td>
<td>Password con la que inicia sessión.
</td></tr></tbody></table>

Aquesta resposta torna les dades en format JSON.

<table class="wikitable">
<tbody><tr>
<th colspan="3">Response&nbsp;: JSON
</th></tr>
<tr>
<th colspan="3">GET /api/loginAdmin
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>correct
</td>
<td>Boolean
</td>
<td>Confirma si el usuario y contraseña coinciden con la base de datos
</td></tr>
<tr>
<td>token
</td>
<td>Token
</td>
<td>Devuelve un token en el caso de que sea correcto el login
</td></tr></tbody></table>
<<<<<<< HEAD
=======

<hr><hr><hr>


<h1>CRUD</h1>

<table>
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">POST /api/cicle/create
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>cicleData
</td>
<td>JSON String
</td>
<td>Una string con la información del ciclo en formato JSON.
</td>
</tr></tbody></table>

<table class="wikitable">
<tbody><tr>
<th colspan="3">Response
</th></tr>
<tr>
<th colspan="3">POST /api/cicle/create
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>done
</td>
<td>Boolean
</td>
<td>Confirma si se ha realizado correctamente la creación del ciclo.
</td></tr>
<tr>
<td>createInfo
</td>
<td>String
</td>
<td>String con información sobre la creación del ciclo
</td></tr></tbody></table>

<hr>

<table>
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET /api/cicle/read
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>cicleCode
</td>
<td>String
</td>
<td>String del codigo del ciclo
</td>
</tr></tbody></table>

<table class="wikitable">
<tbody><tr>
<th colspan="3">Response
</th></tr>
<tr>
<th colspan="3">GET /api/cicle/read
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>done
</td>
<td>Boolean
</td>
<td>Confirma si se ha realizado correctamente la creación del ciclo.
</td></tr>
<tr>
<td>readInfo
</td>
<td>JSON String
</td>
<td>String en formato JSON con la información del ciclo que se buscaba.
</td></tr></tbody></table>

<hr>

<table>
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET /api/cicle/update
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>cicleCode
</td>
<td>String
</td>
<td>String del codigo del ciclo
</td>
</tr>
<tr>
<td>cicleNewData
</td>
<td>JSON String
</td>
<td>String en formato JSON con la nueva información del ciclo
</td>
</tr></tbody></table>

<table class="wikitable">
<tbody><tr>
<th colspan="3">Response
</th></tr>
<tr>
<th colspan="3">GET /api/cicle/update
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>done
</td>
<td>Boolean
</td>
<td>Confirma si se ha realizado correctamente la actualización de la información del ciclo.
</td></tr>
<tr>
<td>updateInfo
</td>
<td>JSON String
</td>
<td>String en formato JSON con la información del ciclo actualizado.
</td></tr></tbody></table>

<hr>

<table>
<tbody><tr>
<th colspan="3">Request
</th></tr>
<tr>
<th colspan="3">GET /api/cicle/delete
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>cicleCode
</td>
<td>String
</td>
<td>String del codigo del ciclo
</td>
</tr></tbody></table>

<table class="wikitable">
<tbody><tr>
<th colspan="3">Response
</th></tr>
<tr>
<th colspan="3">GET /api/cicle/delete
</th></tr>
<tr>
<th>Param
</th>
<th>Values
</th>
<th>Description
</th></tr>
<tr>
<td>done
</td>
<td>Boolean
</td>
<td>Confirma si se ha realizado correctamente la actualización de la información del ciclo.
</td></tr></tbody></table>
>>>>>>> 7fc39c7a68321f0669dc8c041a3931a514f6027a
