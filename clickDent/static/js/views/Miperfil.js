clickDent.Views.Miperfil = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click .perfil #guardar' : "guardar",
		'blur .validaCampoPass' : "validaCampoPass",
		'blur .validaCampoConfirm' : 'validaCampoConfirm',
		'submit #formulario' : 'submit'
	},

	initialize: function() {
		console.log("Inicializando Miperfil View");	

		 options = { 
	        beforeSubmit:   function(formData, jqForm) {
							        console.log(JSON.stringify(formData));
							        return true;
							    } , 
	        success:       function(responseText, statusText)  {
							       console.log(responseText);
							    } , 
	        url:       "/actualizarPerfil/"        
	    }; 
	},

	submit :  function() {
	  $('#formulario').ajaxSubmit(options); 
        return false; 
	},

	render: function() {

	},

	guardar :function() {
		self = this;
		if(!this.validaDatos()){
			return false;
			console.log("Datos Invalidos");
		}

		//Actualizar contraseña
		var contrasenaActual = $('#actual').val(); 
		var contrasenaNueva = $('#nueva').val();
		if(contrasenaActual && contrasenaNueva)
			$.ajax({
			  type: "POST",
			  url: "/cambiarContrasena/",
			  data: { actual : contrasenaActual, nueva : contrasenaNueva },
			  beforeSend: sendAuthentication,
			  success : function(data) {
			  	console.log(data);
			  	if(data.validacion == 'error'){
				  	var actual = self.$el.find('input[name=actual]');
				  	actual.removeClass('valido');
					actual.addClass('invalido');
					campo.parent().find('.error').show();
				}else{
					//Envier formulario
					$('#formulario').submit();
				}
			  }
			});
		else{
			$('#formulario').submit();
		}

		//Actualizar Plan	
		/*var idPlan = $('input[name=plan]:checked').val(); 
		$.ajax({
		  type: "POST",
		  url: "/actualizarPlan/",
		  data: { plan : idPlan },
		  beforeSend: sendAuthentication,
		  success : function(data) {
		  	console.log(data);
		  }
		});
		*/

	},

	validaCampoPass : function(ev) {
		var campo = $(ev.target);
		var valor = campo.val();
		valor = $.trim(valor);

		if(valor){
			if(validaRequerido(valor,5)){
				campo.removeClass('invalido');
				campo.addClass('valido');
				campo.parent().find('.error').hide();
			}else{
				campo.removeClass('valido');
				campo.addClass('invalido');
				campo.parent().find('.error').show();
			}

			campo.val(valor);
		}else{
			campo.removeClass('valido');
			campo.removeClass('invalido');
			campo.parent().find('.error').hide();
		}
		
	},

	validaCampoConfirm : function(ev) {
		var campo = $(ev.target);
		var valor = campo.val();
		valor = $.trim(valor);
		var nueva = this.$el.find('input[name=nueva]');

		if(valor == nueva.val()){
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
		}

		campo.val(valor);
	},

	validaDatos : function(){
		var campo = this.$el.find('input[name=usuario]');
		var resultado = true;
		if(validaRequerido(campo.val(), 2))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('input[name=correo]');
		if(validaCorreo(campo.val()) && validaRequerido(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		var actual = this.$el.find('input[name=actual]');
		var nueva = this.$el.find('input[name=nueva]');
		var confirm = this.$el.find('input[name=confirmacion]');

		if(actual.val() || nueva.val() || confirm.val()){

			if(validaRequerido(actual.val(),5))
			{
				actual.removeClass('invalido');
				actual.addClass('valido');
				actual.parent().find('.error').hide();
			}else{
				actual.removeClass('valido');
				actual.addClass('invalido');
				actual.parent().find('.error').show();
				resultado = false;
			}

			if(validaRequerido(nueva.val(),5))
			{
				nueva.removeClass('invalido');
				nueva.addClass('valido');
				nueva.parent().find('.error').hide();
			}else{
				nueva.removeClass('valido');
				nueva.addClass('invalido');
				nueva.parent().find('.error').show();
				resultado = false;
			}

			if(validaRequerido(confirm.val(),5))
			{
				confirm.removeClass('invalido');
				confirm.addClass('valido');
				confirm.parent().find('.error').hide();
			}else{
				confirm.removeClass('valido');
				confirm.addClass('invalido');
				confirm.parent().find('.error').show();
				resultado = false;
			}

			if(confirm.val() && (nueva.val() == confirm.val())){
				confirm.removeClass('invalido');
				confirm.addClass('valido');
				confirm.parent().find('.error').hide();
			}else{
				confirm.removeClass('valido');
				confirm.addClass('invalido');
				confirm.parent().find('.error').show();
				resultado = false;
			}

		}


		return resultado;

	},

});