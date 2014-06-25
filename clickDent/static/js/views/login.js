clickDent.Views.RegistarUsuario = Backbone.View.extend({
	el: $('#form-registro'),

	events: {
		'click #registrarse' : 'validaRegistrarse',
		'change #loginUsuario input' : 'limpiarError',
	},

	initialize: function() {
		console.log('Inicializando vista');
	},

	render: function() {

	},

	validaCampo: function(exitoso, error){
		$('#Err' + this.model.get('val')).remove();

		if(!exitoso){
			$('#error').html($('#error').html() + '<li id=Err' + this.model.get('val') + '> ' + error + '</li>');
		}

		if ($('#error li').length > 0){
			$('div.error').show();
		}else{
			$('div.error').hide();
		}
	},

	validaRegistrarse: function(ev){
		var self = this;
		var m = self.model;
		m.set({
			val : 'login',
			username : $('#usuario').val(),
			password : $('#password').val(),
		});

		if (m.isValid()){

			$.get( "/validaLogin/", { usuario : m.get('username') , password : m.get('password') } , function( data ) {
				if(data.validacion == 0)
					self.validaCampo(false, 'Usuario/Correo o password incorrecto');
				else if(data.validacion == 1)
					$('#loginUsuario').submit();

  			});
				
		}else
			this.validaCampo(this.model.isValid(), m.validationError);

		return false; 
	},

	limpiarError: function(ev){
		$('#Errlogin').remove();
	}
});