clickDent.Views.Popup = Backbone.View.extend({
	el: $('#backpopup'),

	events: {
		'click #cancelar' : 'cancelar',
		'click #gurdar-tratamiento' : 'guardarTratamiento',
		'click #popcancelar' : 'cancelar',
		'click #popup' : 'nocerrar',
		'click #eliminar-tratamiento' : 'borrarTratamiento',
		'click #gurdar-cita' : 'guardarCita',
		'click #tratamiento-cita' : 'mostrarTratamiento',
		'click #tratamiento-cita-quitar' : 'quitarTratamiento',
		'click #nuevo-tratamiento' : 'mostrarNuevoTratamiento',
		'click #actueles-tratamiento' : 'mostrarActuelsTratamientos',
		'change #paciente-cita' : 'cambioPaciente',
		'click #realizar-pago' : 'realizarPago',
		'click #gurdar-pago' :'guardarPago',
		'change .sumarTotal' : 'sumarTotal',
		'click #editar-cita' : 'editarCita',
		'click #reprogramar-cita' : 'reprogramarCita',
		'click #crear-receta' : 'crearReceta',
		'click #cancela-cita' : 'cancelaCita',
		'click #concluir-cita' : 'concluirCita',
		'click #cancela-cita-calendario' : 'cancelarCitaCalendario',
	},

	actualizacion : false,

	initialize: function() {
	},

	render: function(elemto, inicio, hora, fechaOrigen) {
		var popup = this.$el.find('#popup').html($('#' + elemto).html());
		var popupSuperios = this.$el.find('#popcancelar').html(popup);
		this.$el.html(popupSuperios);
		var hoy = new Date();
		var minDate = rellenarCaracter("0", 2, hoy.getFullYear()) + "" + rellenarCaracter("0", 2, (hoy.getMonth() + 1)) + "" +   rellenarCaracter("0", 2, hoy.getDate());
		minDate = parseInt(minDate);
		var fechaOrigenCalendario = null;
		if (fechaOrigen){
			fechaOrigenCalendario = new Date(fechaOrigen + " 00:00")
		}


		if(inicio == 'cita'){
			app.Collections.tratamientos = new clickDent.Collections.Tratamientos();
			fechaCalendario = '';
			horaCalendario = '';
			var CalendarioCita  = Calendar.setup({
			    cont          : "calendar-container",
			    weekNumbers   : false,
			    selectionType : Calendar.SEL_SINGLE,
			    selection     : fechaOrigenCalendario ? Calendar.dateToInt(fechaOrigenCalendario) : Calendar.dateToInt(hoy),
			    showTime      : 24,
			    minuteStep    : 1,
			    min : minDate,
			    onSelect      : function() {
			        var count = this.selection.countDays();
			        if (count == 1) {
			            var date = this.selection.get();
			            date = Calendar.intToDate(date);
			            console.log(date);
			            fechaCalendario = Calendar.printDate(date, "%Y-%m-%d");
			        }
			    },
			    onTimeChange  : function(cal) {
			        var h = cal.getHours(), m = cal.getMinutes();
			        // zero-pad them
			        if (h < 10) h = "0" + h;
			        if (m < 10) m = "0" + m;
			        horaCalendario = h + ':' + m;
			    }
			});

			var horaActual = rellenarCaracter("0", 2, hoy.getHours()) + "" + rellenarCaracter("0", 2, hoy.getMinutes() + 3);
			CalendarioCita.setTime(hora ? hora : parseInt(horaActual), true);
			hora  = hora ? (hora + "") : undefined;
			horaCalendario = hora ? (hora.substring(0,2) + ":" + hora.substring(2)) : (hoy.getHours() + ":" + (hoy.getMinutes()+3));
		}

		return this;
	},

	cargarTratamiento : function(model) {
		 modelToForm(this.$el, model);
		 app.Views.popup.mostrar();
	},

	guardarTratamiento :function() {
		console.log('guardar Tratamiento');
		self = this;
		var id = this.$el.find('input[name=id]').val();
		if (id)
		{
			app.Models.precioTratamiento = app.Views.tratamientosView.collection.get(id);
			app.Models.precioTratamiento = formToModel(this.$el, app.Models.precioTratamiento);
			app.Models.precioTratamiento.set('medico', app.Models.medico.get('id'))
		}else{
			app.Models.precioTratamiento = new clickDent.Models.PrecioTratamiento();
			app.Models.precioTratamiento = formToModel(this.$el, app.Models.precioTratamiento);
			app.Models.precioTratamiento.set('medico', app.Models.medico.get('id'))
			app.Views.tratamientosView.collection.add(app.Models.precioTratamiento);
		}
		
		
		app.Models.precioTratamiento.save(
			{}, {
		    	beforeSend: sendAuthentication,
		    	success:function(){
		       		console.log("Usuario guardado con exito");
		       		app.Views.popup.limpiarValores();
		      		app.Views.tratamientosView.render();
		    	},
		    });

	},	

	cancelar : function() {
		this.$el.hide();
	},

	mostrar : function() {
		this.$el.show();
	},
	nocerrar : function() {
		return false;
	},
	limpiarValores : function(){
		this.$el.find('input').val('');
	},

	borrarTratamiento: function(){
		console.log('Borrar tratamiento');
		self = this;
		var id = this.$el.find('input[name=id]').val();
		app.Models.precioTratamiento.destroy({success: function(model, response) {
		  app.Views.tratamientosView.render();
		  self.$el.hide();
		}});
		
	},

	cargarPacientes : function(){
		$('#pacientes').html('');
		app.Collections.pacientes.forEach(this.agregarPaciente, this);
		this.mostrar();

	},

	agregarPaciente :function(paciente) {
		$('#pacientes').append(templatePaciente(paciente.toJSON()));
	},

	validarCita : function(){
		var resultado = true;
		var error = '';
		var hoy = new Date();
		var fechaSeleccionada = new Date(fechaCalendario + " " + horaCalendario);
		if( fechaSeleccionada < hoy){
			console.log(fechaSeleccionada);
			console.log(hoy);
			resultado = false;
			error = 'La fecha que intenta seleccionar ya paso';
		}

		if(!clavePac){
			var campo = this.$el.find('input[name=paciente]');
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			$('#errorCita').html('No existe este paciente, verifique la clave');
			$('#errorCita').show();
			return false;
		}

		
		var campo = this.$el.find('input[name=paciente]');
		if(validaAlfanumerico(campo.val()) && validaRequerido(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();

		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('textarea[name=recomendaciones]');
		if(validaAlfanumerico(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = this.$el.find('textarea[name=observaciones]');
		if(validaAlfanumerico(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		if(!$('#selectTratamiento').is(':visible') && !$('#tratamiento-cita').is(':visible')){
			campo = this.$el.find('textarea[name=descripcion]');
			if(validaAlfanumerico(campo.val())  && validaRequerido(campo.val()) )
			{
				campo.removeClass('invalido');
				campo.addClass('valido');
				campo.parent().find('.error').hide();
			}else{
				campo.removeClass('valido');
				campo.addClass('invalido');
				campo.parent().find('.error').show();
				resultado = false;
			}
		}

		if(!resultado){
			$('#errorCita').html(error ? error : 'Valide los campos en rojo');
			$('#errorCita').show();
		}

		return resultado;
	},

	guardarCita : function(){

		app.Models.cita = new clickDent.Models.Cita();
		app.Models.cita = formToModel(this.$el, app.Models.cita);
		clavePac = $.trim(app.Models.cita.get('paciente').split(",")[0]);
		clavePac =  app.Collections.pacientes.findWhere({id : parseInt(clavePac)});
		fechaCalendario = fechaCalendario ? fechaCalendario : formatFecha(new Date());
		var duracion = $('#duracion').val();
		var parametros=fechaCalendario.split("-");
		var parametrosHora=horaCalendario.split(":");
		var fecha2 = new Date(parametros[0] , parametros[1]-1 , parametros[2], parametrosHora[0], (parseInt(parametrosHora[1])+parseInt(duracion)));
		var horaFin = fecha2.getHours() + ":" + fecha2.getMinutes();

		if(!this.validarCita()){
			return false;
		}

		app.Models.cita.set('paciente', clavePac.get('id'));
		app.Models.cita.set('consultorio', 1);
		app.Models.cita.set('medico', app.Models.medico.get('id'));
		app.Models.cita.set('estatus', 1);
		app.Models.cita.set('origen', 1);
		app.Models.cita.set('hora_inicio', horaCalendario)
		app.Models.cita.set('hora_fin', horaFin)
		app.Models.cita.set('fecha', fechaCalendario)
		app.Collections.citas.add(app.Models.cita);

		this.validarTiempoCita(function(){
			if(!$('#tratamiento-cita').is(':visible')) {
				var valTratamiento = $('#selectTratamiento').val();
				valTratamiento = parseInt(valTratamiento);

				if(!$('#selectTratamiento').is(':visible')) {
					app.Models.tratamiento = new clickDent.Models.Tratamiento();
					app.Models.tratamiento = formToModel(self.$el, app.Models.tratamiento);
					app.Models.tratamiento.set('fecha_inicio', fechaCalendario + ' ' + horaCalendario);
					app.Models.tratamiento.set('estatus', 10);
					app.Models.tratamiento.set('estatus_pago', 9);
					app.Models.tratamiento.set('total_precio', 0);
					app.Models.tratamiento.set('paciente', clavePac.get('id'));
					app.Models.tratamiento.set('medico', app.Models.medico.get('id'));
					app.Collections.tratamientos.add(app.Models.tratamiento);
					app.Models.tratamiento.save({},{
						beforeSend: sendAuthentication,
						success : function(){
							console.log(app.Models.tratamiento);
							console.log(app.Models.tratamiento.get('id'));
							app.Models.cita.set('tratamiento', app.Models.tratamiento.get('id'))
							app.Models.cita.save( {}, 
							{ 
								beforeSend: sendAuthentication,
								success : function(data){ 
									console.log("Se a creado la cita para el " + fechaCalendario + " a las " + horaCalendario + " hrs para el paciente " + clavePac.get('id')); 
									console.log("CITA AGREGADA LANZAR POP UP CON NOTIFICACION");
									self.$el.hide();
								} 

							});
						},
						error  : function(data){
									console.log('Error al guardar la cita');
									var campo = self.$el.find('input[name=paciente]');
									campo.removeClass('valido');
									campo.addClass('invalido');
									campo.parent().find('.error').show();
								}

						 
					});
					return;
				}else if(app.Models.cita.get('tratamiento') < 1){
					alert('Selecciona un tratamiento');
				}
			}else{
				app.Models.cita.set('tratamiento', undefined);
			}

			app.Models.cita.save( {}, 
				{ 
					beforeSend: sendAuthentication,
					success : function(data){ 
						app.Views.menuView.refrescarPantalla();
						self.$el.hide();

					}, 
					error  : function(data){
						console.log('Error al guardar la cita');
						var campo = self.$el.find('input[name=paciente]');
						campo.parent().find('.error').show();
						campo.removeClass('valido');
						campo.addClass('invalido');

					} 

			});
		});
	},

	mostrarTratamiento : function(ev){
		var campo = $(ev.target);
		if(!$('#paciente-cita').val()){
			campo.parent().find('.error').show();
		}else{
		$('#tratamiento-cita').hide();
		campo.parent().find('.error').hide();
			if(app.Collections.tratamientos.length == 0){
				$('#tratmiento-cita-nuevo').show();
			}else{
				$('#tratmiento-cita-agregar').show();
			}
		}
		

	},

	quitarTratamiento : function(){
		$('#tratmiento-cita-agregar').hide();
		$('#tratmiento-cita-nuevo').hide();
		$('#tratamiento-cita').show();

	},

	mostrarNuevoTratamiento : function() {
		$('#tratmiento-cita-agregar').hide();
		$('#tratmiento-cita-nuevo').show();
	},

	mostrarActuelsTratamientos : function() {
		$('#tratmiento-cita-agregar').show();
		$('#tratmiento-cita-nuevo').hide();
	},

	cambioPaciente : function() {
		console.log('se cambio el paciente');
		self = this;
		var paciente = $('#paciente-cita').val();
		var idPaciente =  $.trim(paciente.split(',')[0]);
		if(idPaciente){
			app.Collections.tratamientos.fetch({ data: { paciente : idPaciente, estatus : utils.constantes.estatus.tratamientoActivo } ,
		    	success:function(data){
		    		if(data.length > 0){
				        var template = "";
				        for(var i = 0; i < data.length; i++){
				        	template += templateSelect({
				        		id : data.at(i).get('id'), 
				        		valor : data.at(i).get('descripcion') 
				        	});
				        }
				        $('#selectTratamiento').html(template);
				        if(!$('#tratamiento-cita').is(':visible'))
				        	self.mostrarActuelsTratamientos();
				    }else{
				    	var template = templateSelect({
				        		id :-1, 
				        		valor :'No existen tratamientos activos' 
				        	});
				    	$('#selectTratamiento').html(template);
				    	if(!$('#tratamiento-cita').is(':visible')) 
				    		self.mostrarNuevoTratamiento();
				    }
		    	}
		    });

	    	console.log(app.Collections.tratamientos);
	    }
	},

	realizarPago : function() {
		var id = parseInt($('#lista_tratamientos').val());
		var pagado = $('input[name=pagado]').val();
		var descripcion = $('textarea[name=notas]').val();
		$('#errorRealizaPago').hide();

		if(!this.validarRealizaPago())
		{
			return false;
		}

		var pagado = convertirADecimal(pagado);
		if(pagado <= 0 ) {
			$('#errorRealizaPago').html('La cantidad pagada no puede ser $ 0');
			$('#errorRealizaPago').show();
			return false;
		}

		app.Models.tratamiento = app.Collections.Tratamientos.findWhere({id : id});

		app.Models.pago = new clickDent.Models.Pago();
		app.Models.pago.set('fecha', new Date());
		app.Models.pago.set('pagado', pagado);
		app.Models.pago.set('tratamiento', id);
		app.Models.pago.set('descripcion', descripcion);

		app.Collections.pagos = new clickDent.Collections.Pagos();
		app.Collections.pagos.add(app.Models.pago);

		app.Models.paciente = app.Collections.pacientes.findWhere({id : app.Models.tratamiento.get('paciente')});
		var pendiente = app.Models.paciente.get('pendiente');
		pendiente -= pagado;

		if (app.Models.tratamiento.get('pendiente') == pagado ){
			app.Models.tratamiento.set('fecha_liquidacion', new Date());
			app.Models.tratamiento.set('estatus' , 6);
			app.Models.paciente.set('pendiente', pendiente);
			app.Models.pago.save({}, {beforeSend: sendAuthentication });
			app.Models.paciente.save({}, {beforeSend: sendAuthentication });
			app.Models.tratamiento.save({}, {beforeSend: sendAuthentication });
		} else if(app.Models.tratamiento.get('pendiente') < pagado ){
			$('#errorRealizaPago').html('La cantidad pagada es mayor que la deuda');
			$('#errorRealizaPago').show();
			return false;
		}else{
			app.Models.paciente.set('pendiente', pendiente);
			app.Models.pago.save({}, {beforeSend: sendAuthentication });
			app.Models.paciente.save({}, {beforeSend: sendAuthentication });
			app.Models.tratamiento.save({}, {beforeSend: sendAuthentication });
		}
		
		this.$el.hide();
		app.Views.pagos.render();

	},

	validarTiempoCita : function(callback) {

		$.ajax({
			  type: "GET",
			  url: "/validarDisponibilidad/",
			  data: { idCita : (app.Models.cita.get('id') ? app.Models.cita.get('id') : 0) , hora_inicio : app.Models.cita.get('hora_inicio'), hora_fin : app.Models.cita.get('hora_fin'), fecha : app.Models.cita.get('fecha') },
			  beforeSend: sendAuthentication,
			  success : function(data) {
			  	if(data.cita != 0){
			  		$('#errorCita').html('Ya existe una cita reservada <br/> ' + data.hora_inicio + ' - ' +  data.hora_fin + '  ' + data.paciente);
			  		$('#errorCita').show();
			  		return false;
			  	}else{
			  		callback();
			  	}
			  }
			});
	},

	guardarPago : function(ev){
		var costoConsulta = $('#popupCosto').val();
		var pagado = $('#popupPagado').val();
		var precioTratamiento = $('#popupPrecioTratamiento').val();
		var deuda = convertirADecimal(citas.cita1.paciente.pendiente);

		if(!this.validarPagar())
		{
			return false;
		}

		if(convertirADecimal(pagado) < convertirADecimal(costoConsulta)) {
			$('#popupPagado').parent().find('.error').html('Se debe de realizar por lo menos el pago de la consulta');
			$('#popupPagado').parent().find('.error').show();
			return false;
		}

		var cita = app.Collections.citasInicio.at(indice);

		cita.set('costo', convertirADecimal(costoConsulta));
		cita.save({}, {beforeSend: sendAuthentication });

		if(cita.get('tratamiento')){
			var pagadoTratamiento = convertirADecimal(pagado) - convertirADecimal(costoConsulta);
			if( convertirADecimal(pagado) > 0){
				app.Models.pago = new clickDent.Models.Pago();
				app.Models.pago.set('fecha', new Date());
				app.Models.pago.set('pagado', pagadoTratamiento);
				app.Models.pago.set('tratamiento', cita.get('tratamiento'));
				app.Models.pago.set('descripcion', 'Pago realizado en la consulta');

				app.Collections.pagos = new clickDent.Collections.Pagos();
				app.Collections.pagos.add(app.Models.pago);
				app.Models.pago.save({},{beforeSend: sendAuthentication });
			}
		}

		var acumulado = ((convertirADecimal(pagado) - convertirADecimal(costoConsulta)) - convertirADecimal(precioTratamiento));
		var sumaDeuda = deuda - (acumulado);
		console.log(acumulado);
		console.log(sumaDeuda);

		var pc1 = app.Collections.pacientes.findWhere({ id : cita.get('paciente')});
		pc1.set('pendiente', sumaDeuda);
		pc1.save({}, {beforeSend: sendAuthentication });

		if(cita.get('tratamiento') && $('#popupPrecioTratamiento').is(':visible')){
			var tratamiento = app.Collections.tratamientoCita.at(0);
			tratamiento.set('total_precio', precioTratamiento.replace('$', '').replace(',',''));
			tratamiento.set('estatus_pago', sumaDeuda ? 8 : 7);
			tratamiento.save({}, {beforeSend: sendAuthentication });
		}

		app.Views.popup.render('popup-pagado-template');
		$('#deudaNueva').html(formatoMoneda(sumaDeuda));
	},

	sumarTotal : function(ev){
		var costoConsulta = $('#popupCosto').val();
		var precioTratamiento = $('#popupPrecioTratamiento').val();
		var deuda = $('#popupDeuda').val();
		var total = parseFloat(deuda.replace('$','').replace(',','')) + parseFloat(costoConsulta.replace('$','').replace(',','')) + parseFloat(precioTratamiento.replace('$','').replace(',',''));
		if(isNaN(total))
			$('#popupTotal').val('$0.00');
		else
		$('#popupTotal').val(total).trigger('blur');;
	},

	validarRealizaPago : function(ev){
		var campo = $('#pagadoRealizaPago');
		var resultado = true;

		if(validaMoneda(campo.val()) && validaRequerido(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = $('#notasRalizaPago');
		if(validaAlfanumerico(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		return true;

	},

	validarPagar : function(ev){
		var campo = $('#popupCosto');
		var resultado = true;
		if(validaMoneda(campo.val()) && validaRequerido(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = $('#popupTotal');
		if(validaMoneda(campo.val()) && validaRequerido(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		campo = $('#popupPrecioTratamiento');
		if(validaMoneda(campo.val()))
		{
			campo.removeClass('invalido');
			campo.addClass('valido');
			campo.parent().find('.error').hide();
		}else{
			campo.removeClass('valido');
			campo.addClass('invalido');
			campo.parent().find('.error').show();
			resultado = false;
		}

		return resultado;

	},

	editarCita : function(ev){
		var self = this;
		var recomendaciones = $('#editarCita_recomendacions').val();
		var observaciones = $('#editarCita_observaciones').val();
		var tratamientoSelect = $('#editarcita_selectTratamiento').val();

		var citas = new clickDent.Collections.Citas();
		citas.fetch({ data : { id : citaActual.get('id') }, 
			success : function(data){

				var cita = citas.at(0);
				cita.set('recomendaciones', recomendaciones);
				cita.set('observaciones', observaciones);
				cita.set('tratamiento', tratamientoSelect);
				citaActual = cita;

				if($('#editarcita_selectTratamiento').is(":visible")){
					if(tratamientoSelect == -1){
						cita.set('tratamiento', null);
					}

					cita.save({}, {
						beforeSend: sendAuthentication ,
						success: function(data) {
							app.Views.menuView.refrescarPantalla();	
							self.$el.hide();
						}
					});

				}else{
					var tratamientos = new clickDent.Collections.Tratamientos();
					var tratamiento = new clickDent.Models.Tratamiento({
						descripcion : $('#tratamiento_descripcion').val(),
						paciente 	: cita.get('paciente'),
						total_precio: '0',
						estatus_pago: 9,
						fecha_inicio: cita.get('fecha') + " " + cita.get('hora_inicio'),
						estatus 	: 10,
						medico		: app.Models.medico.get('id'),

					});
					tratamientos.add(tratamiento);
					tratamiento.save({}, {
						beforeSend: sendAuthentication ,
						success: function(data) {
							cita.set('tratamiento', tratamiento.get('id'));
							cita.save({}, {
								beforeSend: sendAuthentication ,
								success: function(data) {
									cita.set('tratamiento', tratamiento.get('id'));
									cita.save({}, {
										beforeSend: sendAuthentication ,
										success: function(data) {
											app.Views.menuView.refrescarPantalla();	
											self.$el.hide();
										}
									});
								}
							});
						}
					});
				}
			}
		});

		
	},

	reprogramarCita : function() {
		
		fechaCalendario = fechaCalendario ? fechaCalendario : citaActual.get('fecha');
		var self = this;
		var duracion = $('#duracion-calendario').val();
		var parametros=fechaCalendario.split("-");
		var parametrosHora=horaCalendario.split(":");
		var fecha2 = new Date(parametros[0] , parametros[1]-1 , parametros[2], parametrosHora[0], (parseInt(parametrosHora[1])+parseInt(duracion)));
		var horaFin = fecha2.getHours() + ":" + fecha2.getMinutes();

		var citas = new clickDent.Collections.Citas();
		citas.fetch({ data : { id : citaActual.get('id') }, 
			success : function(data){
				var cita = citas.at(0);
				cita.set('hora_inicio', horaCalendario);
				cita.set('hora_fin', horaFin);
				cita.set('estatus' , 1);
				cita.set('fecha', fechaCalendario);
				app.Models.cita = cita;
				citaActual = cita;
				self.validarTiempoCita(function() {
					cita.save({}, {  
						beforeSend: sendAuthentication ,
			    		success:function(){
							app.Views.menuView.refrescarPantalla();	
							self.$el.hide();
						}
					});
					
				});
			}
		});

	},

	crearReceta : function() {
		var self = this;
		var medicamentos = [];
		$('.inputReceta').each(function( index ) {
		  var valor = $( this ).val();
		  medicamentos.push(valor);
		});

		app.Models.paciente =  app.Collections.pacientes.findWhere({id : parseInt(citaActual.get('paciente'))});
		app.Views.receta.crearReceta(medicamentos, true, app.Models.configuracion.get('receta'));
		self.$el.hide();
	},

	cancelaCita : function() {
		var self = this;
		var chkTratamineto = $('#popup-cancelar-chkTratamiento').val() == "1" ? true : false;
		var idCita = $('#popup-cancelar-idcita').val();
		var cita = app.Collections.citasInicio.findWhere({ id : parseInt(idCita) });
		cita.set('estatus', utils.constantes.estatus.cancelada)
		cita.save({}, {  
			beforeSend: sendAuthentication ,
			success:function(){
				if(chkTratamineto){
				var lstTratamiento = new clickDent.Collections.Tratamientos();
				lstTratamiento.fetch({ data: {id : cita.get('tratamiento')},
			   		success : function(data){
			   			data.at(0).set('estatus', utils.constantes.estatus.tratamientoFinalizado);
			   			data.at(0).save({}, {beforeSend: sendAuthentication });
			   		}
			   	});
			}
			app.Views.menuView.refrescarPantalla();	
			self.$el.hide();
			}
		});
	},

	cancelarCitaCalendario: function() {
		var self = this;
		citaActual.set('estatus', utils.constantes.estatus.cancelada);
		citaActual.save({}, {  
			beforeSend: sendAuthentication ,
			success:function(){
				app.Views.menuView.refrescarPantalla();	
				self.$el.hide();
			}
		});
	},

	concluirCita : function() {
		var self = this;
		var chkTratamineto = $('#popup-cancelar-chkTratamiento').val() == "1" ? true : false;
		var idCita = $('#popup-cancelar-idcita').val();
		var cita = app.Collections.citasInicio.findWhere({ id : parseInt(idCita) });
		cita.set('estatus', utils.constantes.estatus.realizada)
		cita.save({}, {
						beforeSend: sendAuthentication,  
			    		success:function(){
			    			if(chkTratamineto){
								var lstTratamiento = new clickDent.Collections.Tratamientos();
								lstTratamiento.fetch({ data: {id : cita.get('tratamiento')},
					        		success : function(data){
					        			data.at(0).set('estatus', utils.constantes.estatus.tratamientoFinalizado);
					        			data.at(0).save({},{beforeSend: sendAuthentication });
					        		}
					        	});
							}
							app.Views.menuView.refrescarPantalla();	
							self.$el.hide();
						}
					});
	}

});