clickDent.Views.Home = Backbone.View.extend({
	el : $('#interaccion'),

	events: {
		'click #home .icon-plus' : 'agregarPaciente',
		'click .cargarCita' : 'cargarCita',
		'click #home .icon-search' : 'buscarPaciente',
		'click #pagarCita' : 'pagarCita',
		'click #receta' : 'receta',
		'click .finalizarCita' : 'finalizarCita',
		'click .finalizarCitaPendiente' : 'finalizarCitaPendiente',
		'click .cancelarCitaPendiente' : 'cancelarCitaPendiente',
		'click .reprogramarPendientes' : 'reprogramarPendientes',
	},

	initialize : function(){

	},

	actualizarCitas : function() {
		indice = -1;
		var self = this;
		app.Collections.citasInicio = new clickDent.Collections.Citas();
		app.Collections.citasInicio.fetch({ data: {estatus : 1, fecha : consultaDate(new Date()), ordering : 'hora_fin' } ,
			success:function(data){

				app.Collections.citasInicio.forEach(self.cambiarCita, this);


				var ct1 = app.Collections.citasInicio.at(indice);
				var ct2 = app.Collections.citasInicio.at(indice+1);
				var ct3 = app.Collections.citasInicio.at(indice+2);


				citas = {
					cita1 : {},
					cita2 : {},
					cita3: {}
				};

				if(ct2){
					citas.cita2.hora_inicio  = formatoHora(ct2.get('hora_inicio'));
					citas.cita2.hora_fin = formatoHora(ct2.get('hora_fin'));
					citas.cita2.id = ct2.get('id');
					var pc2 = app.Collections.pacientes.findWhere({ id : ct2.get('paciente')});

					citas.cita2.paciente = {
						id : pc2.get('id'),
						nombre : pc2.get('nombre'),
						ape_paterno : pc2.get('ape_paterno'),
						ape_materno : pc2.get('ape_materno'),
					};
				}

				if(ct3){
					citas.cita3.hora_inicio  = formatoHora(ct3.get('hora_inicio'));
					citas.cita3.hora_fin = formatoHora(ct3.get('hora_fin'));
					citas.cita3.id = ct3.get('id');
					var pc3 = app.Collections.pacientes.findWhere({ id : ct3.get('paciente')});

					citas.cita3.paciente = {
						id : pc3.get('id'),
						nombre : pc3.get('nombre'),
						ape_paterno : pc3.get('ape_paterno'),
						ape_materno : pc3.get('ape_materno'),
					};
				}

				if(ct1){
					citas.cita1.hora_inicio  = formatoHora(ct1.get('hora_inicio'));
					citas.cita1.hora_fin = formatoHora(ct1.get('hora_fin'));
					citas.cita1.observaciones = ct1.get('observaciones');
					citas.cita1.tratamiento = ct1.get('tratamiento');
					citas.cita1.id = ct1.get('id');
					var pc1 = app.Collections.pacientes.findWhere({ id : ct1.get('paciente')});

					citas.cita1.paciente = {
						id : pc1.get('id'),
						nombre : pc1.get('nombre'),
						ape_paterno : pc1.get('ape_paterno'),
						ape_materno : pc1.get('ape_materno'),
						pendiente : formatoMoneda(pc1.get('pendiente')),
						pago_pendiente : pc1.get('pendiente'),
					};

					var citaAnteriores = new clickDent.Collections.Citas();
					citaAnteriores.fetch({ data: { paciente : pc1.get('id') , ordering :  '-fecha,-hora_inicio'} ,
						success:function(data){
							if(citaAnteriores.length > 1){
								citas.cita1.paciente.ultimacita = convertDate(citaAnteriores.at(1).get('fecha'));
							}

							if(citas.cita1.tratamiento){
								app.Collections.tratamientoCita = new clickDent.Collections.Tratamientos();
					        	app.Collections.tratamientoCita.fetch({ data: {id : citas.cita1.tratamiento},
					        		success : function(data){
					        			citas.cita1.tratamiento = {
					        				nombre : app.Collections.tratamientoCita.at(0).get('descripcion'),
					        				precio : app.Collections.tratamientoCita.at(0).get('total_precio')
					        			}
					        			self.render();	
					        		}
					        	});
							}else{
								self.render();	
							}
						}
					});
				}else{
					self.render();
				}


			}
		});

		var fecha = new Date();
		$.get( "/citasPorFinalizar/", { fecha : consultaDateYYYY(fecha) , hora : consultaHora(fecha), estatus : 1 } , function( data ) {
				$('#citasPendientes').html(templateCitasPendientes({citas : JSON.parse(data)}));
  		});


	},

	render : function() {
		if(app.Util.nuevoUsuario){
			console.log("Agregar introduccion para nuevos usuario");
			clickDent.app.navigate('configuracion/', {trigger : true });
			window.scroll(0,0)
		}
		$('#citas').html(templatePrincipal( { cts : citas } ));
	},

	cambiarCita: function(modelo, index) {
		if(comparaHora(modelo.get('hora_fin')) && indice == -1 ){
			indice = index;
			citaActual = modelo;
			return true;
		}
	},

	agregarPaciente: function(ev){
		console.log('AgregarPaciente Evento');
		clickDent.app.navigate('paciente/', {trigger : true});
		$('.itemMenu').removeClass('seleccion');
		$('#paciente').addClass('seleccion');
	},
	cargarCita: function(ev){
		 var horaNuevaCita = $(ev.target).parent().parent().find('.horaNuevaCita').html();
		 if(horaNuevaCita){
		 	horaNuevaCita = $.trim(horaNuevaCita);
		 	horaNuevaCita = horaNuevaCita.replace(":", "");
		 	if(parseInt(horaNuevaCita.substring(2,4)) > 59 ){
		 		horaNuevaCita = parseInt(horaNuevaCita) + 100;
		 	}else{
		 		horaNuevaCita = parseInt(horaNuevaCita) + 1;
		 	}
		 }
		return craerCita(horaNuevaCita);
	},

	buscarPaciente: function(ev){
		var buscar = $('input[name="buscar"]').val();
		console.log('buscando pacientes ' + buscar);
		self = this;
		//No se pone trigger para evitar que se lance el evento y solo redirecccion
		clickDent.app.navigate('paciente/');
	    $('#interaccion').load('/buscarPaciente/', function(data){
			app.Views.buscarPaciente.render(buscar);
	      	app.Views.menuView.establearAncho();
	      	$('.itemMenu').removeClass('seleccion');
			$('#buscarPaciente').addClass('seleccion');
	    });

	},

	pagarCita : function(ev){
		console.log("cargar pagos");
		app.Views.popup.render('popup-pagarConsulta-template');
		console.log(citas.cita1.paciente.pendiente);
		
		if( convertirADecimal(citas.cita1.paciente.pendiente)){
			$('#popupDeuda').val(citas.cita1.paciente.pendiente);
			$('#popupTotal').val(citas.cita1.paciente.pendiente);
			$('#campoDeuda').show();
		}
		
		if(citas.cita1.tratamiento && citas.cita1.tratamiento.precio == 0){
			$('#campoTratamiento').show();
		}

		app.Views.popup.mostrar();
		return false;
	},

	receta : function(ev){
		app.Views.popup.render('popup-receta-template');
		app.Views.popup.mostrar();
		return false;
	},

	finalizarCita : function(ev){
		console.log('finalizar Cita');
		var idCita = $(ev.target).parent().parent().parent().find('.idCita').val();
		var cita = app.Collections.citasInicio.findWhere({ id : parseInt(idCita) });
		cita.set('estatus', 3)
		cita.save();
	},

	finalizarCitaPendiente : function(ev){
		console.log('finalizar Pendiente Cita');
		var idCita = $(ev.target).parent().parent().find('.idCita').val();
		var chkTratamineto = $(ev.target).parent().parent().find('.chkTratamiento').is(':checked');
		var citalist  = new clickDent.Collections.Citas();
		citalist.fetch({ data: { id : parseInt(idCita) } ,
			success:function(data){
				console.log(data);
				citalist.at(0).set('estatus',  utils.constantes.estatus.realizada);
				citalist.at(0).save();
				if(chkTratamineto){
					var lstTratamiento = new clickDent.Collections.Tratamientos();
					lstTratamiento.fetch({ data: {id : data.at(0).get('tratamiento')},
		        		success : function(data){
		        			data.at(0).set('estatus', utils.constantes.estatus.tratamientoFinalizado);
		        			data.at(0).save();
		        		}
		        	});
				}
			},
		});

		return false;
	},

	cancelarCitaPendiente : function(ev){
		console.log('finalizar Pendiente Cita');
		var idCita = $(ev.target).parent().parent().find('.idCita').val();
		var chkTratamineto = $(ev.target).parent().parent().find('.chkTratamiento').is(':checked');
		var citalist  = new clickDent.Collections.Citas();
		citalist.fetch({ data: { id : parseInt(idCita) } ,
			success:function(data){
				console.log(data);
				data.at(0).set('estatus', utils.constantes.estatus.cancelada);
				data.at(0).save();
				if(chkTratamineto){
					var lstTratamiento = new clickDent.Collections.Tratamientos();
					lstTratamiento.fetch({ data: {id : data.at(0).get('tratamiento')},
		        		success : function(data){
		        			data.at(0).set('estatus', utils.constantes.estatus.tratamientoFinalizado);
		        			data.at(0).save();
		        		}
		        	});
				}
			},
		});

		return false;
	},

	reprogramarPendientes : function(ev){
		var idCita = $(ev.target).parent().parent().find('.idCita').val();
		var lstCitas = new clickDent.Collections.Citas();
		lstCitas.fetch({ data: { id : parseInt(idCita) } ,
			success:function(data){
				console.log(data);
				citaActual = data.at(0);
				app.Views.calendario.reprogramarCita();

			},
		});

		return false;
	}

});