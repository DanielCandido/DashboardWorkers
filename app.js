var tbody = document.querySelector('table tbody');

function Cadastrar(){
	var _nome = document.getElementById('nome').value;
	var _sobrenome = document.getElementById('sobrenome').value;
	var _rg = document.getElementById('rg').value;
	var _cpf = document.getElementById('cpf').value;
	var _email = document.getElementById('email').value;
	var _telefone = document.getElementById('telefone').value;
	var _celular = document.getElementById('celular').value;
	var _endereco = document.getElementById('endereco').value;
	var _numerocasa = document.getElementById('numerocasa').value;
	var _complemento = document.getElementById('complemento').value;
	var _senha = document.getElementById('senha').value;	
	var _confirme = document.getElementById('senha').value;

	var usuario = {
		nome: _nome,
		sobrenome: _sobrenome,
		rg: _rg,
		cpf: _cpf,
		email: _email,
		telefone: _telefone,
		celular: _celular,
		endereco: _endereco,
		numerocasa: _numerocasa,
		complemento: _complemento,
		senha: _senha
	}

	console.log(usuario);

	ListarUsuarios('POST',0, usuario);

}

function VerificaSenha(){

	var _senha = document.getElementById('senha').value;	
	var _confirme = document.getElementById('confirme').value;

		if (_senha === _confirme) {
			alert('ok');
		}
		else{
			alert('Nao ok');
		}
}	

function ListarUsuarios(metodo, id, usuario){
	tbody.innerHTML = '';

	var xhr = new XMLHttpRequest();

	if (id === undefined || id === 0)
		id = "";

	xhr.open(metodo,`http:localhost:52682/api/Usuario/${id}`, true);


	xhr.onload = function (){
		var usuarios = JSON.parse(this.responseText);
		for(var i in usuarios){
			MontaTabela(usuarios[i]);
		}

		var total = usuarios.length;
		console.log(total);
		var info = document.querySelector('.card-user p');	
		info.innerHTML += total;
	}

	if(usuario !== undefined){
		xhr.setRequestHeader('content-type','application/json');
		xhr.send(JSON.stringify(usuario));
	}
	else{
		xhr.send();
	}

	
}

ListarUsuarios('GET');

function MontaTabela(usuarios){

	var trow = `<tr>
					<td>${usuarios.Id}</td>
					<td>${usuarios.Nome}</td>
					<td>${usuarios.Sobrenome}</td>
					<td>${usuarios.Cpf}</td>
					<td>${usuarios.Email}</td>
					<td>${usuarios.Celular}</td>
					<td><button class="btn btn-primary" >Ver Detalhes!</button></td>
				</tr>`
	tbody.innerHTML += trow;			
}

function MostrarTabela(){
	$('.table-user').show();
	$('.fechar-tabela').show();
}

function FechaTabela(){
	$('table').hide();
	$('.fechar-tabela').hide();
}
