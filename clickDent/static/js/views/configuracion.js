clickDent.Views.Configuracion = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click #agregarEscuela' : "agregarEscuela",
		'click .cerraEscuela' : 'quitarEscuela',
		'change #cp' : 'consultarColonia',
		'change #colonia' : 'consultarMunicipio',
		'change #municipio' : 'consultarEstado',
		'click #guardar' : 'guardar',
	},

	initialize: function() {
		console.log("Inicializando Paciente View");	
		var recordatorio = $('#recordatorio').val();
		var rec = recordatorio.split(',');
		for( var i in rec ){
			console.log(rec[i]);
			$('input[id='+ rec[i] +']').prop('checked', true);
		}
	},

	render: function() {

	},

	agregarEscuela: function() {
		$('#datosEscuela').append(templateEscuela);
		return false;
	},

	quitarEscuela: function (ev) {
		$( ev.target ).parent().parent().parent().remove();
		return false;
	},

		
	consultarColonia : function(){
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

	},

	consultarMunicipio : function(){
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

	},

	consultarEstado : function(){
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

	},

	guardar :function() {
		app.Models.medico = formToModel(this.$el, this.model);
		app.Models.medico.sync("update", app.Models.medico, {
  			beforeSend: sendAuthentication 
 		});
 		app.Models.configuracion = new clickDent.Models.Configuracion();
 		app.Models.configuracion = formToModel(this.$el, app.Models.configuracion, 'configuracion',  ['id']);
 		app.Collections.configuraciones = new clickDent.Collections.Configuraciones();
 		app.Collections.configuraciones.add(app.Models.configuracion);
 		app.Models.configuracion.sync("update", app.Models.configuracion, {
  			beforeSend: sendAuthentication 
 		});

 		app.Models.consultorio = new clickDent.Models.Consultorio();
 		app.Models.consultorio = formToModel(this.$el, app.Models.consultorio, 'consultorio',  ['id','nombre']);
 		app.Collections.consultorios = new clickDent.Collections.Consultorios();
 		app.Collections.consultorios.add(app.Models.consultorio);
 		app.Models.consultorio.sync("update", app.Models.consultorio, {
  			beforeSend: sendAuthentication 
 		});

 		app.Models.direccion = new clickDent.Models.Direccion();
 		app.Models.direccion = formToModel(this.$el, app.Models.direccion, 'direccion',  ['id']);
 		app.Collections.direcciones = new clickDent.Collections.Direcciones();
 		app.Collections.direcciones.add(app.Models.direccion);
 		app.Models.direccion.sync("update", app.Models.direccion, {
  			beforeSend: sendAuthentication 
 		});

 		app.Collections.formaciones = new clickDent.Collections.Formaciones();

 		$('.datoEscuela').each(function(index, element){
	 		app.Collections.formaciones.add( {
					escuela : $(this).find('input[name=escuela]').val(),
					titulo : $(this).find('input[name=titulo]').val(),
				}
			);
 		});

 		app.Collections.formaciones.sync('create', app.Collections.formaciones, {
  			beforeSend: sendAuthentication 
 		});

 		

 		console.log(app.Collections.formaciones.toJSON());



	}
});