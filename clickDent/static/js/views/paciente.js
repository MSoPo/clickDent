clickDent.Views.Paciente = Backbone.View.extend({
	el: $('#interaccion'),

	events: {
		'click .pacientes #guardar' : "guardarPaciente",
		'change #cp' : 'consultarColonia',
		'change #colonia' : 'consultarMunicipio',
		'change #municipio' : 'consultarEstado',
		'click .edicion .icon-undo' : 'regresarConsulta'
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

		}

	},

	consultarColonia : function(callback){
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
		        	$('#colonia').html(template);

		   			if(typeof callback == 'function'){
						callback();
					}
		        }
		    });

		/*/////////******************************/

	},

	consultarMunicipio : function(callback){
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
		        	$('#municipio').html(template);
		        	if(typeof callback == 'function'){
						callback();
					}
		        }
		    });

	},

	consultarEstado : function(callback){
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
		        	alert("Usuario guardado con exito");
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
	}

	
});