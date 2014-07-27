clickDent.Views.Paciente = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click #guardar' : "guardarPaciente",
		'change #cp' : 'consultarColonia',
		'change #colonia' : 'consultarMunicipio',
		'change #municipio' : 'consultarEstado',
	},

	initialize: function() {
		console.log("Inicializando Paciente View");		
	},

	render: function() {

	},

	consultarColonia : function(){
		/***********************************/
		var cp = $('#cp').val();
		app.Collections.colonias = new clickDent.Collections.Colonias();
		app.Collections.colonias.fetch({ data: { cp: cp, format: 'json'} ,
				success:function(data){
		        	console.log('colonias actualizdas');
		        	var template = "";
		        	for(var i = 0; i < data.length; i++){
		        		template += templateSelect({
		        			id : data.at(i).get('id'), 
		        			valor : data.at(i).get('nombre') 
		        		});
		        	}
		        	$('#colonia').html(template).trigger('change');
		        }
		    });

		/*/////////******************************/

	},

	consultarMunicipio : function(){
		/***********************************/
		var id = $('#colonia').val();
		var colonia = app.Collections.colonias.get(id);
		app.Collections.municipios = new clickDent.Collections.Municipios();
		app.Collections.municipios.fetch({ data: { id: colonia.get('municipio'), format: 'json'} ,
				success:function(data){
		        	console.log('Municipios actualizdas');
		        	var template = "";
		        	for(var i = 0; i < data.length; i++){
		        		template += templateSelect({
		        			id : data.at(i).get('id'), 
		        			valor : data.at(i).get('nombre') 
		        		});
		        	}
		        	$('#municipio').html(template).trigger('change');
		        }
		    });

		/*/////////******************************/

	},

	consultarEstado : function(){
		/***********************************/
		var id = $('#municipio').val();
		var municipio = app.Collections.municipios.get(id);
		app.Collections.estados = new clickDent.Collections.Estados();
		app.Collections.estados.fetch({ data: { id: municipio.get('estado'), format: 'json'} ,
				success:function(data){
		        	console.log('estados actualizdas');
		        	var template = "";
		        	for(var i = 0; i < data.length; i++){
		        		template += templateSelect({
		        			id : data.at(i).get('id'), 
		        			valor : data.at(i).get('nombre') 
		        		});
		        	}
		        	$('#estado').html(template);
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
	        	self.model.set('direccion', app.Models.direccion.get('id'));
	        	self.model.save({}, {  // se genera POST /usuarios  - contenido: {nombre:'Alfonso'}
		    		success:function(){
		        	alert("Usuario guardado con exito");
		    		}
				});
	    		}
			});
			

	}

	
});