clickDent.Views.Paciente = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click #guardar' : "guardarPaciente",
		'change #cp' : 'consultarDireccion',
	},

	initialize: function() {
		console.log("Inicializando Paciente View");		
	},

	render: function() {

	},

	consultarDireccion : function(){
		/***********************************/
		app.Collections.colonias = new clickDent.Collections.Colonias();
		app.Collections.colonias.fetch({ data: { cp: 73310, format: 'json'} ,
				success:function(data){
		        	alert("Fech comletado" + data);
		        	app.Collections.colonias;
		    		}
		    	});

		/*/////////******************************/

	},

	guardarPaciente: function() {
		self = this;
		this.model = formToModel(this.$el, this.model);
		app.Collections.pacientes.add(this.model);
		
		app.Collections.direcciones = new clickDent.Collections.Direcciones();
		app.Models.direccion = new clickDent.Models.Direccion();
		app.Models.direccion = formToModel(this.$el, app.Models.direccion);
		app.Collections.direcciones.add(app.Models.direccion);
		
		app.Models.direccion.save({}, {  // se genera POST /usuarios  - contenido: {nombre:'Alfonso'}
	    		success:function(){
	        	self.model.set('direccion', app.Models.direccion.get['id']);
	        	self.model.save({}, {  // se genera POST /usuarios  - contenido: {nombre:'Alfonso'}
		    		success:function(){
		        	alert("Usuario guardado con exito");
		    		}
				});
	    		}
			});
			

	}

	
});