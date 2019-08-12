(() => {
    if(sessionStorage.getItem('token') != null){
        window.location.href = 'index.html';
    }
})()

var login = function(){
    event.preventDefault();

    var nome = document.querySelector('#username');
    var senha = document.querySelector('#password');

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:60806/token', true);

    xhr.onload = function(){
        var resultado = JSON.parse(this.responseText);
        console.log(resultado);
        if(resultado.error != 'invalid_grant'){
            sessionStorage.setItem('token',`${resultado.token_type} ${resultado.access_token}`)
            sessionStorage.setItem('username',`${resultado.username}`)
            verifica();
        } else {
            console.log(resultado.error_description);
            document.getElementById('modal-tipo-erro').innerHTML += resultado.error_description;
            $('#modal-erro').modal('show');
        }
        
    }

    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send(`grant_type=password&username=${nome.value}&password=${senha.value}`)
}

var verifica= function(){
    var xhr = new XMLHttpRequest();
    xhr.open(`GET`,`http://localhost:60806/api/Usuario/ListarUsuarios`, true);
    xhr.setRequestHeader('Authorization', sessionStorage.getItem('token'));

    xhr.onerror = function(){
        console.error('Erro', xhr.readyState);
    }

    xhr.onreadystatechange = function(){
        var result = this.responseText;
        console.log(result);
        window.location.href = 'index.html';
    }

    xhr.send();
}