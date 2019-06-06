var tbody;
var usuario = {};

function cadastrarUsuario() {
    console.log(usuario);
    usuario.Nome = document.getElementById('nome').value;
    usuario.Sobrenome = document.getElementById('sobrenome').value;
    usuario.Rg = document.getElementById('rg').value;
    usuario.Cpf = document.getElementById('cpf').value;
    usuario.Email = document.getElementById('email').value;
    usuario.Telefone = document.getElementById('telefone').value;
    usuario.Celular = document.getElementById('celular').value;
    usuario.Endereco = document.getElementById('endereco').value;
    usuario.Numerocasa = document.getElementById('numerocasa').value;
    usuario.Complemento = document.getElementById('complemento').value;
    usuario.Senha = document.getElementById('senha').value;

	console.log(usuario);
    
    if (usuario.id === undefined || usuario.id === 0){
        listarUsuarios('POST',0, usuario);
    } else {
        listarUsuarios('PUT',usuario.id, usuario);
    }
}   

function editarUsuario(_usuario){
    document.getElementById('nome').value= _usuario.Nome;
    document.getElementById('sobrenome').value= _usuario.Sobrenome;
    document.getElementById('rg').value= _usuario.Rg;
    document.getElementById('cpf').value= _usuario.Cpf;
    document.getElementById('email').value= _usuario.Email;
    document.getElementById('telefone').value= _usuario.Telefone;
    document.getElementById('celular').value= _usuario.Celular;
    document.getElementById('endereco').value= _usuario.Endereco;
    document.getElementById('numerocasa').value= _usuario.NumeroCasa;
    document.getElementById('complemento').value= _usuario.Complemento;
    document.getElementById('senha').value= _usuario.Senha;
    document.getElementById('confirme').value= _usuario.Confirme;
    usuario = _usuario;
    console.log(usuario);
}

function verificaSenha(){

	var _senha = document.getElementById('senha').value;	
	var _confirme = document.getElementById('confirme').value;

		if (_senha === _confirme) {
			alert('ok');
		}
		else{
			alert('Nao ok');
		}
}	

function listarUsuarios(metodo, id, usuario){
	var xhr = new XMLHttpRequest();

	if (id === undefined || id === 0)
		id = "";

	xhr.open(metodo, `http://localhost:55871/api/Usuario/${id}`, true);


	xhr.onload = function (){
		var usuarios = JSON.parse(this.responseText);
		for(var i in usuarios){
			montaTabela(usuarios[i]);
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

listarUsuarios('GET');

function montaTabela(usuarios){
    
    tbody = document.querySelector('table tbody');

	var trow = `<tr>
					<td>${usuarios.Id}</td>
					<td>${usuarios.Nome}</td>
					<td>${usuarios.Sobrenome}</td>
					<td>${usuarios.Cpf}</td>
					<td>${usuarios.Email}</td>
					<td>${usuarios.Celular}</td>
					<td><button class="btn btn-primary" data-toggle="modal" data-target="#modal-usuario" onclick ='editarUsuario(${JSON.stringify(usuarios)})'>Visualizar</button></td>
				</tr>`
	tbody.innerHTML += trow;			
}

function mostrarTabela(tipoTabela){
    
    if(tipoTabela === '.table-user'){
	   $(tipoTabela).show();
        $('.fechar-usuarios').show();
        $('#cadastrar-usuario').show();
        $('#cadastrar-prestador').hide();
        $('.table-worker').hide();
        $('.fechar-prestadores').hide();
    }
    
    if(tipoTabela === '.table-worker'){
        $(tipoTabela).show();
        $('.fechar-prestadores').show();
        $('#cadastrar-prestador').show();
        $('#cadastrar-usuario').hide();
        $('.table-user').hide();
        $('.fechar-usuarios').hide();
    }
}

function fechaTabela(){
	$('table').hide();
	$('.fechar-usuarios').hide();
    $('.fechar-prestadores').hide();
    $('#cadastrar-usuario').hide();
}
