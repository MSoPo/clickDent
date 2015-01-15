clickDent.Views.Paciente = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click .pacientes #guardar' : "guardarPaciente",
		'change #cpPac' : 'consultarColonia',
		'change #coloniaPac' : 'consultarMunicipio',
		'change #municipioPac' : 'consultarEstado',
		'click .edicion .icon-undo.edit' : 'regresarConsulta',
		'click .edicion .icon-paste.edit' : 'editarHistorial',
	},

	initialize: function() {
		console.log("Inicializando Paciente View");		
	},

	render: function(model) {
		if(model){
			self = this;
			this.model = model;
			modelToForm(this.$el, model);
			$('.edicion').show();
			$('.noEdicion').hide();
			$('#calvePaciente').html(model.get('id'));
			this.edicion = true;

			var direccion = new clickDent.Collections.Direcciones();
			direccion.fetch({data : {id : model.get('direccion') }, success : 
				function(dato){
					$('input[name=calle]').val(direccion.at(0).get('calle'));
					$('input[name=num_exterior]').val(direccion.at(0).get('num_exterior'));
					$('input[name=num_interior]').val(direccion.at(0).get('num_interior'));
					var colonia = new clickDent.Collections.Colonias();
					colonia.fetch({data : {id : direccion.at(0).get('colonia')}, 
						success : function(dato) {
							$('input[name=cp]').val(colonia.at(0).get('cp'));
							self.consultarColonia(function(){
								var municipio = new clickDent.Collections.Municipios();
								municipio.fetch({data : {id : colonia.at(0).get('municipio')}, 
									success : function(dato) {
										var estado = new clickDent.Collections.Estados();
										estado.fetch({data : {id : municipio.at(0).get('estado')}, 
											success : function(dato) {
												$('select[name=colonia]').val(colonia.at(0).get('id'));
												self.consultarMunicipio(function(){
													$('select[name=municipio]').val(municipio.at(0).get('id'));
													self.consultarEstado(function(){
														$('select[name=estado]').val(estado.at(0).get('id'));
													});
												});
											} 
										});
									} 
								});
							});
						} 
					});
				}
			}); 

		}else{
			this.model = new clickDent.Models.Paciente();
			app.Models.paciente = undefined;
			this.edicion = false;

		}

	},

	consultarColonia : function(callback){
		/***********************************/
		var cp = $('#cpPac').val();
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
		        	$('#coloniaPac').html(template);
		        	$('#coloniaPac').change();

		   			if(typeof callback == 'function'){
						callback();
					}
		        }
		    });

		/*/////////******************************/

	},

	consultarMunicipio : function(callback){
		var id = $('#coloniaPac').val();
		if(id){
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
			        	$('#municipioPac').html(template);
			        	$('#municipioPac').change();

			        	if(typeof callback == 'function'){
							callback();
						}
			        }
			    });
		}else {
			console.log('colonia no encotrada');
		}

	},

	consultarEstado : function(callback){
		/***********************************/
		var id = $('#municipioPac').val();
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
		        	$('#estadoPac').html(template);
		        	//$('#estado').change;

		        	if(typeof callback == 'function'){
						callback();
					}
		        }
		    });

		/*/////////******************************/


	},

	guardarPaciente: function() {
		self = this;
		if (!self.validarDatos()){
			console.log('Error en la validacion');
			return false;
		}

		this.model = formToModel(this.$el, this.model);

		if(!this.edicion){
			app.Collections.pacientes.add(this.model);
		}
		
		app.Collections.direcciones = new clickDent.Collections.Direcciones();
		app.Models.direccion = new clickDent.Models.Direccion();
		app.Models.direccion = formToModel(this.$el, app.Models.direccion);
		app.Collections.direcciones.add(app.Models.direccion);
		
		app.Models.direccion.save({}, {  // se genera POST /usuarios  - contenido: {nombre:'Alfonso'}
	    		success:function(){
	        	self.model.set('direccion', app.Models.direccion.get('id'));
	        	self.model.set('medico', app.Models.medico.get('id'));
	        	self.model.save({}, {  // se genera POST /usuarios  - contenido: {nombre:'Alfonso'}
		    		success:function(){
		    			if(!this.edicion){
			        		//Crear historial odontodiagrama y desplegar pantalla.
			        		console.log(self.model.get('id'));
			        		app.Models.paciente = self.model;
			        		app.Collections.historial = new clickDent.Collections.Historial();
			        		app.Collections.historial.add(new clickDent.Models.Historial());
			        		app.Collections.historial.at(0).set('paciente', app.Models.paciente.get('id'));
			        		app.Collections.historial.at(0).set('medico', app.Models.medico.get('id'));
			        		app.Collections.historial.at(0).set('fecha_actualizacion', formatFecha(new Date()));
			        		app.Collections.historial.at(0).save({}, {
			        			success: function(){
			        				var idHistorial = app.Collections.historial.at(0).get('id');
			        				app.Collections.odontodiagrama = new clickDent.Collections.Odontodiagrama();
			        				app.Collections.odontodiagrama.add(new clickDent.Models.Odontodiagrama());
			        				app.Collections.odontodiagrama.at(0).set('historial', idHistorial);
			        				app.Collections.odontodiagrama.at(0).save({}, {
			        					success: function(){
			        						console.log(app.Collections.odontodiagrama.at(0).get('id'));
			        						clickDent.app.navigate('historial/', {trigger : true});
											window.scroll(0,0)
			        					}
			        				});
			        			}
			        		});
		        		}
		    		}
				});
	    		}
			});
			

	},

	validarDatos : function() {
		var campo = this.$el.find('input[name=nombre]');
		var resultado = true;
		if(validaAlfanumerico(campo.val()) && validaRequerido(campo.val(), 2))
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

		campo = this.$el.find('input[name=ape_paterno]');
		if(validaAlfanumerico(campo.val()) && validaRequerido(campo.val(), 2))
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

		campo = this.$el.find('input[name=ape_materno]');
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

		campo = this.$el.find('input[name=fecha_nacimiento]');
		if(validaFecha(campo.val()) && validaRequerido(campo.val()))
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

		campo = this.$el.find('input[name=tel_casa]');
		if(validaTelefono(campo.val()))
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

		campo = this.$el.find('input[name=tel_celular]');
		if(validaTelefono(campo.val()))
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

		campo = this.$el.find('input[name=tel_otro]');
		if(validaTelefono(campo.val()))
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

		campo = this.$el.find('input[name=correo]');
		if(validaCorreo(campo.val()) && validaRequerido(campo.val()))
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

		campo = this.$el.find('input[name=cp]');
		if(validaCP(campo.val()) && validaRequerido(campo.val()))
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

		campo = this.$el.find('input[name=calle]');
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

		campo = this.$el.find('input[name=num_exterior]');
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

		campo = this.$el.find('input[name=num_interior]');
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

		return resultado;
	},

	regresarConsulta : function(){
		$('#interaccion').load('/buscarPaciente/', function(data){
		    app.Views.buscarPaciente.render(app.Util.buscaPaciente);
      		app.Views.menuView.establearAncho();
		});

		return false;
	},

	editarHistorial : function(){
		$('#interaccion').load('/historial/', function(data){
      		app.Views.historial.render();
      		app.Views.historial.activarEdicion();
      		app.Views.menuView.establearAncho();
    	});
	}

	
});