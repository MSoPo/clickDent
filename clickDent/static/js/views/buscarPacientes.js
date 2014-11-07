clickDent.Views.BuscarPaciente = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click #buscarPaciente' : 'buscarPaciente',
		'click .icon-profile' : 'datosPaciente',
		'click .icon-paste' : 'datosPaciente',
		'click .icon-calendar' : 'buscarCitas',
		'click .icon-aid' : 'tratamientosCitas',
		'click .icon-pencil' : 'editarPaciente',
	},

	initialize: function() {
		console.log("Inicializando Pagos View");
		this.collection = app.Collections.pacientes;
		this.ordernarColeccion();
		this.render();
	},

	render: function(datos) {
		if (datos) {
			this.collection = app.Collections.pacientes.filtroNombre(datos);
			this.ordernarColeccion();
			$('#inputBuscar').val(datos);
		}
		$('#listaPacientes').html('');
		this.collection.forEach(this.addOne ,this);
	},



	addOne :function(paciente) {
		$('#listaPacientes').append(templateBuscaPacienete(paciente.toJSON()));
	},

	buscarPaciente : function(){
		this.collection = app.Collections.pacientes.filtroNombre($('#inputBuscar').val());
		this.ordernarColeccion();
		console.log(this.collection);
		this.render();
	},

	ordernarColeccion : function () {
		this.collection.comparator = function(paciente) {
		  return -paciente.get("nombre");
		};
		this.collection.sort(); 
	},

	datosPaciente : function(ev) {
		$('.detalle').hide();
		var trSec = $(ev.target).parent().parent();
		var id = parseInt(trSec.attr('id').split('_')[1]);
		app.Models.paciente = app.Collections.pacientes.findWhere({id : id});

		var direccion = new clickDent.Collections.Direcciones();
		direccion.fetch({data : {id : app.Models.paciente.get('direccion') }, success : 
			function(dato){
				console.log(dato);
				var colonia = new clickDent.Collections.Colonias();
				colonia.fetch({data : {id : direccion.at(0).get('colonia')}, 
					success : function(dato) {
						console.log(dato);
						var municipio = new clickDent.Collections.Municipios();
						municipio.fetch({data : {id : colonia.at(0).get('municipio')}, 
							success : function(dato) {
								console.log(dato);
								var estado = new clickDent.Collections.Estados();
								estado.fetch({data : {id : municipio.at(0).get('estado')}, 
									success : function(dato) {
										console.log(dato);
										app.Models.paciente.set({
											calle : direccion.at(0).get('calle'),
											num_exterior : direccion.at(0).get('num_exterior'),
											num_interior : direccion.at(0).get('num_interior'),
											colonia : colonia.at(0).get('nombre'),
											municipio : municipio.at(0).get('nombre'),
											estado : estado.at(0).get('nombre'),
											cp : colonia.at(0).get('cp'),
											});

										trSec.next().show();
										trSec.next().find('td').html(templateConsultarDatosPac(app.Models.paciente.toJSON()));
									} 
						});
							} 
						});
					} 
				});
			}
		});  
	},

	buscarCitas : function(ev) {
		$('.detalle').hide();
		var trSec = $(ev.target).parent().parent();
		var id = parseInt(trSec.attr('id').split('_')[1]);

		var citasPaciente = new clickDent.Collections.Citas();

		citasPaciente.fetch({ data: { paciente : id, medico : app.Models.medico.get('id'), ordering : 'fecha,hora_fin' } ,
	      success:function(data){
	      	if(citasPaciente.length > 0){
		      	citasPaciente.forEach(function(cita){
		        	app.Models.estatus = app.Collections.estatus.findWhere({id : cita.get('estatus')});
		        	cita.set('estatus', app.Models.estatus.get('nombre'));
		        	if(cita.get('tratamiento')){
			        	app.Collections.tratamientos = new clickDent.Collections.Tratamientos();
			        	app.Collections.tratamientos.fetch({ data: {id : cita.get('tratamiento')},
			        		success : function(data){
			        			cita.set('tratamiento', data.at(0).get('descripcion'));
			        			trSec.next().show();
			        			trSec.next().find('td').html(templateConsultarCitasPac({citas : citasPaciente.toJSON()}));
			        		}
			        	});
		        	}else{
		        		trSec.next().show();
			        	trSec.next().find('td').html(templateConsultarCitasPac({citas : citasPaciente.toJSON()}));
		        	}

		        } ,this);
		    }else{
		    	trSec.next().show();
		        trSec.next().find('td').html(templateConsultarCitasPac({citas : citasPaciente.toJSON()}));
		    }
	      }
	    });
	},

	tratamientosCitas : function(ev) {
		$('.detalle').hide();
		var trSec = $(ev.target).parent().parent();
		var id = parseInt(trSec.attr('id').split('_')[1]);

		var tratamientosPaciente = new clickDent.Collections.Tratamientos();

		tratamientosPaciente.fetch({ data: { paciente : id, medico : app.Models.medico.get('id'), ordering : 'fecha_inicio' } ,
	      success:function(data){
	        console.log("Tratamientos Obtenidos");
	        tratamientosPaciente.forEach(function(tratamiento){
	        	app.Models.estatus = app.Collections.estatus.findWhere({id : tratamiento.get('estatus')});
	        	tratamiento.set('estatus', app.Models.estatus.get('nombre'));
	        } ,this);
	        
	        trSec.next().show();
	        trSec.next().find('td').html(templateConsultarTratamientosPac({tratamientos : tratamientosPaciente.toJSON()}));
	      }
	    });
	},

	editarPaciente : function(ev){
		app.Util.buscaPaciente = $('#inputBuscar').val();
		var trSec = $(ev.target).parent().parent();
		var id = parseInt(trSec.attr('id').split('_')[1]);
		app.Models.paciente = app.Collections.pacientes.findWhere({id : id});

		$('#interaccion').load('/paciente/', function(data){
		    app.Views.pacienteView.render(app.Models.paciente);
			app.Views.menuView.establearAncho();
		});

	},

});