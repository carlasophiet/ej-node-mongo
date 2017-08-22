var errores= [];



$(document).ready(function(){
	errores=[];
	$('#tabla').hide();
	$('#div-respuesta').hide();
	$('#gracias').hide();
	$('#ingresar').on('click', function(){
		errores=[];
		console.log('funcionó!');

		validarEmail($('#email').val());
		validarNombre($('#name').val());
		validarApellido($('#lastname').val());
		validarEdad($('#age').val());
		validarSelect($('#sex').val());
		console.log(errores);
		if (errores.length == 0){ //si el array de los errores es igual a cero, SUBMIT
			var nuevoUsuario={
			'name': $('#ingresar fieldset input#name').val(),
			'lastname': $('#ingresar fieldset input#lastname').val(),
            'email': $('#ingresar fieldset input#email').val(),
            'age': $('#ingresar fieldset input#age').val(),
            'sex': $('#ingresar fieldset input#sex').val()}
          	$.ajax({
	            type: 'INSERT',
	            data: nuevoUsuario,
	            url: '/',
	            dataType: 'JSON'
        		}).done(function( response ) {
           			 if (response.msg === '') {
           			 	$('#formulario')[0].reset();
						$('#gracias').html('');
						$('#gracias').append('<strong>¡Gracias!</strong>');
            }
        });
    }
    else {
        // If errorCount is more than 0, error out
       $('#gracias').show(); //sino, recorrer array: en el div con ID error pusheo los errores nombrados en las funciones
			for (i=0;i<errores.length;i++){ 
				$('#gracias').append(errores[i]);
		   }
        return false;
    }
});// TERMINA INGRESAR ON CLICK

	$('#buscar').on('click',function(){
		errores=[];
		console.log($('#buscador').val());
		validarSelectBuscador($('#buscador').val());
		if (errores.length==0){
			var datos=$('#buscador').val();
			console.log(datos);
			$.ajax({
	            type: 'GET',
	            data: datos,
	            url:'api/users/'
        		}).done(function(laRespuesta) {
        			console.log(laRespuesta);
        			$('#respuesta-div').hide();
           			$('#tabla').show();
           			for(i=0;i<laRespuesta.length;i++){
           			$("cuerpo-tabla").append("<tr><td>" + laRespuesta[i].name + "<td>" + laRespuesta[i].lastname + "</td></tr>");
      				};
            });
        }
		else{
			console.log('todo mal!');
			$('#respuesta-div').show();
			$('#respuesta-div').css('background-color','red');
			for (i=0;i<errores.length;i++){ 
				$('#respuesta').append(errores[i]);
		   }
		}//temina else

	});//TERMINA BUSCAR ON CLICK






});//termina doc ready

	/*function successAjax(data){
		$('#respuesta-div').hide();
        $('#tabla').show();
        for (i=0; i < data.length ;i++)
        $("cuerpo-tabla").append("<tr><td" + data[i].name + "><td" + data[i].lastname + "></td></tr>");
	}*/




		function validarSelectBuscador(opcion){
		if (opcion == 0){
			console.log('no busca');
			errores.push("<p>Elija una opción para filtrar los usuarios.</p>");
		}else{
			console.log('BUSCA!');
			return true;
		}return false;

	}

	function validarSelect(opcion){
		if (opcion == 0){
			console.log('sexo vacio');
			errores.push("<li>Elija un sexo</li>");
		}else{
			console.log('sexo');
			return true;
		}return false;

	}
		function validarEmail(email) { //Funcion para validar formato de mail//
		var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; //Expresion regular para chequear formato mail//
		if (email == '' || email == null) {
			console.log('mail vacio');
			errores.push("<li>Por favor completa tu e-mail</li>");
		}else{
			if (!expr.test(email)) {
				console.log('mail invalido');
				errores.push("<li>Por favor ingresá un email válido</li>");
			}else{
				console.log('mail valido');
				return true;
			}
		}return false;
	} //Fin validarEmail//
		function validarNombre(nombre){ //Funcion para validar el nombre//
		if(nombre == '' || nombre == null){
			console.log('nombre vacio');
			//error.style.display = 'block'; //.style > es para cambiar el css
			//error.innerHTML += '<li>Por favor completa el nombre</li>';
			errores.push("<li>Por favor completa tu nombre</li>");
		} 
		else {
			if (!soloLetras(nombre)) {
				console.log('Nombre invalido');
				//error.style.display = 'block';
				//error.innerHTML += '<li>Por favor ingresá un nombre valido</li>';//.innerHTML para poner algo dentro de html
				errores.push("<li>Por favor ingresa tu nombre valido</li>");
			} else {
			console.log('nombre valido');
			return true;
			}
		}return false;
	} //Fin validarNombre//
		function validarApellido(nombre){ //Funcion para validar el nombre//
		if(nombre == '' || nombre == null){
			console.log('apellido vacio');
			//error.style.display = 'block'; //.style > es para cambiar el css
			//error.innerHTML += '<li>Por favor completa el nombre</li>';
			errores.push("<li>Por favor completa tu apellido</li>");
		} 
		else {
			if (!soloLetras(nombre)) {
				console.log('apellido invalido');
				//error.style.display = 'block';
				//error.innerHTML += '<li>Por favor ingresá un nombre valido</li>';//.innerHTML para poner algo dentro de html
				errores.push("<li>Por favor ingresa un apellido valido</li>");
			} else {
			console.log('apellido valido');
			return true;
			}
		}return false;
	} //Fin validarNombre//
		function validarEdad(edad) { //Funcion para validar edad//
		if (edad == '' || edad == null) {
			console.log('Edad vacia');
			errores.push("<li>Por favor completa tu edad</li>");
		}else{
			if(isNaN(parseInt(edad))) {
				console.log('Edad invalida');
				errores.push("<li>Por favor ingresa una edad valida</li>");
			} else {
				if (parseInt(edad) > 120 || parseInt(edad) < 0) {
					console.log('Edad invalida');
					errores.push("<li>Por favor ingresa una edad valida</li>");
				}else{
					console.log('Edad valida');
					return true;
				}
			}return false;
		}//validar edad
}
function soloLetras(x) { //Valido apellido y nombre con expresion regular//

	expr = /^([a-zA-Z\s]{1,50})*$/ ; //expresion regular de intervalos de letras min 3 caracteres max 50//
	if(expr.test(x)) {//test > para matchear var y expresión regular. expresionregular.test(variable).
		return true;
	}
	return false;
	}