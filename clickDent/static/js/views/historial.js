clickDent.Views.Historial = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'change .campo_detalle' : 'mostrarDetalle',
		'click #guardar_historial' : 'guardarHistorial',
		'click .dienteAuxiliar' : 'cambiarColor',
		'click .diente' : 'cambiarColor',
		'click .edicion .icon-profile.edit' : 'regresarDatosPaciente',
	},

	initialize: function() {
		console.log("Inicializando Historial View");		
	},

	render: function(model) {
		var self = this;
		var medico = app.Models.medico.get('id');
		//var paciente = app.Models.paciente.get('id');

		paciente = app.Models.paciente.get('id');

		app.Collections.historial = new clickDent.Collections.Historial();

		app.Collections.historial.fetch( { data : { 'paciente' : paciente, 'medico' : medico },
			success: function(data){
				$('#historial_actualizacion').html(_.template.formatdate(data.at(0).get('fecha_actualizacion')));
				modelToForm(self.$el, data.at(0));
				
				$('.campo_detalle').each(function(indice, elemento) {
				  if($(elemento).find('input:checked').val() == 'N' ){
				  	$(elemento).find('.datos_detalle').hide();
				  }
				});

				app.Models.historial = data.at(0);

				app.Collections.odontodiagrama = new clickDent.Collections.Odontodiagrama();

				app.Collections.odontodiagrama.fetch( { data : { 'historial' : app.Models.historial.get('id') },
					success : function(data){
						app.Models.odontodiagrama = data.at(0);

						for( var atr in app.Models.odontodiagrama.attributes ) { 
							var valor = app.Models.odontodiagrama.get(atr);
							if(valor !=  "N"){
								$('#' + atr).addClass(utils.constantes.coloresBD[valor]);
							}
						} 

					}
				});

				app.Collections.tratamientos = new clickDent.Collections.Tratamientos();
				app.Collections.tratamientos.fetch({ data : {'historial' : app.Models.historial.get('id'),  ordering : 'fecha_inicio'}, 
					success: function(data){
						for(var i = 0; i < data.size(); i++ ){
							var columna = $('.planTratamientos tbody tr')[i];
  							$(columna).find('.idPlanTratamiento').val(data.at(i).get('id'));
  							$(columna).find('.tratamientoDescripcion input').val(data.at(i).get('descripcion'));
							$(columna).find('.calendarioPlanTratamiento input').val(data.at(i).get('fecha_inicio').substring(0, 10));
						}
					}
				});


			}
		});
	},

	mostrarDetalle : function(ev){
		var seleccion = $(ev.target).val();

		console.log(seleccion);

		if(seleccion == 'S'){
			$(ev.target).parent().parent().find('.datos_detalle').show();
		}else if(seleccion == 'N'){
			$(ev.target).parent().parent().find('.datos_detalle').hide();
		}
	},

	guardarHistorial: function(ev){
		app.Models.historial = formToModel(this.$el, app.Models.historial);
		app.Models.historial.set('fecha_actualizacion', formatFecha(new Date()));
		app.Models.historial.save();

		for( var atr in app.Models.odontodiagrama.attributes) { 
			var color = 'N';
			for(a in utils.constantes.colores){
				if($('#' + atr).hasClass(utils.constantes.colores[a])){
					color = utils.constantes.colores[a];
				}	
			}

			if(atr.indexOf("d0") > -1)
				app.Models.odontodiagrama.set(atr, utils.constantes.coloresJS[color]);
		}

		console.log(app.Models.odontodiagrama);
		app.Models.odontodiagrama.save();

		$('.planTratamientos tbody tr').each(function( index ) {
			var id = $(this).find('.idPlanTratamiento').val();
  			var descripcion = $(this).find('.tratamientoDescripcion input').val();
  			var fecha = $(this).find('.calendarioPlanTratamiento input').val();

  			if(id){
  				var tratamiento = app.Collections.tratamientos.findWhere({id : parseInt(id)});
  				tratamiento.set('fecha_inicio', fecha + ' 00:00');
  				tratamiento.set('descripcion', descripcion);
  				tratamiento.save();

  			}else if(descripcion && fecha){
  				var tratamiento = new clickDent.Models.Tratamiento({ descripcion : descripcion, fecha_inicio : (fecha  + ' 00:00')});
  				tratamiento.set('estatus', 10);
				tratamiento.set('estatus_pago', 9);
				tratamiento.set('total_precio', 0);
				tratamiento.set('paciente',  app.Models.historial.get('paciente'));
				tratamiento.set('medico', app.Models.medico.get('id'));
				tratamiento.set('historial',  app.Models.historial.get('id'))
  				app.Collections.tratamientos.add(tratamiento);
  				tratamiento.save();
  			}

		});
	},

	cambiarColor: function(ev){
		var diente  = $(ev.target);
		var colocarClase = true;

		for(a in utils.constantes.colores){
			if(diente.hasClass(utils.constantes.colores[a])){
				colocarClase = false;
				diente.removeClass(utils.constantes.colores[a]);
				if(a == (utils.constantes.colores.length - 1)){
					console.log('quitar las clases');
				}else{
					diente.addClass(utils.constantes.colores[parseInt(a) + 1]);	
				}
				break;
			}	
		}

		if(colocarClase){
			diente.addClass(utils.constantes.colores[0]);
		}
	},

	activarEdicion : function(ev){
		$('.edicion').show();
		$('.noEdicion').hide();
		$('#calvePaciente').html(app.Models.paciente.get('id'));
	},

	regresarDatosPaciente : function(ev){
		$('#interaccion').load('/paciente/', function(data){
		    app.Views.pacienteView.render(app.Models.paciente);
			app.Views.menuView.establearAncho();
		});
	},
	
});