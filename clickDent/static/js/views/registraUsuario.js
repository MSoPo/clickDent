clickDent.Views.RegistarUsuario = Backbone.View.extend({
	el: $('#form-registro'),

	events: {
		'change #usuario' : 'cambioUsuario',
		'change #correo' : 'cambiaCorreo',
		'change #password' : 'cambioPassword',
		'change #confirma' : 'cambioConfirma',
		'click #registrarse' : 'validaRegistrarse',
	},

	initialize: function() {
		console.log('Inicializando vista');
	},

	render: function() {

	},

	cambioUsuario: function() {
		var self = this;
		var m = self.model;
		m.set({
			username : $('#usuario').val(),
			val : 1,
		});

		if (m.isValid())

			$.get( "/validaUsuario/", { usuario : m.get('username') } , function( data ) {

				self.validaCampo(!data.validacion, $('#form-usuario').find('.linea-final'), data.validacion ? 'Este usuario no esta disponible' : '');
  			});

		else
			self.validaCampo(false, $('#form-usuario').find('.linea-final'), m.validationError);
	},

	cambiaCorreo: function() {
		var self = this;
		var m = self.model;
		m.set({
			email : $('#correo').val(),
			val : 2,
		});

		if (m.isValid())

			$.get( "/validaCorreo/", { correo : m.get('email') } , function( data ) {
  						self.validaCampo(!data.validacion, $('#form-correo').find('.linea-final'), data.validacion ? 'Este correo ya fue usado' : '');
  			});

		else
			self.validaCampo(m.isValid(), $('#form-correo').find('.linea-final'), m.validationError);
	},

	cambioPassword: function() {
		var m = this.model;
		m.set({
			password : $('#password').val(),
			val : 3,
		});

		this.validaCampo(this.model.isValid(), $('#form-password').find('.linea-final'), m.validationError);

		if ($('#confirma').val()){
			$('#confirma').val('');
			this.cambioConfirma();
		}
		
	},

	cambioConfirma: function(ev) {
		var m = this.model;
		m.set({
			password2 : $('#confirma').val(),
			val : 4,
		});

		this.validaCampo(this.model.isValid(), $('#form-confirma').find('.linea-final'), m.validationError);
	},

	validaCampo: function(exitoso, campo, error){
		$('#Err' + this.model.get('val')).remove();
		$('#Err0').remove();

		if(exitoso){
			if(campo){
				campo.removeClass('incorrecto icon-cancel-circle');
				campo.addClass('correcto icon-checkmark-circle');
			}
			
		}else{
			if(campo){
				campo.removeClass('correcto icon-checkmark-circle');
				campo.addClass('incorrecto icon-cancel-circle');
			}	
			$('#error').html($('#error').html() + '<li id=Err' + this.model.get('val') + '> ' + error + '</li>');
		}

		if ($('#error li').length > 0){
			$('div.error').show();
		}else{
			$('div.error').hide();
		}
	},

	validaRegistrarse: function(ev){

		var m = this.model;
		m.set({
			val : 0
		});

		if (m.isValid() && $('.incorrecto').size() == 0)
			$('#crearUsuario').submit();
		else
			this.validaCampo(this.model.isValid(), '',m.validationError);

		return false;
	}
});