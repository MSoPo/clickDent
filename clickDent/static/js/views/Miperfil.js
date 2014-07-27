clickDent.Views.Miperfil = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click #guardar' : "guardar",
	},

	initialize: function() {
		console.log("Inicializando Miperfil View");	
		$('#formulario').ajaxForm(function(data) { 
        	alert("Thank you for your comment!" + data); 
    	}); 
		
	},

	render: function() {

	},

	guardar :function() {

		//Actualizar contraseña
		var contrasenaActual = $('#actual').val(); 
		var contrasenaNueva = $('#nueva').val();
		$.ajax({
		  type: "POST",
		  url: "/cambiarContrasena/",
		  data: { actual : contrasenaActual, nueva : contrasenaNueva },
		  beforeSend: sendAuthentication,
		  success : function(data) {
		  	console.log(data);
		  }
		});

		//Actualizar Plan	
		var idPlan = $('input[name=plan]:checked').val(); 
		$.ajax({
		  type: "POST",
		  url: "/actualizarPlan/",
		  data: { plan : idPlan },
		  beforeSend: sendAuthentication,
		  success : function(data) {
		  	console.log(data);
		  }
		});


		//Envier formulario
		$('#formulario').submit();

	},
});