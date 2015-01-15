clickDent.Views.Calendario = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click #atrasarFecha' : "atrasarFecha",
		'click #adelantarFecha' : 'adelantarFecha',
		'click #adelantarCita' : 'adelantarCita',
		'click #atrasarCita' : 'atrasarCita',
		'click #cancelaCitaCalendario' : 'cancelarCita',
		'click #editarCitaCalendario' : 'editarCita',
		'click #reprogramarCalendario' : 'reprogramarCita',
	},

	initialize: function() {
		indice = 0;
		longitud = 0;
		actual = new Date();
		anterior = new Date();
		siguiente = new Date();
		citaActual = undefined;
		var self = this;
		var dayOfMonth = actual.getDate();
		anterior.setDate(dayOfMonth-1);
		siguiente.setDate(dayOfMonth+1);
		app.Collections.citasCalendario = new clickDent.Collections.Citas();
		app.Collections.citasCalendario.url = "/rest/citasCalendario/";
		app.Collections.citasCalendario.fetch({ data : { fecha : consultaDateYYYY(new Date()) }, 
			success : function(data){
				indice = app.Collections.citasCalendario.length-1;
            	longitud = app.Collections.citasCalendario.length-1;
				app.Collections.citasCalendario.forEach(self.cambiarCita, self);
			}

		 });
	},

	render: function() {
		this.preparaCitaRender(function() {
			$('#fechaAnterios').html(convertDate(anterior));
			$('#fechaActual').html(convertDate(actual));
			$('#fechaSiguiente').html(convertDate(siguiente));
			$('#datosCita').html(templateCalendario({cita : citaRender}));
		});
	},

	atrasarFecha: function(ev) {
		var self = this;
		actual.setDate(actual.getDate() - 1);
		anterior.setDate(anterior.getDate() - 1);
		siguiente.setDate(siguiente.getDate() - 1);
		console.log('cambiar dia anterior .... ' + actual);
		app.Collections.citasCalendario.fetch({ data: { fecha : consultaDateYYYY(actual) } ,
            success:function(data){
            	indice = app.Collections.citasCalendario.length-1;
            	longitud = app.Collections.citasCalendario.length-1;
            	citaActual = app.Collections.citasCalendario.at(app.Collections.citasCalendario.length-1);
            	self.render();
            }
        });
		return false;
	},

	adelantarFecha: function(ev) {
		var self = this;
		actual.setDate(actual.getDate() + 1);
		anterior.setDate(anterior.getDate() + 1);
		siguiente.setDate(siguiente.getDate() + 1);
		console.log('cambiar dia siguiente .... ' + actual);
		app.Collections.citasCalendario.fetch({ data: { fecha : consultaDateYYYY(actual) } ,
            success:function(data){
            	indice = app.Collections.citasCalendario.length-1;
            	longitud = app.Collections.citasCalendario.length-1;
            	citaActual = app.Collections.citasCalendario.at(app.Collections.citasCalendario.length-1);
            	self.render();
            }
        });
		return false;
	},

	cambiarCita: function(modelo, index) {
		if(comparaHora(modelo.get('hora_fin'))){
			indice = index;
			citaActual = modelo;
			return true;

		}else if(!citaActual){
			citaActual = modelo;
		}
	},

	atrasarCita : function(ev) {
		if( indice < (app.Collections.citasCalendario.length-1) ){
			citaActual = app.Collections.citasCalendario.at(++indice);
			//this.preparaCitaRender();
			this.render();
		}
		ev.stopPropagation();
		return false;
	},

	adelantarCita : function(ev) {
		if(  indice > 0 ){
			citaActual = app.Collections.citasCalendario.at(--indice);
			//this.preparaCitaRender();
			this.render();
		}
		ev.stopPropagation();
		return false;
	},

	preparaCitaRender : function(callback) {
		citaRender = {};
		if(citaActual){
			$('#adelantarCita').show();
			$('#atrasarCita').show();


			if(indice == 0){
				$('#adelantarCita').hide();
			}

			if(indice == longitud){
				$('#atrasarCita').hide();
			}

			if(citaActual.get('tratamiento')){
				var tratamientosCita = new clickDent.Collections.Tratamientos();
				tratamientosCita.fetch({ data: { id : citaActual.get('tratamiento') } ,
			      success:function(data){

			        citaActual.set('desc_tratamiento', data.at(0).get('descripcion'));
			        citaRender = {
						id : citaActual.get('id'),
						hora_inicio : formatoHora(citaActual.get('hora_inicio')),
						hora_fin : formatoHora(citaActual.get('hora_fin')),
						observaciones : citaActual.get('observaciones'),
						recomendaciones : citaActual.get('recomendaciones'),
						tratamiento : citaActual.get('desc_tratamiento'),
						estatus : citaActual.get('estatus'),
					};

					var pc1 = app.Collections.pacientes.findWhere({ id : citaActual.get('paciente')});

					citaRender.paciente = {
						id : pc1.get('id'),
						nombre : pc1.get('nombre'),
						ape_paterno : pc1.get('ape_paterno'),
						ape_materno : pc1.get('ape_materno'),
						pendiente : formatoMoneda(pc1.get('pendiente')),
					};

					callback();
			      }
			    });
			}else{
				
				citaRender = {
				id : citaActual.get('id'),
				hora_inicio : formatoHora(citaActual.get('hora_inicio')),
				hora_fin : formatoHora(citaActual.get('hora_fin')),
				observaciones : citaActual.get('observaciones'),
				recomendaciones : citaActual.get('recomendaciones'),
				tratamiento : citaActual.get('desc_tratamiento'),
				estatus : citaActual.get('estatus'),
				}

				var pc1 = app.Collections.pacientes.findWhere({ id : citaActual.get('paciente')});

				citaRender.paciente = {
					id : pc1.get('id'),
					nombre : pc1.get('nombre'),
					ape_paterno : pc1.get('ape_paterno'),
					ape_materno : pc1.get('ape_materno'),
					pendiente : formatoMoneda(pc1.get('pendiente')),
				};
			}
		}
		callback();
		
	},

	cancelarCita : function() {
		var citaListUpdate = new clickDent.Collections.Citas();
		citaListUpdate.fetch({ data: { id : parseInt(citaActual.get('id')) } ,
			success:function(data){
				app.Views.popup.render('popup-cancelarCita-template');
				app.Views.popup.mostrar();
				citaActual = data.at(0);
				for (var i = 0; i > app.Collections.citasCalendario.size(); i++) {
					if(app.Collections.citasCalendario.at(i).get('id') == citaActual.get('id')){
						app.Collections.citasCalendario.at(i) = citaActual;
					}	
				};
			},
		});
	},

	editarCita : function() {
		app.Views.popup.render('popup-editarcita-template');
		$("#editarCita_recomendacions").val(citaActual.get('recomendaciones'));
		$("#editarCita_observaciones").val(citaActual.get('observaciones'));

		var tratamientosPaciente = new clickDent.Collections.Tratamientos();
		tratamientosPaciente.fetch({ data: { paciente : citaActual.get("paciente"), estatus : utils.constantes.estatus.tratamientoActivo } , 
			success : function (data) {
				var template = templateSelect({
	        			id : "-1", 
	        			valor : "Sin tratamiento" 
	        		});
				for(var i = 0; i < data.length; i++){
	        		template += templateSelect({
	        			id : data.at(i).get('id'), 
	        			valor : data.at(i).get('descripcion') 
	        		});
	        	}

	        	$('#editarcita_selectTratamiento').html(template);
	        	if(citaActual.get('tratamiento')){
	        		$('#editarcita_selectTratamiento').val(citaActual.get('tratamiento'));
	        	}else{
	        		$('#editarcita_selectTratamiento').val(-1);
	        	}
	        	$('#tratmiento-cita-agregar').show();

				app.Views.popup.mostrar();
			},
		});
	    return false;    
	},

	reprogramarCita : function() {
		var horaNuevaCita =  citaActual.get('hora_inicio');
		if(horaNuevaCita){
		 	horaNuevaCita = $.trim(horaNuevaCita);
		 	horaNuevaCita = horaNuevaCita.replace(":", "");
		 	if(parseInt(horaNuevaCita.substring(2,4)) > 59 ){
		 		horaNuevaCita = parseInt(horaNuevaCita) + 100;
		 	}else{
		 		horaNuevaCita = parseInt(horaNuevaCita);
		 	}
		 }

		 var inicio = horaNuevaCita;

		var hhI = citaActual.get('hora_inicio').substring(0,2);
		var mmI = citaActual.get('hora_inicio').substring(3,5);
		var horaInicio = parseInt(mmI) + (parseInt(hhI) * 60);

		var hhF = citaActual.get('hora_fin').substring(0,2);
		var mmF = citaActual.get('hora_fin').substring(3,5);
		var horaFin = parseInt(mmF) + (parseInt(hhF) * 60);


		var duracion = horaFin -horaInicio;
		console.log(duracion);


		app.Views.popup.render('popup-reprogramarcita-template', 'cita', inicio, citaActual.get('fecha'));
		$('#duracion-calendario').val(duracion);
		app.Views.popup.mostrar();
	}
});