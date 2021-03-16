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

<hr><hr>

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
